package com.avatar.pandora.product.models.location;

import com.avatar.pandora.product.models.BaseEntity;
import com.avatar.pandora.product.models.pitch.Pitch;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table
@Getter
@Setter
public class Location extends BaseEntity {

    @Column(unique = true)
    @NotBlank
    private String name;

    @Embedded
    private Address address;

    @Embedded
    private Contact contact;

    @ElementCollection(targetClass = LocationProperty.class)
    @CollectionTable
    @Enumerated(EnumType.STRING)
    private Set<LocationProperty> properties;

    @Column
    @NotNull
    private Point geom;

    @OneToMany(mappedBy = "location",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Pitch> pitches = new ArrayList<>();

    public void addField(Pitch pitch) {
        pitches.add(pitch);
        pitch.setLocation(this);
    }

    public void removeField(Pitch pitch) {
        pitches.remove(pitch);
        pitch.setLocation(null);
    }
}
