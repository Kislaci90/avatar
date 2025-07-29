package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.address.Address;
import com.avatar.pandora.product.models.address.AddressForm;
import com.avatar.pandora.product.models.address.AddressView;
import org.springframework.stereotype.Service;

@Service
public class AddressConverter implements Converter<Address, AddressView, AddressForm> {
    @Override
    public AddressView convertToView(Address address) {
        return new AddressView(address.getCity(), address.getAddressLine(), address.getPostalCode());
    }

    @Override
    public Address convertToEntity(Address address, AddressForm addressForm) {
        address.setCity(addressForm.getCity());
        address.setAddressLine(addressForm.getAddressLine());
        address.setPostalCode(addressForm.getPostalCode());
        return address;
    }

    @Override
    public Address convertToNewEntity(AddressForm addressForm) {
        return convertToEntity(new Address(), addressForm);
    }
}
