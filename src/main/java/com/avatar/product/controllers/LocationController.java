package com.avatar.product.controllers;

import com.avatar.product.models.location.LocationForm;
import com.avatar.product.models.location.LocationView;
import com.avatar.product.services.LocationService;
import graphql.relay.Connection;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.ScrollPosition;
import org.springframework.data.domain.Window;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.graphql.data.query.ScrollSubrange;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/location")
public class LocationController {

    @Autowired
    private LocationService locationService;

    @PostMapping
    @ResponseStatus(value = HttpStatus.CREATED)
    public LocationView save(@Valid @RequestBody LocationForm locationForm) {
        return locationService.save(locationForm);
    }

    @QueryMapping
    public Page<LocationView> locations(@Argument(name = "count") Integer count, @Argument(name = "offset") Integer offset, @Argument(name = "name") String name) {
        return locationService.findBy(count, offset, name);
    }

    @QueryMapping
    public LocationView location(@Argument(name = "id") Long id) {
        return locationService.getById(id);
    }

}
