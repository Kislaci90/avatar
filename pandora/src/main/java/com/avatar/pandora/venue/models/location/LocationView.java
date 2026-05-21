package com.avatar.pandora.venue.models.location;

import com.avatar.pandora.venue.models.address.Address;
import com.avatar.pandora.venue.models.contact.Contact;
import com.avatar.pandora.venue.models.venue.VenueView;
import com.avatar.pandora.venue.models.point.PointView;
import io.soabase.recordbuilder.core.RecordBuilder;

import java.util.Set;

@RecordBuilder
public record LocationView(Long id, String name, String description, String website, Address address, Contact contact, PointView geom,
                           Set<VenueView> venues,
                           Set<String> amenities) {
}
