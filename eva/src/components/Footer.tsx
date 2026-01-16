import {Email, EventAvailable, Language, LocationOn, Phone, SportsSoccer} from "@mui/icons-material";
import {Box, Button, Container, Grid, List, ListItem, ListItemIcon, ListItemText, Typography} from "@mui/material";
import theme from "../theme/theme.ts";
import {Link as RouterLink} from 'react-router-dom';


export function Footer() {
    return (
        <Box sx={{background: `linear-gradient(135deg, ${theme.palette.primary.main}15 0%, ${theme.palette.primary.main}15 100%)`, py: 4, borderTop: `1px solid ${theme.palette.divider}`}}>
            <Container maxWidth="lg">
                <Grid container spacing={4}>
                    <Grid size={{xs: 6}}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Quick Links
                        </Typography>
                        <List dense>
                            <ListItem sx={{px: 0}}>
                                <ListItemIcon sx={{minWidth: 32}}>
                                    <SportsSoccer fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Button
                                            component={RouterLink}
                                            to="/pitches"
                                            sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                        >
                                            Find Pitches
                                        </Button>
                                    }
                                />
                            </ListItem>
                            <ListItem sx={{px: 0}}>
                                <ListItemIcon sx={{minWidth: 32}}>
                                    <LocationOn fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Button
                                            component={RouterLink}
                                            to="/locations"
                                            sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                        >
                                            Browse Locations
                                        </Button>
                                    }
                                />
                            </ListItem>
                            <ListItem sx={{px: 0}}>
                                <ListItemIcon sx={{minWidth: 32}}>
                                    <EventAvailable fontSize="small"/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={
                                        <Button
                                            component={RouterLink}
                                            to="/register"
                                            sx={{p: 0, textTransform: 'none', color: 'inherit'}}
                                        >
                                            Join Now
                                        </Button>
                                    }
                                />
                            </ListItem>
                        </List>
                    </Grid>
                    <Grid size={{xs: 6}}>
                        <Typography variant="h6" fontWeight={600} gutterBottom>
                            Contact & Support
                        </Typography>
                        <Box sx={{display: 'flex', flexDirection: 'column', gap: 1}}>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <Email fontSize="small" color="action"/>
                                <Typography variant="body2" color="text.secondary">
                                    support@evafootball.com
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <Phone fontSize="small" color="action"/>
                                <Typography variant="body2" color="text.secondary">
                                    +1 (555) 123-4567
                                </Typography>
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                                <Language fontSize="small" color="action"/>
                                <Typography variant="body2" color="text.secondary">
                                    www.evafootball.com
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}