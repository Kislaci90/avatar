package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.Filter;
import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.pitch.*;
import com.avatar.pandora.product.repositories.LocationRepository;
import com.avatar.pandora.product.repositories.PitchRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;


@Service
public class PitchService {

    private final PitchRepository pitchRepository;

    private final PitchConverter pitchConverter;

    private final LocationRepository locationRepository;

    public PitchService(PitchConverter pitchConverter, PitchRepository pitchRepository, LocationRepository locationRepository) {
        this.pitchConverter = pitchConverter;
        this.pitchRepository = pitchRepository;
        this.locationRepository = locationRepository;
    }

    public PitchView save(PitchForm pitchForm) {
        return pitchConverter.convertToView(pitchRepository.save(pitchConverter.convertToEntity(new Pitch(), pitchForm)));
    }

    @Transactional
    public PitchView create(PitchInput pitchInput) {
        Location location = locationRepository.findById(pitchInput.locationId())
                .orElseThrow(() -> new EntityNotFoundException("Location not found: " + pitchInput.locationId()));
        Pitch pitch = pitchConverter.convertFromInput(new Pitch(), pitchInput, location);
        return pitchConverter.convertToView(pitchRepository.save(pitch));
    }

    @Transactional
    public PitchView update(Long id, PitchInput pitchInput) {
        Pitch pitch = pitchRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Pitch not found: " + id));
        Location location = locationRepository.findById(pitchInput.locationId())
                .orElseThrow(() -> new EntityNotFoundException("Location not found: " + pitchInput.locationId()));
        pitchConverter.convertFromInput(pitch, pitchInput, location);
        return pitchConverter.convertToView(pitchRepository.save(pitch));
    }

    @Transactional
    public Boolean delete(Long id) {
        if (!pitchRepository.existsById(id)) {
            throw new EntityNotFoundException("Pitch not found: " + id);
        }
        pitchRepository.deleteById(id);
        return true;
    }

    public Page<PitchView> searchPitches(Integer count, Integer offset, Filter filter, String sort) {
        PitchSort pitchSort = PitchSort.valueOf(Optional.ofNullable(sort).orElse(PitchSort.DISTANCE_ASC.name()));
        PageRequest pageable = PageRequest.of(count, offset, pitchSort.getDirection(), pitchSort.getField());
        Set<PitchProperty> properties = filter.getProperties().stream().map(PitchProperty::valueOf).collect(Collectors.toSet());
        return pitchRepository.searchByPitchFiler(pageable,
                filter.getSearchTerm(),
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
