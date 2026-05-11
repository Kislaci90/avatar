package com.avatar.pandora.product.models.location;

import com.avatar.pandora.product.models.BaseEntity_;
import com.avatar.pandora.product.models.address.Address;
import com.avatar.pandora.product.models.contact.Contact;
import com.avatar.pandora.product.models.pitch.Pitch;
import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.ListAttribute;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import org.locationtech.jts.geom.Point;

/**
 * Static metamodel for {@link com.avatar.pandora.product.models.location.Location}
 **/
@StaticMetamodel(Location.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Location_ extends BaseEntity_ {

	
	/**
	 * @see #name
	 **/
	public static final String NAME = "name";
	
	/**
	 * @see #description
	 **/
	public static final String DESCRIPTION = "description";
	
	/**
	 * @see #website
	 **/
	public static final String WEBSITE = "website";
	
	/**
	 * @see #address
	 **/
	public static final String ADDRESS = "address";
	
	/**
	 * @see #contact
	 **/
	public static final String CONTACT = "contact";
	
	/**
	 * @see #properties
	 **/
	public static final String PROPERTIES = "properties";
	
	/**
	 * @see #geom
	 **/
	public static final String GEOM = "geom";
	
	/**
	 * @see #pitches
	 **/
	public static final String PITCHES = "pitches";

	
	/**
	 * Static metamodel type for {@link com.avatar.pandora.product.models.location.Location}
	 **/
	public static volatile EntityType<Location> class_;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.location.Location#name}
	 **/
	public static volatile SingularAttribute<Location, String> name;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.location.Location#description}
	 **/
	public static volatile SingularAttribute<Location, String> description;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.location.Location#website}
	 **/
	public static volatile SingularAttribute<Location, String> website;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.location.Location#address}
	 **/
	public static volatile SingularAttribute<Location, Address> address;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.location.Location#contact}
	 **/
	public static volatile SingularAttribute<Location, Contact> contact;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.location.Location#properties}
	 **/
	public static volatile SetAttribute<Location, LocationProperty> properties;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.location.Location#geom}
	 **/
	public static volatile SingularAttribute<Location, Point> geom;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.location.Location#pitches}
	 **/
	public static volatile ListAttribute<Location, Pitch> pitches;

}

