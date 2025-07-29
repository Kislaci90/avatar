package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.pitch.Pitch;
import com.avatar.pandora.product.models.pitch.PitchForm;
import com.avatar.pandora.product.models.pitch.PitchView;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class PitchConverter implements Converter<Pitch, PitchView, PitchForm> {

    @Override
    public PitchView convertToView(Pitch pitch) {
        return new PitchView(pitch.getId(), pitch.getName());
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
