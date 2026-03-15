import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom';
import {gql} from '@apollo/client';
import {useQuery} from "@apollo/client/react";
import {useTranslation} from 'react-i18next';
import {
    Alert,
    Avatar,
    Box,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Container,
    Dialog,
    DialogContent,
    Divider,
    Grid,
    IconButton,
    List,
    ListItem,
    Paper,
    Tab,
    Tabs,
    Typography,
    useTheme
} from '@mui/material';
import {Close, Email, LocationOn} from '@mui/icons-material';
import {type GetPitchResult, getSurfaceTypeColor} from "../services/pitches.ts";
import {locationPropertyIconMap, pitchPropertyIconMap} from "../components/PropertyMap.tsx";
import PitchSvg from "../components/PitchSvg.tsx";

const GET_PITCH = gql`
    query GetPitch($id: Int!) {
        getPitch(id: $id) {
            id
            name
            pitchType
            surfaceType
            properties
            location {
                id
                name
                address {
                    addressLine
                    city
                    postalCode
                }
                contact {
                    contactName
                    email
                }
                properties
            }
        }
    }
`;

const PitchDetail: React.FC = () => {
    const theme = useTheme();
    const { t } = useTranslation();
    const {id} = useParams<{ id: string }>();
    const numericId = id ? parseInt(id, 10) : null;
    const {loading, error, data} = useQuery<GetPitchResult>(GET_PITCH, {variables: {id: numericId}});
    const [imageDialogOpen, setImageDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState(0);

    if (loading) return (
        <Box sx={{minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <CircularProgress size={60}/>
        </Box>
    );

    if (error) return (
        <Container maxWidth="md" sx={{py: 8}}>
            <Alert severity="error" sx={{fontSize: '1.1rem', py: 2}}>
                {error.message}
            </Alert>
        </Container>
    );

    if (!data?.getPitch) return (
        <Container maxWidth="md" sx={{py: 8}}>
            <Alert severity="info" sx={{fontSize: '1.1rem', py: 2}}>
                {t('errors.notFound')}
            </Alert>
        </Container>
    );

    const pitch = data.getPitch;

    return (
        <Box sx={{minHeight: '100vh', bgcolor: 'background.default', py: 6}}>
            <Container maxWidth="lg">
                {/* Hero Section */}
                <Paper elevation={0}
                       sx={{borderRadius: 4, overflow: 'hidden', mb: 6, border: `1px solid ${theme.palette.divider}`}}>
                    {/* Main Image */}
                    <Box sx={{position: 'relative', height: {xs: 300, md: 500}}}>
                        <CardMedia
                            component="img"
                            height="100%"
                            image="/football_pitch.jpg"
                            alt={pitch.name}
                            sx={{objectFit: 'cover'}}
                        />


                        {/* Price Badge */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: 24,
                                right: 24,
                                bgcolor: theme.palette.primary.main,
                                color: 'white',
                                px: 3,
                                py: 1.5,
                                borderRadius: 3,
                                fontWeight: 700,
                                fontSize: '1.2rem',
                                boxShadow: `0 8px 24px ${theme.palette.primary.main}4d`
                            }}
                        >
                            £20/hour
                        </Box>
                    </Box>

                    {/* Content Section */}
                    <CardContent sx={{p: {xs: 3, md: 6}}}>
                        <Grid container spacing={6}>
                            {/* Main Content */}
                            <Grid>
                                <Box sx={{mb: 4}}>
                                    <Typography
                                        variant="h3"
                                        color="primary.main"
                                        component={Link}
                                        to={'/locations/' + pitch.location.id}
                                        sx={{textDecoration: 'none'}}>
                                        {pitch.name}
                                    </Typography>
                                    <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                                        <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                            <LocationOn sx={{color: theme.palette.primary.main}}/>
                                            <Chip label={pitch.location.address.addressLine}
                                                  sx={{color: theme.palette.secondary.main}}/>
                                        </Box>
                                    </Box>

                                    <Divider/>

                                    <Typography variant="body1"
                                                sx={{
                                                    color: 'text.secondary',
                                                    lineHeight: 1.8,
                                                    fontSize: '1.1rem',
                                                    mt: 2
                                                }}>
                                        Detailed description of the pitch goes here. Highlight key features,
                                        amenities, and any unique aspects that make this pitch stand out.
                                        Mention nearby landmarks or accessibility options if relevant.
                                    </Typography>
                                </Box>

                                {/* Tabs */}
                                <Box sx={{borderBottom: 1, borderColor: theme.palette.divider, mb: 4}}>
                                    <Tabs
                                        value={activeTab}
                                        onChange={(_e, newValue) => setActiveTab(newValue)}
                                        sx={{
                                            '& .MuiTab-root': {
                                                textTransform: 'none',
                                                fontSize: '1rem',
                                                fontWeight: 600,
                                                color: 'text.secondary',
                                                '&.Mui-selected': {
                                                    color: theme.palette.primary.main
                                                }
                                            }
                                        }}
                                    >
                                        <Tab label={t('pitches.details')}/>
                                        <Tab label={t('pitches.location')}/>
                                        <Tab label={t('navigation.profile')}/>
                                    </Tabs>
                                </Box>

                                {/* Tab Content */}
                                {activeTab === 0 && (
                                    <Box>
                                        <Typography variant="h5" sx={{mb: 3, color: 'text.primary'}}>
                                            {t('pitches.details')}
                                        </Typography>
                                        <Grid container spacing={3} sx={{mb: 4}}>
                                            <Grid size={{xs: 12, sm: 6}}>
                                                <Paper elevation={0} sx={{
                                                    p: 3,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    borderRadius: 3
                                                }}>
                                                    <PitchSvg
                                                        backgroundColor={getSurfaceTypeColor(pitch.surfaceType || '')}/>
                                                </Paper>
                                            </Grid>
                                            <Grid size={{xs: 12, sm: 6}}>
                                                <Paper elevation={0} sx={{
                                                    p: 3,
                                                    border: `1px solid ${theme.palette.divider}`,
                                                    borderRadius: 3
                                                }}>
                                                    <List>
                                                        <ListItem>Dimension:</ListItem>
                                                        <ListItem>Surface type:</ListItem>
                                                        <ListItem>Size:</ListItem>
                                                        <ListItem>Price:</ListItem>

                                                    </List>

                                                </Paper>
                                            </Grid>
                                        </Grid>

                                        <Typography variant="h5" sx={{mb: 3, color: 'text.primary'}}>
                                            {t('pitches.properties')}
                                        </Typography>
                                        <Grid container spacing={2}>
                                            {data.getPitch.properties.map((property, index) => (
                                                <Grid size={{xs: 12, sm: 4, md: 3}} key={index}>
                                                    <Paper elevation={0} sx={{
                                                        p: 3,
                                                        border: `1px solid ${theme.palette.divider}`,
                                                        borderRadius: 3,
                                                        textAlign: 'center',
                                                        transition: 'all 0.2s',
                                                        '&:hover': {
                                                            borderColor: theme.palette.primary.main
                                                        }
                                                    }}>
                                                        {pitchPropertyIconMap[property] || null}
                                                        <Typography variant="body2" fontWeight={600}
                                                                    color="primary">
                                                            {property}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                            {data.getPitch.location.properties.map((property, index) => (
                                                <Grid size={{xs: 12, sm: 4, md: 3}} key={index}>
                                                    <Paper elevation={0} sx={{
                                                        p: 3,
                                                        border: `1px solid ${theme.palette.divider}`,
                                                        borderRadius: 3,
                                                        textAlign: 'center',
                                                        transition: 'all 0.2s',
                                                        '&:hover': {
                                                            borderColor: theme.palette.primary.main}
                                                    }}>
                                                        {locationPropertyIconMap[property] || null}
                                                        <Typography variant="body2" fontWeight={600}
                                                                    color="primary">
                                                            {property}
                                                        </Typography>
                                                    </Paper>
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </Box>
                                )}

                                {activeTab === 1 && (
                                    <Box>
                                        <Typography variant="h5" sx={{mb: 3, color: 'text.primary'}}>
                                            {t('pitches.location')}
                                        </Typography>
                                        <Paper elevation={0} sx={{
                                            p: 4,
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 3
                                        }}>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 3}}>
                                                <LocationOn sx={{color: theme.palette.primary.main, fontSize: 28}}/>
                                                <Typography variant="h6" color="text.primary">
                                                    {t('locations.address')}
                                                </Typography>
                                            </Box>
                                            <Typography variant="body1"
                                                        sx={{color: 'text.secondary', lineHeight: 1.8, mb: 2}}>
                                                {pitch.location.address.addressLine}
                                            </Typography>
                                            <Typography variant="body1"
                                                        sx={{color: 'text.secondary', lineHeight: 1.8, mb: 1}}>
                                                {pitch.location.address.city}
                                            </Typography>
                                            {pitch.location.address.postalCode && (
                                                <Typography variant="body1"
                                                            sx={{color: 'text.secondary', lineHeight: 1.8, mb: 1}}>
                                                    {pitch.location.address.postalCode}
                                                </Typography>
                                            )}
                                        </Paper>
                                    </Box>
                                )}

                                {activeTab === 2 && (
                                    <Box>
                                        <Typography variant="h5" sx={{mb: 3, color: 'text.primary'}}>
                                            {t('locations.contact')}
                                        </Typography>
                                        <Paper elevation={0} sx={{
                                            p: 4,
                                            border: `1px solid ${theme.palette.divider}`,
                                            borderRadius: 3
                                        }}>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 3, mb: 3}}>
                                                <Avatar
                                                    sx={{
                                                        width: 80,
                                                        height: 80,
                                                        bgcolor: theme.palette.primary.main,
                                                        color: 'white',
                                                        fontWeight: 700,
                                                        fontSize: '2rem'
                                                    }}
                                                >
                                                    {pitch.location.contact.contactName.toUpperCase()}
                                                </Avatar>
                                                <Box>
                                                    <Typography variant="h5" fontWeight={700} color="text.primary">
                                                        {pitch.location.contact.contactName}
                                                    </Typography>
                                                    <Typography variant="body1" color="text.secondary">
                                                        {t('locations.contactName')}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <Box sx={{display: 'flex', alignItems: 'center', gap: 2, mb: 2}}>
                                                <Email sx={{color: theme.palette.primary.main}}/>
                                                <Typography variant="body1" color="text.primary">
                                                    {pitch.location.contact.email}
                                                </Typography>
                                            </Box>
                                        </Paper>
                                    </Box>
                                )}
                            </Grid>

                            {/* Sidebar */}
                            <Grid size={{xs: 12}}>
                                <Box sx={{position: 'sticky', top: 24}}>
                                    <Paper elevation={0}
                                           sx={{p: 4, border: `1px solid ${theme.palette.divider}`, borderRadius: 3}}>
                                        <Typography variant="h5" sx={{mb: 3, color: 'text.primary'}}>
                                            Quick Info
                                        </Typography>
                                    </Paper>
                                </Box>
                            </Grid>
                        </Grid>
                    </CardContent>

                </Paper>
            </Container>

            {/* Image Gallery Dialog */}
            <Dialog
                open={imageDialogOpen}
                onClose={() => setImageDialogOpen(false)}
                maxWidth="lg"
                fullWidth
            >
                <DialogContent sx={{p: 0, position: 'relative'}}>
                    <IconButton
                        onClick={() => setImageDialogOpen(false)}
                        sx={{
                            position: 'absolute',
                            top: 8,
                            right: 8,
                            bgcolor: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            zIndex: 1,
                            '&:hover': {bgcolor: 'rgba(0, 0, 0, 0.7)'}
                        }}
                    >
                        <Close/>
                    </IconButton>
                    <CardMedia
                        component="img"
                        image="/football_pitch.jpg"
                        alt={pitch.name}
                        sx={{width: '100%', height: 'auto'}}
                    />
                </DialogContent>
            </Dialog>
        </Box>
    );
};

export default PitchDetail; 