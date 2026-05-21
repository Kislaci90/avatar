package com.avatar.pandora.venue.services;

import com.avatar.pandora.venue.models.location.LazyLocationView;
import com.avatar.pandora.venue.models.location.Location;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class LazyLocationConverter {

    private final PointConverter pointConverter;

    public LazyLocationConverter(PointConverter pointConverter) {
        this.pointConverter = pointConverter;
    }

    public LazyLocationView convertToView(Location location) {
        return new LazyLocationView(location.getId(),
                location.getName(),
                location.getDescription(),
                location.getWebsite(),
                location.getAddress(),
                location.getContact(),
                pointConverter.convertToView(location.getGeom()),
                location.getAmenities().stream().map(Enum::name).collect(Collectors.toSet()));
    }
}
