package com.avatar.product.services;

import com.avatar.product.models.location.LocationForm;
import com.avatar.product.models.location.LocationView;
import com.avatar.product.models.location.Location;
import com.avatar.product.repositories.LocationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.graphql.data.pagination.ConnectionAdapter;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

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
