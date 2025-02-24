package com.avatar.product.models.field;

import com.avatar.product.models.BaseEntity;
import com.avatar.product.models.location.Location;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
@EqualsAndHashCode(callSuper = false)
public class Field extends BaseEntity {

    @NotBlank
    private String name;

    @ManyToOne
    private Location location;
}
