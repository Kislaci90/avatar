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
import java.util.List;

@Entity
@Table
@Getter
@Setter
public class Location extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column
    private Long id;

    @Column(unique = true)
    @NotBlank
    private String name;

    @Embedded
    private Address address;

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
