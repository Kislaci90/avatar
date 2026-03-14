package com.avatar.pandora.product.models.location;

import com.avatar.pandora.product.models.Filter;
import io.soabase.recordbuilder.core.RecordBuilder;

import java.util.Map;
import java.util.Set;

@RecordBuilder
public record LocationFilter(String searchTerm, Set<String> locationProperties, Set<String> cities) implements Filter {

    @Override
    public Map<String, Object> getAsMap() {
        return Map.of("searchTerm", searchTerm, "cities", cities, "locationProperties", locationProperties);
    }

}
