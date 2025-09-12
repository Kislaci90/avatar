package com.avatar.pandora.product.models.pitch;

import org.springframework.data.domain.Sort;

public record PitchSort(String direction) {

    public Sort.Direction getDirection() {
        return Sort.Direction.fromString(direction.toUpperCase());
    }

    public Sort getSort() {
        return Sort.by(getDirection(), "name");
    }
}
