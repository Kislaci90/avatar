package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.pitch.Pitch;
import com.avatar.pandora.product.models.pitch.PitchForm;
import com.avatar.pandora.product.models.pitch.PitchView;
import com.avatar.pandora.product.repositories.PitchRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class PitchService {

    @Autowired
    private PitchRepository pitchRepository;

    @Autowired
    private PitchConverter pitchConverter;

    public PitchView save(PitchForm pitchForm) {
        return pitchConverter.convert(pitchRepository.save(pitchConverter.convert(new Pitch(), pitchForm)));
    }

    public Set<PitchView> saveAll(List<PitchForm> pitchForms) {
        List<Pitch> pitches = pitchForms.stream()
                .map(f -> pitchConverter.convert(new Pitch(), f))
                .collect(Collectors.toList());
        return pitchConverter.convert(pitchRepository.saveAll(pitches));
    }
}
