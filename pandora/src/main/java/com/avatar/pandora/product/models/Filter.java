package com.avatar.pandora.product.models;

import lombok.Getter;
import lombok.Setter;

import java.util.Map;
import java.util.Set;

@Getter
@Setter
public class Filter implements FilterMap {
    String searchTerm;
    Set<String> locationProperties;
    Set<String> cities;
    Set<String> pitchProperties;
    Set<String> surfaceTypes;
    Set<String> pitchTypes;
    Set<String> properties;

    @Override
    public Map<String, Object> getAsMap() {
        return Map.of();
    }
}
