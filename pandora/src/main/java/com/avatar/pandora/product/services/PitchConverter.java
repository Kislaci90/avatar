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
    public PitchView convert(Pitch pitch) {
        return new PitchView(pitch.getId(), pitch.getName());
    }

    @Override
    public Pitch convert(Pitch pitch, PitchForm pitchForm) {
        pitch.setName(pitchForm.getName());
        return pitch;
    }

    public Set<PitchView> convert(List<Pitch> pitches) {
        return pitches.stream().map(this::convert).collect(Collectors.toSet());
    }
}
