import React, {useEffect, useState} from 'react';
import {gql, useQuery} from '@apollo/client';
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  Collapse,
  Container,
  Divider,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Paper,
  Radio,
  RadioGroup,
  Select,
  TextField,
  Tooltip,
  Typography,
  useTheme
} from '@mui/material';
import {
  Clear,
  Directions,
  Euro,
  GpsFixed,
  LocalParking,
  LocationOn,
  Map,
  MeetingRoom,
  MyLocation,
  Phone,
  Restaurant,
  Search,
  Shower,
  Sort,
  SportsEsports,
  SportsSoccer,
  Tune
} from '@mui/icons-material';
import {useNavigate} from 'react-router-dom';

const SEARCH_LOCATIONS = gql`
  query SearchLocations(
    $hasShowers: Boolean
    $hasChangingRooms: Boolean
    $hasCafe: Boolean
    $hasEquipmentRental: Boolean
    $hasParking: Boolean
  ) {
    searchLocations(
      hasShowers: $hasShowers
      hasChangingRooms: $hasChangingRooms
      hasCafe: $hasCafe
      hasEquipmentRental: $hasEquipmentRental
      hasParking: $hasParking
    ) {
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
        username
      }
      footballPitches {
        id
        name
        pricePerHour
        pitchType
        surfaceType
        hasLighting
        capacity
      }
    }
  }
`;

