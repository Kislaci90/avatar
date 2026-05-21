package com.avatar.pandora.venue.services;

import com.avatar.pandora.shared.Converter;
import com.avatar.pandora.venue.models.venue.Venue;
import com.avatar.pandora.venue.models.venue.VenueForm;
import com.avatar.pandora.venue.models.venue.VenueView;
import org.springframework.stereotype.Service;

@Service
public class VenueConverter implements Converter<Venue, VenueView, VenueForm> {

    private final LazyLocationConverter lazyLocationConverter;

    public VenueConverter(LazyLocationConverter lazyLocationConverter) {
        this.lazyLocationConverter = lazyLocationConverter;
    }

    @Override
    public VenueView convertToView(Venue venue) {
        return new VenueView(venue.getId(), venue.getName(), venue.getDescription(), venue.getType(), venue.getSurfaceType(), venue.getProperties(), lazyLocationConverter.convertToView(venue.getLocation()));
    }

    @Override
    public Venue convertToEntity(Venue venue, VenueForm venueForm) {
        venue.setName(venueForm.getName());
        return venue;
    }

    @Override
    public Venue convertToNewEntity(VenueForm venueForm) {
        Venue venue = new Venue();
        return convertToEntity(venue, venueForm);
    }
}
