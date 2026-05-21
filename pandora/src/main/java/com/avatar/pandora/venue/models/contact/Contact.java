package com.avatar.pandora.venue.models.contact;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Embeddable
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Contact {

    private String contactName;
    private String email;
    private String phoneNumber;

}
