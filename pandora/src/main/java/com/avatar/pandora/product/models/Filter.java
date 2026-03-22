package com.avatar.pandora.product.models;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

@Getter
@Setter
@Builder
public class Filter implements FilterMap {
    private String searchTerm;
    @Builder.Default
    private Set<String> locationProperties = new HashSet<>();
    @Builder.Default
    private Set<String> cities = new HashSet<>();
    @Builder.Default
    private Set<String> surfaceTypes = new HashSet<>();
    @Builder.Default
    private Set<String> pitchTypes = new HashSet<>();
    @Builder.Default
    private Set<String> properties = new HashSet<>();

    @Override
    public Map<String, Object> getAsMap() {
        Map<String, Object> map = new HashMap<>();
        map.put("searchTerm", searchTerm);
        map.put("locationProperties", locationProperties);
        map.put("cities", cities);
        map.put("surfaceTypes", surfaceTypes);
        map.put("pitchTypes", pitchTypes);
        map.put("properties", properties);
        return map;
    }
}
