package com.avatar.pandora.product.models.location;

import org.springframework.data.domain.Sort;

public record SortQuery(String field, String direction) {

    public Sort.Direction getDirection() {
        return Sort.Direction.fromString(direction.toUpperCase());
    }

    public Sort getSort() {
        return Sort.by(getDirection(), field);
    }

}
