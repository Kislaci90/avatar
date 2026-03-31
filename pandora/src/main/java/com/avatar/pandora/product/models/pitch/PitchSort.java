package com.avatar.pandora.product.models.pitch;

import lombok.Getter;
import org.springframework.data.domain.Sort;

public enum PitchSort {
    DISTANCE_DESC("name", Sort.Direction.DESC),
    DISTANCE_ASC("name", Sort.Direction.ASC);

    @Getter
    private final Sort.Direction direction;
    @Getter
    private final String field;

    PitchSort(String field, Sort.Direction direction) {
        this.direction = direction;
        this.field = field;
    }
}
