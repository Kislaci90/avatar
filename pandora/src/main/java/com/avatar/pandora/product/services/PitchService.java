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

    private final PitchRepository pitchRepository;

    private final PitchConverter pitchConverter;

    public PitchService(PitchConverter pitchConverter, PitchRepository pitchRepository) {
        this.pitchConverter = pitchConverter;
        this.pitchRepository = pitchRepository;
    }

    public PitchView save(PitchForm pitchForm) {
        return pitchConverter.convertToView(pitchRepository.save(pitchConverter.convertToEntity(new Pitch(), pitchForm)));
    }
}
