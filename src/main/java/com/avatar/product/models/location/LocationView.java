package com.avatar.product.models.location;

import com.avatar.product.models.field.FieldView;

import java.util.Set;

public record LocationView(Long id, String name, Address address, Contact contact, PointView geom,
                           Set<FieldView> fields,
                           Set<String> properties) {
}
