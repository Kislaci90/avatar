package com.avatar.pandora.venue.models.point;

import jakarta.validation.constraints.NotNull;

public record PointForm(@NotNull Double x, @NotNull Double y) {
}
