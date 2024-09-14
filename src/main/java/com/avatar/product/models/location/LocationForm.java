package com.avatar.product.models.location;

import com.avatar.product.models.field.FieldForm;
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
    @Valid
    private PointForm geom;

    @UniqueElements
    private List<FieldForm> fields;

}
