package com.avatar.pandora.product.models.location;

import java.util.Set;

public record SearchFilter(Set<String> cities,
                           Set<String> locationProperties,
                           Set<String> pitchProperties,
                           Set<String> surfaceTypes,
                           Set<String> pitchTypes) {
}
