package com.avatar.pandora.product.models.review;

import com.avatar.pandora.product.models.BaseEntity_;
import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.user.User;
import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

/**
 * Static metamodel for {@link com.avatar.pandora.product.models.review.Review}
 **/
@StaticMetamodel(Review.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class Review_ extends BaseEntity_ {

	
	/**
	 * @see #user
	 **/
	public static final String USER = "user";
	
	/**
	 * @see #location
	 **/
	public static final String LOCATION = "location";
	
	/**
	 * @see #rating
	 **/
	public static final String RATING = "rating";

	
	/**
	 * Static metamodel type for {@link com.avatar.pandora.product.models.review.Review}
	 **/
	public static volatile EntityType<Review> class_;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.review.Review#user}
	 **/
	public static volatile SingularAttribute<Review, User> user;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.review.Review#location}
	 **/
	public static volatile SingularAttribute<Review, Location> location;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.review.Review#rating}
	 **/
	public static volatile SingularAttribute<Review, Float> rating;

}

