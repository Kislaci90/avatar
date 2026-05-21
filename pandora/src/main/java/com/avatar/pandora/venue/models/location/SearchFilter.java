package com.avatar.pandora.venue.models.location;

import java.util.List;
import java.util.Set;

public record SearchFilter(List<String> cities,
                           Set<String> locationAmenities,
                           Set<String> venueProperties,
                           Set<String> surfaceTypes,
                           Set<String> venueTypes) {
}
