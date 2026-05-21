package com.avatar.pandora.venue.models.venue;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of = "name")
public class VenueForm {

    @NotBlank
    private String name;
}
