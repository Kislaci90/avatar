package com.avatar.pandora.product.models.location;

import com.avatar.pandora.product.models.address.Address;
import com.avatar.pandora.product.models.contact.Contact;
import com.avatar.pandora.product.models.pitch.PitchView;
import com.avatar.pandora.product.models.point.PointView;
import io.soabase.recordbuilder.core.RecordBuilder;

import java.util.Set;

@RecordBuilder
public record LocationView(Long id, String name, Address address, Contact contact, PointView geom,
                           Set<PitchView> pitches,
                           Set<String> properties) {
}