const LocationList: React.FC = () => {
  const theme = useTheme();
  const [filters, setFilters] = useState({
    searchTerm: '',
    hasParking: false,
    hasShowers: false,
    hasChangingRooms: false,
    hasCafe: false,
    hasEquipmentRental: false,
    minPitches: '',
    sortBy: 'name',
    sortOrder: 'asc'
  });
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [allLocations, setAllLocations] = useState<any[]>([]);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationPermission, setLocationPermission] = useState<'granted' | 'denied' | 'prompt'>('prompt');
  const navigate = useNavigate();

  // Get user's location on component mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationPermission('granted');
        },
        (error) => {
          console.log('Location permission denied or error:', error);
          setLocationPermission('denied');
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 300000 // 5 minutes
        }
      );
    }
  }, []);

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

  const { loading, error, data, refetch } = useQuery(SEARCH_LOCATIONS, {
    variables: {
      hasParking: filters.hasParking || null,
      hasShowers: filters.hasShowers || null,
      hasChangingRooms: filters.hasChangingRooms || null,
      hasCafe: filters.hasCafe || null,
      hasEquipmentRental: filters.hasEquipmentRental || null
    },
    onCompleted: (data) => {
      if (data?.searchLocations) {
        setAllLocations(data.searchLocations);
        setHasMore(data.searchLocations.length >= 12); // Assuming 12 items per page
      }
    }
  });

  const handleFilterChange = (field: string, value: any) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const handleSearch = () => {
    setCurrentPage(0);
    setHasMore(true);
    setAllLocations([]);
    refetch({
      hasParking: filters.hasParking || null,
      hasShowers: filters.hasShowers || null,
      hasChangingRooms: filters.hasChangingRooms || null,
      hasCafe: filters.hasCafe || null,
      hasEquipmentRental: filters.hasEquipmentRental || null
    });
  };

  const handleLoadMore = () => {
    // For locations, we'll simulate pagination by showing more items
    // since the GraphQL query returns all locations at once
    const nextPage = currentPage + 1;
    setCurrentPage(nextPage);
    
    // Check if we have more items to show
    const itemsPerPage = 12;
    const totalItems = allLocations.length;
    const displayedItems = (nextPage + 1) * itemsPerPage;
    
    setHasMore(displayedItems < totalItems);
  };

  const clearFilters = () => {
    setFilters({
      searchTerm: '',
      hasParking: false,
      hasShowers: false,
      hasChangingRooms: false,
      hasCafe: false,
      hasEquipmentRental: false,
      minPitches: '',
      sortBy: 'name',
      sortOrder: 'asc'
    });
    setCurrentPage(0);
    setHasMore(true);
    setAllLocations([]);
  };

  const getActiveFiltersCount = () => {
    return Object.values(filters).filter(value => 
      value !== '' && value !== false && value !== 'name' && value !== 'asc'
    ).length;
  };

  const getFallbackImage = () => {
    return 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&h=250&fit=crop';
  };

  const getAveragePrice = (pitches: any[]) => {
    if (!pitches || pitches.length === 0) return 0;
    const total = pitches.reduce((sum, pitch) => sum + pitch.pricePerHour, 0);
    return Math.round(total / pitches.length);
  };

  const getPitchTypes = (pitches: any[]) => {
    if (!pitches || pitches.length === 0) return [];
    const types = Array.from(new Set(pitches.map(pitch => pitch.pitchType)));
    return types.slice(0, 3); // Show max 3 types
  };

  const countries = [
    { value: 'United Kingdom', label: 'United Kingdom' },
    { value: 'England', label: 'England' },
    { value: 'Scotland', label: 'Scotland' },
    { value: 'Wales', label: 'Wales' },
    { value: 'Northern Ireland', label: 'Northern Ireland' },
    { value: 'Ireland', label: 'Ireland' },
    { value: 'Germany', label: 'Germany' },
    { value: 'France', label: 'France' },
    { value: 'Spain', label: 'Spain' },
    { value: 'Italy', label: 'Italy' }
  ];

  const cities = [
    { value: 'London', label: 'London' },
    { value: 'Manchester', label: 'Manchester' },
    { value: 'Birmingham', label: 'Birmingham' },
    { value: 'Liverpool', label: 'Liverpool' },
    { value: 'Leeds', label: 'Leeds' },
    { value: 'Sheffield', label: 'Sheffield' },
    { value: 'Edinburgh', label: 'Edinburgh' },
    { value: 'Glasgow', label: 'Glasgow' },
    { value: 'Cardiff', label: 'Cardiff' },
    { value: 'Belfast', label: 'Belfast' }
  ];

  const pitchCountOptions = [
    { value: '1', label: '1+ pitches' },
    { value: '2', label: '2+ pitches' },
    { value: '3', label: '3+ pitches' },
    { value: '5', label: '5+ pitches' },
    { value: '10', label: '10+ pitches' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'city', label: 'City' },
    { value: 'pitchCount', label: 'Number of Pitches' },
    { value: 'rating', label: 'Rating' },
    { value: 'distance', label: 'Distance (if location enabled)' }
  ];

  // Filter locations based on search term and other filters
  const filteredLocations = allLocations.filter((location: any) => {
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      const matchesSearch = 
        location.name.toLowerCase().includes(searchLower) ||
        location.description?.toLowerCase().includes(searchLower) ||
        location.address.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    if (filters.minPitches && location.footballPitches.length < parseInt(filters.minPitches)) {
      return false;
    }

    return true;
  });

  // Sort locations if distance sorting is selected
  const sortedLocations = [...filteredLocations].sort((a: any, b: any) => {
    if (filters.sortBy === 'distance' && userLocation) {
      const distanceA = a.latitude && a.longitude ? 
        calculateDistance(userLocation.lat, userLocation.lng, a.latitude, a.longitude) : Infinity;
      const distanceB = b.latitude && b.longitude ? 
        calculateDistance(userLocation.lat, userLocation.lng, b.latitude, b.longitude) : Infinity;
      return filters.sortOrder === 'asc' ? distanceA - distanceB : distanceB - distanceA;
    }
    return 0;
  });

  // Apply pagination to filtered results
  const itemsPerPage = 12;
  const displayedLocations = sortedLocations.slice(0, (currentPage + 1) * itemsPerPage);

  return (
    <Box sx={{ bgcolor: 'background.default', minHeight: '100vh', py: 6 }}>
      <Container maxWidth="lg">
        {/* Location Permission Request */}
        {locationPermission === 'denied' && (
          <Alert 
            severity="info" 
            sx={{ mb: 3, borderRadius: 2 }}
            action={
              <Button 
                color="inherit" 
                size="small"
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      (position) => {
                        setUserLocation({
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        });
                        setLocationPermission('granted');
                      },
                      () => setLocationPermission('denied')
                    );
                  }
                }}
              >
                Enable Location
              </Button>
            }
          >
            Enable location access to see distances and get directions to football locations.
          </Alert>
        )}

        {/* Modern Search Header */}
        <Paper elevation={3} sx={{ p: 4, mb: 6, borderRadius: 3 }}>
          <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
            <Typography variant="h4" fontWeight={700} color="primary.main">
              Find Football Locations
            </Typography>
            <Box display="flex" gap={1}>
              {userLocation && (
                <Chip
                  icon={<MyLocation />}
                  label="Location Enabled"
                  color="success"
                  variant="outlined"
                  sx={{ fontWeight: 600 }}
                />
              )}
              <Button
                variant="outlined"
                startIcon={<Tune />}
                onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
                sx={{ borderRadius: 2 }}
              >
                Filters {getActiveFiltersCount() > 0 && `(${getActiveFiltersCount()})`}
              </Button>
              {getActiveFiltersCount() > 0 && (
                <Button
                  variant="text"
                  startIcon={<Clear />}
                  onClick={clearFilters}
                  sx={{ borderRadius: 2 }}
                >
                  Clear
                </Button>
              )}
            </Box>
          </Box>

          {/* Main Search Bar */}
          <Box display="flex" gap={2} mb={3}>
            <TextField
              fullWidth
              placeholder="Search by location name, description, or address..."
              value={filters.searchTerm}
              onChange={e => handleFilterChange('searchTerm', e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search sx={{ color: 'primary.main' }} />
                  </InputAdornment>
                ),
                sx: { borderRadius: 2 }
              }}
            />
            <Button
              variant="contained"
              size="large"
              onClick={handleSearch}
              sx={{ 
                px: 4, 
                borderRadius: 2,
                minWidth: 120
              }}
            >
              Search
            </Button>
          </Box>

          {/* Active Filters Display */}
          {getActiveFiltersCount() > 0 && (
            <Box display="flex" gap={1} flexWrap="wrap" mb={3}>
              {filters.searchTerm && (
                <Chip 
                  label={`Search: ${filters.searchTerm}`} 
                  onDelete={() => handleFilterChange('searchTerm', '')}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.minPitches && (
                <Chip 
                  label={`Min Pitches: ${pitchCountOptions.find(p => p.value === filters.minPitches)?.label}`} 
                  onDelete={() => handleFilterChange('minPitches', '')}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.hasParking && (
                <Chip 
                  label="Parking" 
                  onDelete={() => handleFilterChange('hasParking', false)}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.hasShowers && (
                <Chip 
                  label="Showers" 
                  onDelete={() => handleFilterChange('hasShowers', false)}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.hasChangingRooms && (
                <Chip 
                  label="Changing Rooms" 
                  onDelete={() => handleFilterChange('hasChangingRooms', false)}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.hasCafe && (
                <Chip 
                  label="Cafe" 
                  onDelete={() => handleFilterChange('hasCafe', false)}
                  color="primary"
                  variant="outlined"
                />
              )}
              {filters.hasEquipmentRental && (
                <Chip 
                  label="Equipment Rental" 
                  onDelete={() => handleFilterChange('hasEquipmentRental', false)}
                  color="primary"
                  variant="outlined"
                />
              )}
            </Box>
          )}

          {/* Advanced Filters */}
          <Collapse in={showAdvancedFilters}>
            <Divider sx={{ my: 3 }} />
            <Grid container spacing={4}>
              {/* Pitch Count */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Minimum Pitches</InputLabel>
                  <Select
                    value={filters.minPitches}
                    onChange={e => handleFilterChange('minPitches', e.target.value)}
                    label="Minimum Pitches"
                  >
                    <MenuItem value="">Any Number</MenuItem>
                    {pitchCountOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <SportsSoccer fontSize="small" />
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              {/* Amenities */}
              <Grid item xs={12}>
                <Typography variant="h6" fontWeight={600} gutterBottom>
                  Amenities & Facilities
                </Typography>
                <FormGroup row>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.hasParking}
                        onChange={e => handleFilterChange('hasParking', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocalParking sx={{ color: theme.palette.primary.main }} />
                        Parking
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.hasShowers}
                        onChange={e => handleFilterChange('hasShowers', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Shower sx={{ color: theme.palette.primary.main }} />
                        Showers
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.hasChangingRooms}
                        onChange={e => handleFilterChange('hasChangingRooms', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <MeetingRoom sx={{ color: theme.palette.primary.main }} />
                        Changing Rooms
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.hasCafe}
                        onChange={e => handleFilterChange('hasCafe', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Restaurant sx={{ color: theme.palette.primary.main }} />
                        Cafe
                      </Box>
                    }
                  />
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={filters.hasEquipmentRental}
                        onChange={e => handleFilterChange('hasEquipmentRental', e.target.checked)}
                        color="primary"
                      />
                    }
                    label={
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <SportsEsports sx={{ color: theme.palette.primary.main }} />
                        Equipment Rental
                      </Box>
                    }
                  />
                </FormGroup>
              </Grid>

              {/* Sort Options */}
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel>Sort By</InputLabel>
                  <Select
                    value={filters.sortBy}
                    onChange={e => handleFilterChange('sortBy', e.target.value)}
                    label="Sort By"
                  >
                    {sortOptions.map(option => (
                      <MenuItem key={option.value} value={option.value}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          <Sort fontSize="small" />
                          {option.label}
                        </Box>
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={12} md={6}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Sort Order</FormLabel>
                  <RadioGroup
                    row
                    value={filters.sortOrder}
                    onChange={e => handleFilterChange('sortOrder', e.target.value)}
                  >
                    <FormControlLabel value="asc" control={<Radio />} label="A to Z" />
                    <FormControlLabel value="desc" control={<Radio />} label="Z to A" />
                  </RadioGroup>
                </FormControl>
              </Grid>
            </Grid>
          </Collapse>
        </Paper>

        {/* Results Section */}
        {loading && (
          <Box textAlign="center" py={6}>
            <CircularProgress />
          </Box>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 4 }}>
            {error.message}
          </Alert>
        )}
        {displayedLocations.length === 0 && !loading && (
          <Alert severity="info" sx={{ mb: 4 }}>
            No locations found matching your criteria. Try adjusting your filters.
          </Alert>
        )}
        
        {/* Results Count and Stats */}
        {displayedLocations.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h5" fontWeight={700} color="primary.main">
              Search Results
            </Typography>
          </Box>
        )}

        {/* Location Cards Grid */}
        {displayedLocations.length > 0 && (
          <Box sx={{ mb: 6 }}>
            <Grid container spacing={3}>
              {displayedLocations.map((location: any) => (
                <Grid item xs={12} sm={6} lg={4} key={location.id}>
                  <Card 
                    elevation={0}
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      border: `1px solid ${theme.palette.divider}`,
                      borderRadius: 4,
                      overflow: 'hidden',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'pointer',
                      position: 'relative',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                        borderColor: theme.palette.primary.main,
                        '& .card-image': {
                          transform: 'scale(1.05)',
                        },
                        '& .card-overlay': {
                          opacity: 1,
                        }
                      }
                    }}
                    onClick={() => navigate(`/locations/${location.id}`)}
                  >
                    {/* Image Container */}
                    <Box sx={{ position: 'relative', overflow: 'hidden', height: 200 }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={getFallbackImage()}
                        alt={location.name}
                        className="card-image"
                        sx={{ 
                          objectFit: 'cover',
                          transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                        }}
                      />
                      {/* Overlay with quick info */}
                      <Box 
                        className="card-overlay"
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          background: `linear-gradient(135deg, ${theme.palette.primary.main}dd 0%, ${theme.palette.primary.main}bb 100%)`,
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                        }}
                      >
                        <Typography variant="h6" fontWeight={700}>
                          View Details
                        </Typography>
                      </Box>
                      
                      {/* Pitch Count Badge */}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          backgroundColor: theme.palette.secondary.main,
                          color: 'white',
                          px: 2,
                          py: 1,
                          borderRadius: 3,
                          fontWeight: 700,
                          fontSize: '1rem',
                          boxShadow: `0 4px 12px ${theme.palette.secondary.main}4d`,
                        }}
                      >
                        {location.footballPitches?.length || 0} pitches
                      </Box>

                      {/* Location Badge */}
                      {location.latitude && location.longitude && (
                        <Box
                          sx={{ 
                            position: 'absolute',
                            bottom: 12,
                            left: 12,
                            backgroundColor: 'rgba(0, 0, 0, 0.7)',
                            color: 'white',
                            px: 2,
                            py: 1,
                            borderRadius: 3,
                            fontSize: '0.85rem',
                            backdropFilter: 'blur(10px)',
                          }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <GpsFixed sx={{ fontSize: 14 }} />
                            Coordinates
                          </Box>
                        </Box>
                      )}
                    </Box>

                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      {/* Title and Location */}
                      <Box sx={{ mb: 2 }}>
                        <Typography 
                          variant="h6" 
                          fontWeight={700} 
                          color="text.primary" 
                          sx={{ 
                            mb: 1,
                            lineHeight: 1.2,
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {location.name}
                        </Typography>
                      </Box>

                      {/* Description */}
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary', 
                          mb: 2, 
                          lineHeight: 1.5,
                          display: '-webkit-box', 
                          WebkitLineClamp: 2, 
                          WebkitBoxOrient: 'vertical', 
                          overflow: 'hidden',
                          fontSize: '0.875rem'
                        }}
                      >
                        {location.description || 'A fantastic football location with multiple pitches and excellent facilities.'}
                      </Typography>

                      {/* Address and Location Info */}
                      <Box sx={{ mb: 2 }}>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: 'text.secondary', 
                            mb: 1,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 1,
                            fontSize: '0.875rem'
                          }}
                        >
                          <LocationOn sx={{ fontSize: 14, color: theme.palette.primary.main }} />
                          {location.address}
                        </Typography>
                        
                        {/* Distance and Coordinates */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap', mb: 1 }}>
                          {userLocation && location.latitude && location.longitude && (
                            <Chip
                              icon={<GpsFixed sx={{ fontSize: 14 }} />}
                              label={formatDistance(calculateDistance(
                                userLocation.lat, 
                                userLocation.lng, 
                                location.latitude, 
                                location.longitude
                              ))}
                              size="small"
                              sx={{ 
                                bgcolor: theme.palette.success.main,
                                color: 'white',
                                fontWeight: 600,
                                fontSize: '0.7rem'
                              }}
                            />
                          )}
                          
                          {location.latitude && location.longitude && (
                            <Tooltip title="Click to copy coordinates">
                              <Chip
                                icon={<Map sx={{ fontSize: 14 }} />}
                                label={`${location.latitude.toFixed(4)}, ${location.longitude.toFixed(4)}`}
                                size="small"
                                variant="outlined"
                                sx={{ 
                                  fontWeight: 500,
                                  fontSize: '0.7rem',
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
                          )}
                        </Box>

                        {/* Directions Button */}
                        <Button
                          variant="text"
                          size="small"
                          startIcon={<Directions />}
                          sx={{ 
                            p: 0,
                            minWidth: 'auto',
                            textTransform: 'none',
                            fontSize: '0.75rem',
                            color: theme.palette.primary.main,
                            '&:hover': {
                              bgcolor: 'transparent',
                              textDecoration: 'underline'
                            }
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            window.open(getDirectionsUrl(location), '_blank');
                          }}
                        >
                          Get Directions
                        </Button>
                      </Box>

                      {/* Pitch Types */}
                      {location.footballPitches && location.footballPitches.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" fontWeight={600} color="text.primary" mb={1} sx={{ fontSize: '0.875rem' }}>
                            Pitch Types:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                            {getPitchTypes(location.footballPitches).map((type: string) => (
                              <Chip
                                key={type}
                                label={type?.replace('_', ' ')}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            ))}
                            {location.footballPitches.length > 3 && (
                              <Chip
                                label={`+${location.footballPitches.length - 3} more`}
                                size="small"
                                variant="outlined"
                                sx={{ fontSize: '0.7rem' }}
                              />
                            )}
                          </Box>
                        </Box>
                      )}

                      {/* Average Price */}
                      {location.footballPitches && location.footballPitches.length > 0 && (
                        <Box sx={{ mb: 2 }}>
                          <Typography variant="body2" fontWeight={600} color="text.primary" mb={0.5} sx={{ fontSize: '0.875rem' }}>
                            Average Price:
                          </Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Euro sx={{ color: theme.palette.success.main, fontSize: 16 }} />
                            <Typography variant="h6" fontWeight={700} color="success.main" sx={{ fontSize: '1.1rem' }}>
                              £{getAveragePrice(location.footballPitches)}/hr
                            </Typography>
                          </Box>
                        </Box>
                      )}

                      {/* Features Grid */}
                      <Box sx={{ mb: 2 }}>
                        <Grid container spacing={0.5}>
                          {location.hasParking && (
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5 }}>
                                <LocalParking sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                  Parking
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          {location.hasShowers && (
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5 }}>
                                <Shower sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                  Showers
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          {location.hasChangingRooms && (
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5 }}>
                                <MeetingRoom sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                  Changing Rooms
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          {location.hasCafe && (
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5 }}>
                                <Restaurant sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                  Cafe
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          {location.hasEquipmentRental && (
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5 }}>
                                <SportsEsports sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                  Equipment Rental
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                          {location.phoneNumber && (
                            <Grid item xs={6}>
                              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, p: 0.5 }}>
                                <Phone sx={{ color: theme.palette.primary.main, fontSize: 16 }} />
                                <Typography variant="caption" sx={{ color: 'text.primary', fontWeight: 500 }}>
                                  Phone Available
                                </Typography>
                              </Box>
                            </Grid>
                          )}
                        </Grid>
                      </Box>
                    </CardContent>

                    {/* Action Buttons */}
                    <Box sx={{ p: 3, pt: 0 }}>
                      <Box sx={{ display: 'flex', gap: 1.5 }}>
                        <Button
                          variant="contained"
                          size="medium"
                          sx={{ 
                            flex: 1,
                            fontWeight: 600,
                            borderRadius: 2,
                            py: 1,
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            '&:hover': {
                              transform: 'translateY(-1px)',
                              boxShadow: `0 8px 16px ${theme.palette.primary.main}4d`,
                            }
                          }}
                          onClick={e => { e.stopPropagation(); navigate(`/locations/${location.id}`); }}
                        >
                          View Details
                        </Button>
                        <Button
                          variant="outlined"
                          size="medium"
                          sx={{ 
                            flex: 1,
                            fontWeight: 600,
                            borderRadius: 2,
                            py: 1,
                            textTransform: 'none',
                            fontSize: '0.875rem',
                            border: `1px solid ${theme.palette.primary.main}`,
                            '&:hover': {
                              transform: 'translateY(-1px)',
                              border: `1px solid ${theme.palette.primary.main}`,
                            },
                            '&:focus': {
                              outline: 'none',
                              border: `1px solid ${theme.palette.primary.main}`,
                            }
                          }}
                          onClick={e => { e.stopPropagation(); navigate(`/locations/${location.id}#pitches`); }}
                        >
                          View Pitches
                        </Button>
                      </Box>
                    </Box>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {/* Load More Button */}
        {hasMore && displayedLocations.length > 0 && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 6 }}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleLoadMore}
              disabled={loading}
              sx={{ 
                px: 6, 
                py: 2, 
                borderRadius: 3,
                fontSize: '1.1rem',
                fontWeight: 600,
                textTransform: 'none',
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 16px rgba(0, 0, 0, 0.1)',
                }
              }}
            >
              {loading ? (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <CircularProgress size={20} />
                  Loading...
                </Box>
              ) : (
                'Load More Locations'
              )}
            </Button>
          </Box>
        )}

        {/* No More Results */}
        {!hasMore && displayedLocations.length > 0 && (
          <Box sx={{ textAlign: 'center', mt: 6, py: 4 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              🎯 You've seen all available locations!
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Try adjusting your filters to find more matches.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default LocationList; 