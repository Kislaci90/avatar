package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.pitch.Pitch;
import com.avatar.pandora.product.models.pitch.PitchForm;
import com.avatar.pandora.product.models.pitch.PitchView;
import org.springframework.stereotype.Service;

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
}
