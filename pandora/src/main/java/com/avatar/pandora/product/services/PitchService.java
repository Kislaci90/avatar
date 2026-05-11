package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.filter.Filter;
import com.avatar.pandora.product.models.pitch.*;
import com.avatar.pandora.product.repositories.PitchRepository;
import com.avatar.pandora.product.specifications.PitchSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;


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

    public Page<PitchView> searchPitches(Integer count, Integer offset, Filter filter, String sort) {
        PitchSort pitchSort = PitchSort.valueOf(Optional.ofNullable(sort).orElse(PitchSort.DISTANCE_ASC.name()));
        PageRequest pageRequest = PageRequest.of(count, offset, pitchSort.getDirection(), pitchSort.getField());

        var specification =
                PitchSpecification
                        .nameContains(filter.getSearchTerm())
                        .and(PitchSpecification.surfaceTypeIn(filter.getPitchSurfaceTypes())
                        .and(PitchSpecification.propertiesIn(filter.getProperties()))
                        .and(PitchSpecification.typeIn(filter.getPitchTypes())));

        return pitchRepository.findBy(specification, q -> q.page(pageRequest))
                .map(pitchConverter::convertToView);
    }

    public PitchView getById(Long id) {
        return pitchConverter.convertToView(pitchRepository.getPitchById(id));
    }

    public Long countPitches() {
        return pitchRepository.count();
    }
}
