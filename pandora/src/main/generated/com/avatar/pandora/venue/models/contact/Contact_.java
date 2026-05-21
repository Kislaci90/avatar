package com.avatar.pandora.venue.models.contact;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EmbeddableType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

/**
 * Static metamodel for {@link com.avatar.pandora.venue.models.contact.Contact}
 **/
@StaticMetamodel(Contact.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Contact_ {

	
	/**
	 * @see #contactName
	 **/
	public static final String CONTACT_NAME = "contactName";
	
	/**
	 * @see #email
	 **/
	public static final String EMAIL = "email";
	
	/**
	 * @see #phoneNumber
	 **/
	public static final String PHONE_NUMBER = "phoneNumber";

	
	/**
	 * Static metamodel type for {@link com.avatar.pandora.venue.models.contact.Contact}
	 **/
	public static volatile EmbeddableType<Contact> class_;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.venue.models.contact.Contact#contactName}
	 **/
	public static volatile SingularAttribute<Contact, String> contactName;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.venue.models.contact.Contact#email}
	 **/
	public static volatile SingularAttribute<Contact, String> email;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.venue.models.contact.Contact#phoneNumber}
	 **/
	public static volatile SingularAttribute<Contact, String> phoneNumber;

}

