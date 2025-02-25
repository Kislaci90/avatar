package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationForm;
import com.avatar.pandora.product.models.location.LocationView;
import com.avatar.pandora.product.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class LocationService {

    @Autowired
    private LocationRepository locationRepository;

    @Autowired
    private LocationConverter locationConverter;

    public Page<LocationView> getAll(Integer count, Integer offset) {
        return locationRepository.findAll(PageRequest.of(count,offset)).map(locationConverter::convert);

    }

    public Page<LocationView> findBy(Integer count, Integer offset, String name) {
        return locationRepository.findByName(PageRequest.of(count, offset), name).map(locationConverter::convert);

    }

    public LocationView getById(Long id) {
        return locationConverter.convert(locationRepository.findLocationById(id));
    }

    @Transactional
    public LocationView save(LocationForm locationForm) {
        var location = locationConverter.convert(new Location(), locationForm);
        return locationConverter.convert(locationRepository.save(location));
    }

}
