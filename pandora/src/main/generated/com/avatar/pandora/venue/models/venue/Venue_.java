package com.avatar.pandora.venue.models.venue;

import com.avatar.pandora.shared.BaseEntity_;
import com.avatar.pandora.venue.models.location.Location;
import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

/**
 * Static metamodel for {@link com.avatar.pandora.venue.models.venue.Venue}
 **/
@StaticMetamodel(Venue.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Venue_ extends BaseEntity_ {

	
	/**
	 * @see #name
	 **/
	public static final String NAME = "name";
	
	/**
	 * @see #location
	 **/
	public static final String LOCATION = "location";
	
	/**
	 * @see #description
	 **/
	public static final String DESCRIPTION = "description";
	
	/**
	 * @see #properties
	 **/
	public static final String PROPERTIES = "amenities";
	
	/**
	 * @see #surfaceType
	 **/
	public static final String SURFACE_TYPE = "surfaceType";
	
	/**
	 * @see #type
	 **/
	public static final String TYPE = "type";

	
	/**
	 * Static metamodel type for {@link com.avatar.pandora.venue.models.venue.Venue}
	 **/
	public static volatile EntityType<Venue> class_;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.venue.models.venue.Venue#name}
	 **/
	public static volatile SingularAttribute<Venue, String> name;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.venue.models.venue.Venue#location}
	 **/
	public static volatile SingularAttribute<Venue, Location> location;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.venue.models.venue.Venue#description}
	 **/
	public static volatile SingularAttribute<Venue, String> description;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.venue.models.venue.Venue#properties}
	 **/
	public static volatile SetAttribute<Venue, VenueProperty> properties;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.venue.models.venue.Venue#surfaceType}
	 **/
	public static volatile SingularAttribute<Venue, VenueSurfaceType> surfaceType;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.venue.models.venue.Venue#type}
	 **/
	public static volatile SingularAttribute<Venue, VenueType> type;

}

