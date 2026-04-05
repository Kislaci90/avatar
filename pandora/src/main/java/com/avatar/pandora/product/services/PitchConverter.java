package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.pitch.*;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.stream.Collectors;

@Service
public class PitchConverter implements Converter<Pitch, PitchView, PitchForm> {

    private final LazyLocationConverter lazyLocationConverter;

    public PitchConverter(LazyLocationConverter lazyLocationConverter) {
        this.lazyLocationConverter = lazyLocationConverter;
    }

    @Override
    public PitchView convertToView(Pitch pitch) {
        return new PitchView(pitch.getId(), pitch.getName(), pitch.getDescription(), pitch.getType(), pitch.getSurfaceType(), pitch.getProperties(), lazyLocationConverter.convertToView(pitch.getLocation()));
    }

    @Override
    public Pitch convertToEntity(Pitch pitch, PitchForm pitchForm) {
        pitch.setName(pitchForm.getName());
        return pitch;
    }

    @Override
    public Pitch convertToNewEntity(PitchForm pitchForm) {
        Pitch pitch = new Pitch();
        return convertToEntity(pitch, pitchForm);
    }

    public Pitch convertFromInput(Pitch pitch, PitchInput input, Location location) {
        pitch.setName(input.name());
        pitch.setDescription(input.description());
        pitch.setType(PitchType.valueOf(input.pitchType()));
        pitch.setSurfaceType(PitchSurfaceType.valueOf(input.surfaceType()));
        pitch.setProperties(input.properties() != null
                ? input.properties().stream().map(PitchProperty::valueOf).collect(Collectors.toSet())
                : new HashSet<>());
        pitch.setLocation(location);
        return pitch;
    }
}
