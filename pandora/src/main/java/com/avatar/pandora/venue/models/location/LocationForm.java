package com.avatar.pandora.venue.models.location;

import com.avatar.pandora.venue.models.address.AddressForm;
import com.avatar.pandora.venue.models.contact.ContactForm;
import com.avatar.pandora.venue.models.venue.VenueForm;
import com.avatar.pandora.venue.models.point.PointForm;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import org.hibernate.validator.constraints.UniqueElements;

import java.util.Set;

@Data
public class LocationForm {

    private Long id;

    @NotBlank
    private String name;

    @NotNull
    @Valid
    private AddressForm addressForm;

    @NotNull
    @Valid
    private ContactForm contactForm;

    @NotNull
    @Valid
    private PointForm pointForm;

    @UniqueElements
    @Size(min = 1)
    private Set<VenueForm> venueForms;

}
