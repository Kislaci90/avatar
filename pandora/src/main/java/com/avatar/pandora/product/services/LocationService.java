package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.location.*;
import com.avatar.pandora.product.repositories.LocationRepository;
import jakarta.servlet.Filter;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    public Page<LocationView> findBy(Integer count, Integer offset, LocationFilter filter, String sort) {
        LocationSort locationSort = LocationSort.valueOf(Optional.ofNullable(sort).orElse(LocationSort.DISTANCE_ASC.name()));
        PageRequest pageRequest = PageRequest.of(count, offset, locationSort.getDirection(), locationSort.getField());

        return locationRepository.searchByLocationFiler(pageRequest,
                filter.searchTerm(),
                filter.cities(),
                filter.cities().isEmpty(),
                filter.locationProperties().stream().map(LocationProperty::valueOf).collect(Collectors.toSet()),
                filter.locationProperties().isEmpty(),
                filter.locationProperties().size()).map(locationConverter::convertToView);
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
}
