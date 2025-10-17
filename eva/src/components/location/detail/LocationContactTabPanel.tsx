import {Email, Language, Phone} from "@mui/icons-material";
import {
    Avatar,
    Box,
    Button,
    Card,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Typography,
    useTheme
} from "@mui/material";
import type {LocationView} from "../../../services/location.ts";

interface LocationContactTabPanelProps {
    location: LocationView
}

export function LocationContactTabPanel({location}: Readonly<LocationContactTabPanelProps>) {
    const theme = useTheme();

    return (
        <Grid container spacing={4}>
            <Grid size={{xs: 12}}>
                <Typography variant="h5" sx={{mb: 3}}>
                    Contact Information
                </Typography>

                <Divider sx={{mb: 3}}/>

                <List>
                    <ListItem sx={{px: 0}}>
                        <ListItemIcon>
                            <Phone sx={{color: theme.palette.primary.main}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Phone"
                            secondary={
                                <Button
                                    href={`tel:${location.contact.phoneNumber}`}
                                    sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                >
                                    {location.contact.phoneNumber}
                                </Button>
                            }
                        />
                    </ListItem>

                    <ListItem sx={{px: 0}}>
                        <ListItemIcon>
                            <Email sx={{color: theme.palette.primary.main}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Email"
                            secondary={
                                <Button
                                    href={`mailto:${location.contact.email}`}
                                    sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                >
                                    {location.contact.email}
                                </Button>
                            }
                        />
                    </ListItem>

                    <ListItem sx={{px: 0}}>
                        <ListItemIcon>
                            <Language sx={{color: theme.palette.primary.main}}/>
                        </ListItemIcon>
                        <ListItemText
                            primary="Website"
                            secondary={
                                <Button
                                    href={location.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                >
                                    {location.website}
                                </Button>
                            }
                        />
                    </ListItem>
                </List>
            </Grid>

            <Grid size={{xs: 12}}>
                <Typography variant="h5" sx={{mb: 2}}>
                    Location Owner
                </Typography>

                <Card elevation={2} sx={{borderRadius: 3, p: 3}}>
                    <Box sx={{display: 'flex', alignItems: 'center', mb: 2}}>
                        <Avatar sx={{mr: 2, bgcolor: theme.palette.primary.main}}>
                            {location.contact.contactName.charAt(0).toUpperCase()}
                        </Avatar>
                        <Box>
                            <Typography variant="h6" fontWeight={600}>
                                {location.contact.contactName}
                            </Typography>
                        </Box>
                    </Box>

                    {location.contact.email && (
                        <Button
                            variant="outlined"
                            startIcon={<Email/>}
                            href={`mailto:${location.contact.email}`}
                            fullWidth
                            sx={{mb: 1}}
                        >
                            Contact Owner
                        </Button>
                    )}
                </Card>
            </Grid>
        </Grid>
    );
}