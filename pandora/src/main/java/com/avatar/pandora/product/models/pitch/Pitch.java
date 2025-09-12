package com.avatar.pandora.product.models.pitch;

import com.avatar.pandora.product.models.BaseEntity;
import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

import java.util.HashSet;
import java.util.Set;

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

    @ElementCollection(targetClass = PitchProperty.class, fetch = FetchType.EAGER)
    @CollectionTable
    @Enumerated(EnumType.STRING)
    private Set<PitchProperty> properties = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private PitchSurfaceType surfaceType;

    @Enumerated(EnumType.STRING)
    private PitchType type;
}
