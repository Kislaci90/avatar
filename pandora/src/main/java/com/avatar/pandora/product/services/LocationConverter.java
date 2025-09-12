package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.location.LazyLocationView;
import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationForm;
import com.avatar.pandora.product.models.location.LocationView;
import com.avatar.pandora.product.models.pitch.Pitch;
import org.springframework.stereotype.Service;

import java.util.stream.Collectors;

@Service
public class LocationConverter implements Converter<Location, LocationView, LocationForm> {

    private final PointConverter pointConverter;

    private final PitchConverter pitchConverter;

    private final AddressConverter addressConverter;

    private final ContactConverter contactConverter;

    public LocationConverter(PointConverter pointConverter, PitchConverter pitchConverter, AddressConverter addressConverter, ContactConverter contactConverter) {
        this.pointConverter = pointConverter;
        this.pitchConverter = pitchConverter;
        this.addressConverter = addressConverter;
        this.contactConverter = contactConverter;
    }

    public LocationView convertToView(Location location) {
        LazyLocationView lazyLocationView = new LazyLocationView(location.getId(), location.getName(), location.getDescription(), location.getWebsite(), location.getAddress(), location.getContact(), pointConverter.convertToView(location.getGeom()), location.getProperties().stream().map(Enum::name).collect(Collectors.toSet()));

        return new LocationView(lazyLocationView.id(), lazyLocationView.name(), lazyLocationView.description(), lazyLocationView.website(), lazyLocationView.address(), lazyLocationView.contact(), lazyLocationView.geom(), location.getPitches().stream().map(pitchConverter::convertToView).collect(Collectors.toSet()), lazyLocationView.properties());
    }

    public Location convertToEntity(Location location, LocationForm locationForm) {
        location.setName(locationForm.getName());
        location.setAddress(addressConverter.convertToEntity(location.getAddress(), locationForm.getAddressForm()));
        location.setContact(contactConverter.convertToEntity(location.getContact(), locationForm.getContactForm()));
        location.setGeom(pointConverter.convertToEntity(location.getGeom(), locationForm.getPointForm()));
        locationForm.getPitchForms().forEach(f -> location.addField(pitchConverter.convertToEntity(new Pitch(), f)));
        return location;
    }

    @Override
    public Location convertToNewEntity(LocationForm locationForm) {
        Location location = new Location();
        location.setName(locationForm.getName());
        location.setAddress(addressConverter.convertToNewEntity(locationForm.getAddressForm()));
        location.setContact(contactConverter.convertToNewEntity(locationForm.getContactForm()));
        location.setGeom(pointConverter.convertToNewEntity(locationForm.getPointForm()));
        locationForm.getPitchForms().forEach(f -> location.addField(pitchConverter.convertToEntity(new Pitch(), f)));
        return location;
    }
}
