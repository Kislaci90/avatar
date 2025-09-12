package com.avatar.pandora.product.models.location;

import com.avatar.pandora.product.models.address.Address;
import com.avatar.pandora.product.models.contact.Contact;
import com.avatar.pandora.product.models.point.PointView;

import java.util.Set;

public record LazyLocationView(Long id, String name, String description, String website, Address address,
                               Contact contact, PointView geom,
                               Set<String> properties) {
}
