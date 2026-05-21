package com.avatar.pandora.venue.controllers;

import com.avatar.pandora.venue.models.filter.Filter;
import com.avatar.pandora.venue.models.venue.VenueView;
import com.avatar.pandora.venue.services.VenueService;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pitches")
public class VenueController {

    private final VenueService venueService;

    public VenueController(VenueService venueService) {
        this.venueService = venueService;
    }

    @QueryMapping
    public Page<VenueView> searchVenues(@Argument(name = "count") Integer count,
                                        @Argument(name = "offset") Integer offset,
                                        @Argument(name = "filter") Filter filter,
                                        @Argument(name = "sort") String sort) {
        return venueService.searchVenues(count, offset, filter, sort);
    }

    @QueryMapping
    public VenueView getVenue(@Argument(name = "id") Long id) {
        return venueService.getById(id);
    }

}
