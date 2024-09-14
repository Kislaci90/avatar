package com.avatar.product.models.location;

import jakarta.validation.constraints.NotNull;

public record PointForm(@NotNull Double x, @NotNull Double y) {
}
