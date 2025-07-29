package com.avatar.pandora.product.models.contact;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ContactForm {
    private String contactName;
    private String email;
    private String phoneNumber;
}
