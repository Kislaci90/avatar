package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.Filter;
import com.avatar.pandora.product.models.location.*;
import com.avatar.pandora.product.models.pitch.PitchProperty;
import com.avatar.pandora.product.models.pitch.PitchSurfaceType;
import com.avatar.pandora.product.models.pitch.PitchType;
import com.avatar.pandora.product.repositories.LocationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.EnumSet;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    private final LocationConverter locationConverter;

    public LocationService(LocationRepository locationRepository, LocationConverter locationConverter) {
        this.locationRepository = locationRepository;
        this.locationConverter = locationConverter;
    }

    public Page<LocationView> searchLocations(Integer count, Integer offset, Filter filter, String sort) {
        LocationSort locationSort = LocationSort.valueOf(Optional.ofNullable(sort).orElse(LocationSort.DISTANCE_ASC.name()));
        PageRequest pageRequest = PageRequest.of(count, offset, locationSort.getDirection(), locationSort.getField());

        return locationRepository.searchByLocationFilter(pageRequest,
                Optional.of(filter.getSearchTerm()).orElse(""),
                filter.getCities(),
                filter.getCities().isEmpty(),
                filter.getLocationProperties().stream().map(LocationProperty::valueOf).collect(Collectors.toSet()),
                filter.getLocationProperties().isEmpty(),
                filter.getLocationProperties().size()).map(locationConverter::convertToView);
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

    public Long countLocations() {
        return locationRepository.count();
    }

    public Long countCities() {
        return locationRepository.countDistinctCities();
    }

    public SearchFilter getSearchFilter() {
        return new SearchFilter(
                locationRepository.getDistinctCities(),
                EnumSet.allOf(LocationProperty.class).stream().map(Enum::name).collect(Collectors.toSet()),
                EnumSet.allOf(PitchProperty.class).stream().map(Enum::name).collect(Collectors.toSet()),
                EnumSet.allOf(PitchSurfaceType.class).stream().map(Enum::name).collect(Collectors.toSet()),
                EnumSet.allOf(PitchType.class).stream().map(Enum::name).collect(Collectors.toSet())
                );
    }

    @Transactional
    public Boolean delete(Long id) {
        if (!locationRepository.existsById(id)) {
            throw new EntityNotFoundException("Location not found: " + id);
        }
        locationRepository.deleteById(id);
        return true;
    }
}
