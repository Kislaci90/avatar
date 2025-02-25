package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.pitch.Pitch;
import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationForm;
import com.avatar.pandora.product.models.location.LocationView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class LocationConverter implements Converter<Location, LocationView, LocationForm> {

    @Autowired
    private PointConverter pointConverter;

    @Autowired
    private PitchConverter pitchConverter;

    public LocationView convert(Location location) {
        return new LocationView(location.getId(), location.getName(), location.getAddress(),
                location.getContact(),
                pointConverter.convert(location.getGeom()),
                pitchConverter.convert(location.getPitches()),
                location.getProperties().stream().map(Enum::name).collect(Collectors.toSet()));
    }

    public Location convert(Location location, LocationForm locationForm) {
        location.setName(locationForm.getName());
        location.setAddress(locationForm.getAddress());
        location.setContact(locationForm.getContact());
        location.setGeom(pointConverter.convert(location.getGeom(), locationForm.getGeom()));
        locationForm.getFields().forEach(f -> location.addField(pitchConverter.convert(new Pitch(), f)));
        return location;
    }
}
