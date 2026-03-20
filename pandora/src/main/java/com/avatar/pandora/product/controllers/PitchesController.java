package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.Filter;
import com.avatar.pandora.product.models.pitch.PitchView;
import com.avatar.pandora.product.services.PitchService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/pitches")
public class PitchesController {

    private final PitchService pitchService;

    public PitchesController(PitchService pitchService) {
        this.pitchService = pitchService;
    }

    @QueryMapping
    public Page<PitchView> searchPitches(@Argument(name = "count") Integer count,
                                         @Argument(name = "offset") Integer offset,
                                         @Valid @Argument(name = "filter") Filter filter,
                                         @Argument(name = "sort") String sort) {
        return pitchService.searchPitches(count, offset, filter, sort);
    }

    @QueryMapping
    public PitchView getPitch(@Argument(name = "id") Long id) {
        return pitchService.getById(id);
    }

}
