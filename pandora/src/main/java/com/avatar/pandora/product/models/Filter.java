package com.avatar.pandora.product.models;

import com.avatar.pandora.product.validation.ValidFilter;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@Builder
@ValidFilter
public class Filter implements FilterMap {
    private String searchTerm;
    private Set<String> locationProperties;
    private Set<String> cities;
    private Set<String> surfaceTypes;
    private Set<String> pitchTypes;
    private Set<String> properties;

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
