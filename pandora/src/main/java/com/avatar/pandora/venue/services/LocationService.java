package com.avatar.pandora.venue.services;

import com.avatar.pandora.venue.api.LocationServiceApi;
import com.avatar.pandora.venue.models.filter.Filter;
import com.avatar.pandora.venue.models.location.*;
import com.avatar.pandora.venue.models.venue.VenueProperty;
import com.avatar.pandora.venue.models.venue.VenueSurfaceType;
import com.avatar.pandora.venue.models.venue.VenueType;
import com.avatar.pandora.venue.repositories.LocationRepository;
import com.avatar.pandora.venue.specifications.LocationSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumSet;
import java.util.Optional;
import java.util.stream.Collectors;

import static com.avatar.pandora.venue.specifications.LocationSpecification.*;

@Service
public class LocationService implements LocationServiceApi {

    private final LocationRepository locationRepository;

    private final LocationConverter locationConverter;

    public LocationService(LocationRepository locationRepository, LocationConverter locationConverter) {
        this.locationRepository = locationRepository;
        this.locationConverter = locationConverter;
    }

    public Page<LocationView> searchLocations(Integer count, Integer offset, Filter filter, String sort) {
        LocationSort locationSort = LocationSort.valueOf(Optional.ofNullable(sort).orElse(LocationSort.DISTANCE_ASC.name()));
        PageRequest pageRequest = PageRequest.of(count, offset, locationSort.getDirection(), locationSort.getField());

        var specification =
                LocationSpecification.nameContains(filter.getSearchTerm())
                        .and(LocationSpecification.inCities(filter.getCities()))
                        .and(pitchesPropertiesIn(filter.getProperties()))
                        .and(pitchesTypesIn(filter.getVenueTypes()))
                        .and(pitchesSurfaceTypesIn(filter.getVenueSurfaceTypes()))
                        .and(itHasLocationProperties(filter.getLocationAmenities()));

        return locationRepository.findBy(specification, q -> q.page(pageRequest))
                .map(locationConverter::convertToView);

    }

    public LocationView getById(Long id) {
        return locationConverter.convertToView(locationRepository.findLocationById(id));
    }

    @Transactional
    public LocationView save(LocationForm locationForm) {
        var location = locationConverter.convertToNewEntity(locationForm);
        return locationConverter.convertToView(locationRepository.save(location));
    }

    @Transactional
    public LocationView update(LocationForm locationForm) {
        var savedlocation = locationRepository.findLocationById(locationForm.getId());
        var location = locationConverter.convertToEntity(savedlocation, locationForm);
        return locationConverter.convertToView(locationRepository.save(location));
    }

    @Override
    public Long countLocations() {
        return locationRepository.count();
    }

    @Override
    public Long countCities() {
        return locationRepository.countDistinctCities();
    }

    public SearchFilter getSearchFilter() {
        return new SearchFilter(
                locationRepository.getDistinctCities(),
                EnumSet.allOf(LocationAmenity.class).stream().map(Enum::name).collect(Collectors.toSet()),
                EnumSet.allOf(VenueProperty.class).stream().map(Enum::name).collect(Collectors.toSet()),
                EnumSet.allOf(VenueSurfaceType.class).stream().map(Enum::name).collect(Collectors.toSet()),
                EnumSet.allOf(VenueType.class).stream().map(Enum::name).collect(Collectors.toSet())
        );
    }
}
