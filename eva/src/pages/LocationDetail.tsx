import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Chip,
  CircularProgress,
  Alert,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Avatar,
  useTheme,
  Tab,
  Tabs,
  Tooltip
} from '@mui/material';
import {
  LocationOn,
  Phone,
  Email,
  Language,
  LocalParking,
  Shower,
  MeetingRoom,
  SportsSoccer,
  AccessTime,
  AttachMoney,
  Star,
  ArrowBack,
  Info,
  Map,
  ContactPhone,
  Directions,
  Share,
  GpsFixed,
} from '@mui/icons-material';

const GET_LOCATION_DETAIL = gql`
  query GetLocationDetail($id: ID!) {
    location(id: $id) {
      id
      name
      description
      address
      postalCode
      phoneNumber
      email
      website
      latitude
      longitude
      hasParking
      hasShowers
      hasChangingRooms
      hasCafe
      hasEquipmentRental
      isActive
      owner {
        id
        username
        email
        firstName
        lastName
        phoneNumber
      }
      footballPitches {
        id
        name
        description
        pricePerHour
        pitchType
        surfaceType
        capacity
        hasLighting
        imageUrls
        isActive
      }
    }
  }
`;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: Readonly<TabPanelProps>) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`location-tabpanel-${index}`}
      aria-labelledby={`location-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const LocationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  const { loading, error, data } = useQuery(GET_LOCATION_DETAIL, {
    variables: { id: id },
    skip: !id
  });

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location permission denied or error:', error);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const getFallbackImage = () => {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=400&fit=crop';
  };

  const getPitchTypeColor = (pitchType: string) => {
    const colors: { [key: string]: string } = {
      'FULL_SIZE': theme.palette.primary.main,
      'HALF_SIZE': theme.palette.secondary.main,
      'FIVE_A_SIDE': theme.palette.success.main,
      'SEVEN_A_SIDE': theme.palette.warning.main,
      'INDOOR': theme.palette.info.main,
      'OUTDOOR': theme.palette.error.main
    };
    return colors[pitchType] || theme.palette.grey[500];
  };

  const getSurfaceTypeColor = (surfaceType: string) => {
    const colors: { [key: string]: string } = {
      'GRASS': '#4caf50',
      'ARTIFICIAL_GRASS': '#8bc34a',
      'CONCRETE': '#9e9e9e',
      'ASPHALT': '#607d8b',
      'TURF': '#795548',
      'HARDCOURT': '#ff9800'
    };
    return colors[surfaceType] || theme.palette.grey[500];
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };

  // Format distance for display
  const formatDistance = (distance: number): string => {
    if (distance < 1) {
      return `${Math.round(distance * 1000)}m`;
    } else if (distance < 10) {
      return `${distance.toFixed(1)}km`;
    } else {
      return `${Math.round(distance)}km`;
    }
  };

  // Get directions URL
  const getDirectionsUrl = (location: any): string => {
    if (location.latitude && location.longitude) {
      return `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    }
    return `https://www.google.com/maps/search/${encodeURIComponent(location.address)}`;
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="60vh">
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="error" sx={{ mb: 4 }}>
          {error.message}
        </Alert>
      </Container>
    );
  }

  if (!data?.location) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning">
          Location not found.
        </Alert>
      </Container>
    );
  }

  const location = data.location;

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 4 }}>
      <Container maxWidth="lg">
        {/* Back Button */}
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          sx={{ mb: 3 }}
        >
          Back to Search
        </Button>

        {/* Header Section */}
        <Paper elevation={3} sx={{ borderRadius: 3, overflow: 'hidden', mb: 4 }}>
          <Box sx={{ position: 'relative' }}>
            <CardMedia
              component="img"
              height="300"
              image={getFallbackImage()}
              alt={location.name}
              sx={{ objectFit: 'cover' }}
            />
            <Box
              sx={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0,0,0,0.7))',
                p: 3,
                color: 'white'
              }}
            >
              <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
                {location.name}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn />
                  <Typography variant="h6">
                    {location.address}
                  </Typography>
                </Box>
                <Chip
                  label={`${location.footballPitches?.length || 0} Pitches`}
                  color="primary"
                  sx={{ fontWeight: 600 }}
                />
                {userLocation && location.latitude && location.longitude && (
                  <Chip
                    icon={<GpsFixed />}
                    label={formatDistance(calculateDistance(
                      userLocation.lat, 
                      userLocation.lng, 
                      location.latitude, 
                      location.longitude
                    ))}
                    color="success"
                    sx={{ 
                      fontWeight: 600,
                      bgcolor: 'success.main',
                      color: 'white'
                    }}
                  />
                )}
              </Box>
            </Box>
          </Box>
        </Paper>

        {/* Tabs */}
        <Paper elevation={2} sx={{ borderRadius: 3, mb: 4 }}>
          <Tabs
            value={tabValue}
            onChange={handleTabChange}
            variant="fullWidth"
            sx={{
              borderBottom: 1,
              borderColor: 'divider',
              '& .MuiTab-root': {
                fontWeight: 600,
                fontSize: '1rem',
                py: 2
              }
            }}
          >
            <Tab icon={<Info />} label="Overview" />
            <Tab icon={<SportsSoccer />} label="Pitches" />
            <Tab icon={<ContactPhone />} label="Contact" />
            <Tab icon={<Map />} label="Location" />
          </Tabs>

          {/* Overview Tab */}
          <TabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                  About This Location
                </Typography>
                <Typography variant="body1" sx={{ mb: 4, lineHeight: 1.8 }}>
                  {location.description || 'No description available for this location.'}
                </Typography>

                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Address
                </Typography>
                <Typography variant="body1" sx={{ mb: 3 }}>
                  {location.address}<br />
                  {location.postalCode && `${location.postalCode}`}
                </Typography>

                <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                  Facilities & Amenities
                </Typography>
                <Grid container spacing={2} sx={{ mb: 3 }}>
                  {location.hasParking && (
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <LocalParking sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2" fontWeight={500}>Parking</Typography>
                      </Box>
                    </Grid>
                  )}
                  {location.hasShowers && (
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <Shower sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2" fontWeight={500}>Showers</Typography>
                      </Box>
                    </Grid>
                  )}
                  {location.hasChangingRooms && (
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <MeetingRoom sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2" fontWeight={500}>Changing Rooms</Typography>
                      </Box>
                    </Grid>
                  )}
                  {location.hasCafe && (
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <AccessTime sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2" fontWeight={500}>Cafe</Typography>
                      </Box>
                    </Grid>
                  )}
                  {location.hasEquipmentRental && (
                    <Grid item xs={6} sm={4}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 2, bgcolor: 'background.paper', borderRadius: 2 }}>
                        <SportsSoccer sx={{ color: theme.palette.primary.main }} />
                        <Typography variant="body2" fontWeight={500}>Equipment Rental</Typography>
                      </Box>
                    </Grid>
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12} md={4}>
                <Card elevation={2} sx={{ borderRadius: 3, p: 3 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Quick Info
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemIcon>
                        <SportsSoccer sx={{ color: theme.palette.primary.main }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Total Pitches"
                        secondary={location.footballPitches?.length || 0}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AttachMoney sx={{ color: theme.palette.primary.main }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Average Price"
                        secondary={`£${location.footballPitches && location.footballPitches.length > 0 
                          ? Math.round(location.footballPitches.reduce((sum: number, pitch: any) => sum + pitch.pricePerHour, 0) / location.footballPitches.length)
                          : 0}/hr`}
                      />
                    </ListItem>
                    {userLocation && location.latitude && location.longitude && (
                      <ListItem>
                        <ListItemIcon>
                          <GpsFixed sx={{ color: theme.palette.success.main }} />
                        </ListItemIcon>
                        <ListItemText
                          primary="Distance"
                          secondary={formatDistance(calculateDistance(
                            userLocation.lat, 
                            userLocation.lng, 
                            location.latitude, 
                            location.longitude
                          ))}
                        />
                      </ListItem>
                    )}
                    <ListItem>
                      <ListItemIcon>
                        <Star sx={{ color: theme.palette.primary.main }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Status"
                        secondary={location.isActive ? 'Active' : 'Inactive'}
                      />
                    </ListItem>
                  </List>
                  
                  {/* Directions Button */}
                  <Box sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      startIcon={<Directions />}
                      href={getDirectionsUrl(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ 
                        borderRadius: 2,
                        py: 1.5,
                        fontWeight: 600
                      }}
                    >
                      {userLocation ? 'Get Directions' : 'Open in Maps'}
                    </Button>
                  </Box>
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Pitches Tab */}
          <TabPanel value={tabValue} index={1}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Available Pitches ({location.footballPitches?.length || 0})
            </Typography>
            
            {location.footballPitches && location.footballPitches.length > 0 ? (
              <Grid container spacing={3}>
                {location.footballPitches.map((pitch: any) => (
                  <Grid item xs={12} md={6} key={pitch.id}>
                    <Card 
                      elevation={2}
                      sx={{ 
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4
                        }
                      }}
                    >
                      <CardMedia
                        component="img"
                        height="200"
                        image={pitch.imageUrls && pitch.imageUrls.length > 0 ? pitch.imageUrls[0] : getFallbackImage()}
                        alt={pitch.name}
                        sx={{ objectFit: 'cover' }}
                      />
                      <CardContent sx={{ p: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Typography variant="h6" fontWeight={700} sx={{ flex: 1 }}>
                            {pitch.name}
                          </Typography>
                          <Typography variant="h6" fontWeight={700} color="primary.main">
                            £{pitch.pricePerHour}/hr
                          </Typography>
                        </Box>
                        
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {pitch.description}
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 1, mb: 2, flexWrap: 'wrap' }}>
                          <Chip
                            label={pitch.pitchType?.replace('_', ' ')}
                            size="small"
                            sx={{ 
                              bgcolor: getPitchTypeColor(pitch.pitchType),
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                          <Chip
                            label={pitch.surfaceType?.replace('_', ' ')}
                            size="small"
                            sx={{ 
                              bgcolor: getSurfaceTypeColor(pitch.surfaceType),
                              color: 'white',
                              fontWeight: 600
                            }}
                          />
                          {pitch.hasLighting && (
                            <Chip
                              label="Lighting"
                              size="small"
                              sx={{ 
                                bgcolor: theme.palette.warning.main,
                                color: 'white',
                                fontWeight: 600
                              }}
                            />
                          )}
                          {pitch.capacity && (
                            <Chip
                              label={`${pitch.capacity} players`}
                              size="small"
                              variant="outlined"
                            />
                          )}
                        </Box>

                        <Box sx={{ display: 'flex', gap: 2 }}>
                          <Button
                            variant="contained"
                            fullWidth
                            onClick={() => navigate(`/pitches/${pitch.id}`)}
                            sx={{ 
                              fontWeight: 600,
                              borderRadius: 2,
                              py: 1.5
                            }}
                          >
                            View Details
                          </Button>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Alert severity="info">
                No pitches available at this location.
              </Alert>
            )}
          </TabPanel>

          {/* Contact Tab */}
          <TabPanel value={tabValue} index={2}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                  Contact Information
                </Typography>
                
                <List>
                  {location.phoneNumber && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Phone sx={{ color: theme.palette.primary.main }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Phone"
                        secondary={
                          <Button
                            href={`tel:${location.phoneNumber}`}
                            sx={{ p: 0, textTransform: 'none', color: 'inherit' }}
                          >
                            {location.phoneNumber}
                          </Button>
                        }
                      />
                    </ListItem>
                  )}
                  
                  {location.email && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Email sx={{ color: theme.palette.primary.main }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Email"
                        secondary={
                          <Button
                            href={`mailto:${location.email}`}
                            sx={{ p: 0, textTransform: 'none', color: 'inherit' }}
                          >
                            {location.email}
                          </Button>
                        }
                      />
                    </ListItem>
                  )}
                  
                  {location.website && (
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon>
                        <Language sx={{ color: theme.palette.primary.main }} />
                      </ListItemIcon>
                      <ListItemText
                        primary="Website"
                        secondary={
                          <Button
                            href={location.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ p: 0, textTransform: 'none', color: 'inherit' }}
                          >
                            {location.website}
                          </Button>
                        }
                      />
                    </ListItem>
                  )}
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
                  Location Owner
                </Typography>
                
                <Card elevation={2} sx={{ borderRadius: 3, p: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main }}>
                      {location.owner?.firstName?.charAt(0) || location.owner?.username?.charAt(0) || 'U'}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" fontWeight={600}>
                        {location.owner?.firstName && location.owner?.lastName 
                          ? `${location.owner.firstName} ${location.owner.lastName}`
                          : location.owner?.username
                        }
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Location Owner
                      </Typography>
                    </Box>
                  </Box>
                  
                  {location.owner?.email && (
                    <Button
                      variant="outlined"
                      startIcon={<Email />}
                      href={`mailto:${location.owner.email}`}
                      fullWidth
                      sx={{ mb: 1 }}
                    >
                      Contact Owner
                    </Button>
                  )}
                </Card>
              </Grid>
            </Grid>
          </TabPanel>

          {/* Location Tab */}
          <TabPanel value={tabValue} index={3}>
            <Typography variant="h5" fontWeight={700} sx={{ mb: 3 }}>
              Location Details
            </Typography>
            
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ borderRadius: 3, p: 3 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Address
                  </Typography>
                  <Typography variant="body1" sx={{ mb: 3 }}>
                    {location.address}<br />
                    {location.postalCode && `${location.postalCode}`}
                  </Typography>
                  
                  {/* Distance Information */}
                  {userLocation && location.latitude && location.longitude && (
                    <Box sx={{ mb: 3, p: 2, bgcolor: 'success.light', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <GpsFixed sx={{ color: 'success.dark' }} />
                        <Typography variant="body2" fontWeight={600} color="success.dark">
                          Distance from your location
                        </Typography>
                      </Box>
                      <Typography variant="h6" fontWeight={700} color="success.dark">
                        {formatDistance(calculateDistance(
                          userLocation.lat, 
                          userLocation.lng, 
                          location.latitude, 
                          location.longitude
                        ))}
                      </Typography>
                    </Box>
                  )}
                  
                  {location.latitude && location.longitude && (
                    <Box sx={{ mt: 3 }}>
                      <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                        Coordinates
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                        <Tooltip title="Click to copy coordinates">
                          <Chip
                            icon={<Map />}
                            label={`${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}`}
                            variant="outlined"
                            sx={{ 
                              cursor: 'pointer',
                              '&:hover': {
                                bgcolor: theme.palette.action.hover
                              }
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(`${location.latitude}, ${location.longitude}`);
                            }}
                          />
                        </Tooltip>
                      </Box>
                      <Typography variant="body2" color="text.secondary">
                        Click the coordinates above to copy them to your clipboard.
                      </Typography>
                    </Box>
                  )}
                </Card>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Card elevation={2} sx={{ borderRadius: 3, p: 3 }}>
                  <Typography variant="h6" fontWeight={600} sx={{ mb: 2 }}>
                    Get Directions
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    {userLocation ? 
                      'Get directions from your current location to this football facility.' :
                      'Enable location access to get directions from your current location.'
                    }
                  </Typography>
                  
                  <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    <Button
                      variant="contained"
                      startIcon={<Directions />}
                      href={getDirectionsUrl(location)}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{ flex: 1, minWidth: 200 }}
                    >
                      {userLocation ? 'Get Directions' : 'Open in Maps'}
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<Share />}
                      onClick={() => {
                        if (navigator.share) {
                          navigator.share({
                            title: location.name,
                            text: `Check out ${location.name} at ${location.address}`,
                            url: window.location.href
                          });
                        } else {
                          navigator.clipboard.writeText(window.location.href);
                        }
                      }}
                      sx={{ flex: 1, minWidth: 200 }}
                    >
                      Share Location
                    </Button>
                  </Box>
                  
                  {!userLocation && (
                    <Box sx={{ mt: 2, p: 2, bgcolor: 'info.light', borderRadius: 2 }}>
                      <Typography variant="body2" color="info.dark">
                        💡 Enable location access to see distance and get directions from your current location.
                      </Typography>
                    </Box>
                  )}
                </Card>
              </Grid>
            </Grid>
            
            {/* Enhanced Map Section */}
            <Box sx={{ mt: 4 }}>
              <Card elevation={2} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ p: 3, borderBottom: 1, borderColor: 'divider' }}>
                  <Typography variant="h6" fontWeight={600}>
                    Location Map
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {location.latitude && location.longitude ? 
                      'Interactive map showing the exact location of this football facility.' :
                      'Map will be available once coordinates are added.'
                    }
                  </Typography>
                </Box>
                
                {location.latitude && location.longitude ? (
                  <Box sx={{ height: 400, position: 'relative' }}>
                    <iframe
                      src={`https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${location.latitude},${location.longitude}`}
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </Box>
                ) : (
                  <Box sx={{ height: 400, bgcolor: 'grey.100', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Map sx={{ fontSize: 60, color: 'grey.400', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                        Map Not Available
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Coordinates need to be added to display the map.
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Card>
            </Box>
          </TabPanel>
        </Paper>
      </Container>
    </Box>
  );
};

export default LocationDetail; 