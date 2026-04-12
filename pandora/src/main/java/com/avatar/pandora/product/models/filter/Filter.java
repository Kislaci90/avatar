package com.avatar.pandora.product.models.filter;

import com.avatar.pandora.product.models.location.LocationProperty;
import com.avatar.pandora.product.models.pitch.PitchProperty;
import com.avatar.pandora.product.models.pitch.PitchSurfaceType;
import com.avatar.pandora.product.models.pitch.PitchType;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.stream.Collectors;

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

    public Set<PitchSurfaceType> getPitchSurfaceTypes() {
        return this.getSurfaceTypes().stream()
                .map(PitchSurfaceType::valueOf)
                .collect(Collectors.toSet());
    }

    public Set<PitchType> getPitchTypes() {
        return this.pitchTypes.stream()
                .map(PitchType::valueOf)
                .collect(Collectors.toSet());
    }

    public Set<PitchProperty> getProperties() {
        return this.properties.stream()
                .map(PitchProperty::valueOf)
                .collect(Collectors.toSet());
    }

    public Set<LocationProperty> getLocationProperties() {
        return this.locationProperties.stream()
                .map(LocationProperty::valueOf)
                .collect(Collectors.toSet());
    }
}
