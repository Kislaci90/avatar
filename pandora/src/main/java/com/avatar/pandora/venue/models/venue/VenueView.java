package com.avatar.pandora.venue.models.venue;

import com.avatar.pandora.venue.models.location.LazyLocationView;

import java.util.Set;

public record VenueView(Long id, String name, String description, VenueType venueType, VenueSurfaceType surfaceType, Set<VenueProperty> properties, LazyLocationView location) {
}
