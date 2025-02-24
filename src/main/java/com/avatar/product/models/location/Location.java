package com.avatar.product.models.location;

import com.avatar.product.models.BaseEntity;
import com.avatar.product.models.field.Field;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

import java.util.ArrayList;
import java.util.Collection;
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
    private List<Field> fields = new ArrayList<>();

    public void addField(Field field) {
        fields.add(field);
        field.setLocation(this);
    }

    public void removeField(Field field) {
        fields.remove(field);
        field.setLocation(null);
    }
}
