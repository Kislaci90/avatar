package com.avatar.pandora.product.models.pitch;

import com.avatar.pandora.product.models.BaseEntity_;
import com.avatar.pandora.product.models.location.Location;
import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SetAttribute;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

/**
 * Static metamodel for {@link com.avatar.pandora.product.models.pitch.Pitch}
 **/
@StaticMetamodel(Pitch.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Pitch_ extends BaseEntity_ {

	
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
	public static final String PROPERTIES = "properties";
	
	/**
	 * @see #surfaceType
	 **/
	public static final String SURFACE_TYPE = "surfaceType";
	
	/**
	 * @see #type
	 **/
	public static final String TYPE = "type";

	
	/**
	 * Static metamodel type for {@link com.avatar.pandora.product.models.pitch.Pitch}
	 **/
	public static volatile EntityType<Pitch> class_;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.pitch.Pitch#name}
	 **/
	public static volatile SingularAttribute<Pitch, String> name;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.pitch.Pitch#location}
	 **/
	public static volatile SingularAttribute<Pitch, Location> location;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.pitch.Pitch#description}
	 **/
	public static volatile SingularAttribute<Pitch, String> description;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.pitch.Pitch#properties}
	 **/
	public static volatile SetAttribute<Pitch, PitchProperty> properties;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.pitch.Pitch#surfaceType}
	 **/
	public static volatile SingularAttribute<Pitch, PitchSurfaceType> surfaceType;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.pitch.Pitch#type}
	 **/
	public static volatile SingularAttribute<Pitch, PitchType> type;

}

