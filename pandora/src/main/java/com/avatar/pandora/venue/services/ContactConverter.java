package com.avatar.pandora.venue.services;

import com.avatar.pandora.shared.Converter;
import com.avatar.pandora.venue.models.contact.Contact;
import com.avatar.pandora.venue.models.contact.ContactForm;
import com.avatar.pandora.venue.models.contact.ContactView;
import org.springframework.stereotype.Service;

@Service
public class ContactConverter implements Converter<Contact, ContactView, ContactForm> {

    @Override
    public ContactView convertToView(Contact contact) {
        return new ContactView(contact.getContactName(), contact.getEmail(), contact.getPhoneNumber());
    }

    @Override
    public Contact convertToEntity(Contact contact, ContactForm contactForm) {
        contact.setContactName(contactForm.getContactName());
        contact.setEmail(contactForm.getEmail());
        contact.setPhoneNumber(contactForm.getPhoneNumber());
        return contact;
    }

    @Override
    public Contact convertToNewEntity(ContactForm contactForm) {
        Contact contact = new Contact();
        return convertToEntity(contact, contactForm);
    }
}
