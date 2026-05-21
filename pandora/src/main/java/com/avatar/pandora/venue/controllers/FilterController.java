package com.avatar.pandora.venue.controllers;

import com.avatar.pandora.venue.models.location.SearchFilter;
import com.avatar.pandora.venue.services.LocationService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/filter")
public class FilterController {

    private final LocationService locationService;

    public FilterController(LocationService locationService) {
        this.locationService = locationService;
    }

    @QueryMapping
    public SearchFilter getSearchFilters() {
        return locationService.getSearchFilter();
    }

}
