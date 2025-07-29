package com.avatar.pandora.product.models.point;

import jakarta.validation.constraints.NotNull;

public record PointForm(@NotNull Double x, @NotNull Double y) {
}
