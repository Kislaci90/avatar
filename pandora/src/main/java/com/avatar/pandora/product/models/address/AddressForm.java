package com.avatar.pandora.product.models.address;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AddressForm {

    @NotBlank
    private String city;
    @NotBlank
    private String addressLine;
    @NotBlank
    private String postalCode;

}
