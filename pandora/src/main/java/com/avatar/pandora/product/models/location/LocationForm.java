package com.avatar.pandora.product.models.location;

import com.avatar.pandora.product.models.pitch.PitchForm;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.List;

@Data
public class LocationForm {

    @NotBlank
    private String name;

    @NotNull
    private Address address;

    @NotNull
    private Contact contact;

    @NotNull
    @Valid
    private PointForm geom;

    @UniqueElements
    private List<PitchForm> fields;

}
