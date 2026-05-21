package com.avatar.pandora.venue.models.venue;

import com.avatar.pandora.shared.BaseEntity;
import com.avatar.pandora.venue.models.location.Location;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
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
public class Venue extends BaseEntity {

    @NotBlank
    private String name;

    @ManyToOne
    private Location location;

    @NotNull
    private String description;

    @ElementCollection(targetClass = VenueProperty.class, fetch = FetchType.EAGER)
    @CollectionTable
    @Enumerated(EnumType.STRING)
    private Set<VenueProperty> properties = new HashSet<>();

    @Enumerated(EnumType.STRING)
    private VenueSurfaceType surfaceType;

    @Enumerated(EnumType.STRING)
    private VenueType type;
}
