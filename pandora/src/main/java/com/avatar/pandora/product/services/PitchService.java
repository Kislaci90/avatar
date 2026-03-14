package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.pitch.*;
import com.avatar.pandora.product.repositories.PitchRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

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

    public Page<PitchView> searchPitches(Integer count, Integer offset, PitchFilter filter, PitchSort sort) {
        PageRequest pageable = PageRequest.of(count, offset, sort.getSort());
        Set<PitchProperty> properties = filter.properties().stream().map(PitchProperty::valueOf).collect(Collectors.toSet());
        return pitchRepository.searchByPitchFiler(pageable,
                filter.searchTerm(),
                properties,
                properties.isEmpty(),
                properties.size()).map(pitchConverter::convertToView);
    }

    public PitchView getById(Long id) {
        return pitchConverter.convertToView(pitchRepository.getPitchById(id));
    }

    public Long countPitches() {
        return pitchRepository.count();
    }
}
