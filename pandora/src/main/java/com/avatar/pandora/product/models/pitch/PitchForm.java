package com.avatar.pandora.product.models.pitch;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of = "name")
public class PitchForm {

    @NotBlank
    private String name;
}
