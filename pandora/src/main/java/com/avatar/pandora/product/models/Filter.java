package com.avatar.pandora.product.models;

import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
public class Filter implements FilterMap {
    String searchTerm;
    private Set<String> locationProperties = new HashSet<>();
    private Set<String> cities = new HashSet<>();
    private Set<String> pitchProperties = new HashSet<>();
    private Set<String> surfaceTypes = new HashSet<>();
    private Set<String> pitchTypes = new HashSet<>();
    private Set<String> properties = new HashSet<>();

    @Override
    public Map<String, Object> getAsMap() {
        Map<String, Object> map = new HashMap<>();
        if (searchTerm != null && !searchTerm.isBlank()) {
            map.put("searchTerm", searchTerm);
        }
        if (!locationProperties.isEmpty()) {
            map.put("locationProperties", locationProperties);
        }
        if (!cities.isEmpty()) {
            map.put("cities", cities);
        }
        if (!pitchProperties.isEmpty()) {
            map.put("pitchProperties", pitchProperties);
        }
        if (!surfaceTypes.isEmpty()) {
            map.put("surfaceTypes", surfaceTypes);
        }
        if (!pitchTypes.isEmpty()) {
            map.put("pitchTypes", pitchTypes);
        }
        if (!properties.isEmpty()) {
            map.put("properties", properties);
        }
        return map;
    }
}
