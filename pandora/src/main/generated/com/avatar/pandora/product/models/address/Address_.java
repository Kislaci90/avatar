package com.avatar.pandora.product.models.address;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EmbeddableType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

/**
 * Static metamodel for {@link com.avatar.pandora.product.models.address.Address}
 **/
@StaticMetamodel(Address.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Address_ {

	
	/**
	 * @see #city
	 **/
	public static final String CITY = "city";
	
	/**
	 * @see #addressLine
	 **/
	public static final String ADDRESS_LINE = "addressLine";
	
	/**
	 * @see #postalCode
	 **/
	public static final String POSTAL_CODE = "postalCode";

	
	/**
	 * Static metamodel type for {@link com.avatar.pandora.product.models.address.Address}
	 **/
	public static volatile EmbeddableType<Address> class_;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.address.Address#city}
	 **/
	public static volatile SingularAttribute<Address, String> city;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.address.Address#addressLine}
	 **/
	public static volatile SingularAttribute<Address, String> addressLine;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.address.Address#postalCode}
	 **/
	public static volatile SingularAttribute<Address, String> postalCode;

}

