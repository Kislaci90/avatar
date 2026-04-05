package com.avatar.pandora.product.models.pitch;

import java.util.List;

public record PitchInput(String name, String description, String pitchType, String surfaceType, List<String> properties, Long locationId) {
}
