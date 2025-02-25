package com.avatar.pandora.product.models.pitch;

import com.avatar.pandora.product.models.BaseEntity;
import com.avatar.pandora.product.models.location.Location;
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
public class Pitch extends BaseEntity {

    @NotBlank
    private String name;

    @ManyToOne
    private Location location;
}
