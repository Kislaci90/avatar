package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationFilter;
import com.avatar.pandora.product.models.location.LocationForm;
import com.avatar.pandora.product.models.location.LocationView;
import com.avatar.pandora.product.repositories.LocationRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
public class LocationService {

    private final LocationRepository locationRepository;

    private final LocationConverter locationConverter;

    public LocationService(LocationRepository locationRepository, LocationConverter locationConverter) {
        this.locationRepository = locationRepository;
        this.locationConverter = locationConverter;
    }

    public Page<LocationView> findBy(Integer count, Integer offset, LocationFilter filter) {
        return locationRepository.findByName(PageRequest.of(count, offset), filter.searchTerm()).map(locationConverter::convertToView);
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

}
