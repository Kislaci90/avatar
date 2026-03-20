package com.avatar.pandora.product.models.pitch;

import com.avatar.pandora.product.models.FilterMap;
import io.soabase.recordbuilder.core.RecordBuilder;

import java.util.Map;
import java.util.Set;

@RecordBuilder
public record PitchFilter(String searchTerm, Set<String> properties) implements FilterMap {

    @Override
    public Map<String, Object> getAsMap() {
        return Map.of("searchTerm", searchTerm, "properties", properties);
    }

}
