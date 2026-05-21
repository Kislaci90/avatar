package com.avatar.pandora.venue.services;

import com.avatar.pandora.venue.api.VenueServiceApi;
import com.avatar.pandora.venue.models.filter.Filter;
import com.avatar.pandora.venue.models.venue.Venue;
import com.avatar.pandora.venue.models.venue.VenueForm;
import com.avatar.pandora.venue.models.venue.VenueSort;
import com.avatar.pandora.venue.models.venue.VenueView;
import com.avatar.pandora.venue.repositories.VenueRepository;
import com.avatar.pandora.venue.specifications.VenueSpecification;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.util.Optional;


@Service
public class VenueService implements VenueServiceApi {
    private final VenueRepository venueRepository;
    private final VenueConverter venueConverter;

    public VenueService(VenueConverter venueConverter, VenueRepository venueRepository) {
        this.venueConverter = venueConverter;
        this.venueRepository = venueRepository;
    }

    public VenueView save(VenueForm venueForm) {
        return venueConverter.convertToView(venueRepository.save(venueConverter.convertToEntity(new Venue(), venueForm)));
    }

    public Page<VenueView> searchVenues(Integer count, Integer offset, Filter filter, String sort) {
        VenueSort venueSort = VenueSort.valueOf(Optional.ofNullable(sort).orElse(VenueSort.DISTANCE_ASC.name()));
        PageRequest pageRequest = PageRequest.of(count, offset, venueSort.getDirection(), venueSort.getField());

        var specification =
                VenueSpecification
                        .nameContains(filter.getSearchTerm())
                        .and(VenueSpecification.surfaceTypeIn(filter.getVenueSurfaceTypes())
                        .and(VenueSpecification.propertiesIn(filter.getProperties()))
                        .and(VenueSpecification.typeIn(filter.getVenueTypes())));

        return venueRepository.findBy(specification, q -> q.page(pageRequest))
                .map(venueConverter::convertToView);
    }

    public VenueView getById(Long id) {
        return venueConverter.convertToView(venueRepository.getVenueById(id));
    }

    @Override
    public Long countVenues() {
        return venueRepository.count();
    }
}
