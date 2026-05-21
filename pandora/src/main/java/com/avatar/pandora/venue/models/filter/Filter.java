package com.avatar.pandora.venue.models.filter;

import com.avatar.pandora.venue.models.location.LocationAmenity;
import com.avatar.pandora.venue.models.venue.VenueProperty;
import com.avatar.pandora.venue.models.venue.VenueSurfaceType;
import com.avatar.pandora.venue.models.venue.VenueType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

@Getter
@Setter
@Builder
public class Filter implements FilterMap {
    private String searchTerm;
    @Builder.Default
    private Set<String> locationAmenities = new HashSet<>();
    @Builder.Default
    private Set<String> cities = new HashSet<>();
    @Builder.Default
    private Set<String> surfaceTypes = new HashSet<>();
    @Builder.Default
    private Set<String> venueTypes = new HashSet<>();
    @Builder.Default
    private Set<String> properties = new HashSet<>();

    @Override
    public Map<String, Object> getAsMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("searchTerm", searchTerm);
        map.put("locationAmenities", locationAmenities);
        map.put("cities", cities);
        map.put("surfaceTypes", surfaceTypes);
        map.put("venueTypes", venueTypes);
        map.put("properties", properties);
        return map;
    }

    public Set<VenueSurfaceType> getVenueSurfaceTypes() {
        return this.getSurfaceTypes().stream()
                .map(VenueSurfaceType::valueOf)
                .collect(Collectors.toSet());
    }

    public Set<VenueType> getVenueTypes() {
        return this.venueTypes.stream()
                .map(VenueType::valueOf)
                .collect(Collectors.toSet());
    }

    public Set<VenueProperty> getProperties() {
        return this.properties.stream()
                .map(VenueProperty::valueOf)
                .collect(Collectors.toSet());
    }

    public Set<LocationAmenity> getLocationAmenities() {
        return this.locationAmenities.stream()
                .map(LocationAmenity::valueOf)
                .collect(Collectors.toSet());
    }
}
