package com.avatar.pandora.venue.models.location;

import com.avatar.pandora.shared.BaseEntity;
import com.avatar.pandora.venue.models.address.Address;
import com.avatar.pandora.venue.models.contact.Contact;
import com.avatar.pandora.venue.models.venue.Venue;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;
import org.locationtech.jts.geom.Point;

import java.util.ArrayList;
import java.util.HashSet;
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

    @NotNull
    private String description;

    private String website;

    @Embedded
    private Address address;

    @Embedded
    private Contact contact;

    @ElementCollection(targetClass = LocationAmenity.class, fetch = FetchType.EAGER)
    @CollectionTable
    @Enumerated(EnumType.STRING)
    private Set<LocationAmenity> amenities = new HashSet<>();

    @Column
    @NotNull
    private Point geom;

    @OneToMany(mappedBy = "location",
            cascade = CascadeType.ALL,
            orphanRemoval = true)
    private List<Venue> venues = new ArrayList<>();

    public void addVenue(Venue venue) {
        venues.add(venue);
        venue.setLocation(this);
    }

    public void removeVenue(Venue venue) {
        venues.remove(venue);
        venue.setLocation(null);
    }
}
