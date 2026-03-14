package com.avatar.pandora.product.models.pitch;

import io.soabase.recordbuilder.core.RecordBuilder;

import java.util.Map;
import java.util.Set;

@RecordBuilder
public record PitchFilter(String searchTerm, Set<PitchProperty> properties) {

    public Map<String, Object> getAsMap() {
        return Map.of("searchTerm", searchTerm, "properties", properties);
    }

}
