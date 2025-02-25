package com.avatar.pandora.product.models.location;

import com.avatar.pandora.product.models.pitch.PitchView;

import java.util.Set;

public record LocationView(Long id, String name, Address address, Contact contact, PointView geom,
                           Set<PitchView> fields,
                           Set<String> properties) {
}
