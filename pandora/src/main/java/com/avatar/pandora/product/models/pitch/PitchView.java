package com.avatar.pandora.product.models.pitch;

import com.avatar.pandora.product.models.location.LazyLocationView;

import java.util.Set;

public record PitchView(Long id, String name, String description, PitchType pitchType, PitchSurfaceType surfaceType, Set<PitchProperty> properties, LazyLocationView location) {
}
