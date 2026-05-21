package com.avatar.pandora.venue.models.location;

import com.avatar.pandora.venue.models.address.Address;
import com.avatar.pandora.venue.models.contact.Contact;
import com.avatar.pandora.venue.models.point.PointView;

import java.util.Set;

public record LazyLocationView(Long id, String name, String description, String website, Address address,
                               Contact contact, PointView geom,
                               Set<String> amenities) {
}
