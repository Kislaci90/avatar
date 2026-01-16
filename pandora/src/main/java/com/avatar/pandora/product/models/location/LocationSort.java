package com.avatar.pandora.product.models.location;

import lombok.Getter;
import org.springframework.data.domain.Sort;

public enum LocationSort {
    DISTANCE_DESC("name", Sort.Direction.DESC),
    DISTANCE_ASC("name", Sort.Direction.ASC);

    @Getter
    private final Sort.Direction direction;
    @Getter
    private final String field;

    LocationSort(String field, Sort.Direction direction) {
        this.direction = direction;
        this.field = field;
    }
}
