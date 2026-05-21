package com.avatar.pandora.venue.models.event;

import com.avatar.pandora.venue.models.BaseEntity_;
import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

/**
 * Static metamodel for {@link Event}
 **/
@StaticMetamodel(Event.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Event_ extends BaseEntity_ {

	
	/**
	 * @see #type
	 **/
	public static final String TYPE = "type";

	
	/**
	 * Static metamodel type for {@link Event}
	 **/
	public static volatile EntityType<Event> class_;
	
	/**
	 * Static metamodel for attribute {@link Event#type}
	 **/
	public static volatile SingularAttribute<Event, EventType> type;

}

