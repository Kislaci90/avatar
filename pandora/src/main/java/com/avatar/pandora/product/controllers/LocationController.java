package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.location.LocationFilter;
import com.avatar.pandora.product.models.location.LocationForm;
import com.avatar.pandora.product.models.location.LocationView;
import com.avatar.pandora.product.services.LocationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/location")
public class LocationController {

    private final LocationService locationService;

    @Autowired
    public LocationController(LocationService locationService) {
        this.locationService = locationService;
    }

    @PostMapping
    @ResponseStatus(value = HttpStatus.OK)
    public LocationView save(@Valid @RequestBody LocationForm locationForm) {
        return locationService.save(locationForm);
    }

    @PutMapping
    @ResponseStatus(value = HttpStatus.OK)
    public LocationView update(@Valid @RequestBody LocationForm locationForm) {
        return locationService.update(locationForm);
    }

    @QueryMapping
    public Page<LocationView> searchLocations(@Argument(name = "count") Integer count, @Argument(name = "offset") Integer offset, @Argument(name = "filter") LocationFilter filter, @Argument(name = "sort") String sort) {
        return locationService.searchLocations(count, offset, filter, sort);
    }

    @QueryMapping
    public LocationView getLocation(@Argument(name = "id") Long id) {
        return locationService.getById(id);
    }

}
