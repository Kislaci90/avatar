package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.location.SearchFilter;
import com.avatar.pandora.product.services.LocationService;
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
