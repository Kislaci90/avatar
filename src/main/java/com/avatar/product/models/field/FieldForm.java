package com.avatar.product.models.field;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(of = "name")
public class FieldForm {

    @NotBlank
    private String name;
}
