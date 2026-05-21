package com.avatar.pandora.venue.models.user;

import com.avatar.pandora.user.models.user.User;
import com.avatar.pandora.venue.models.BaseEntity_;
import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;

/**
 * Static metamodel for {@link User}
 **/
@StaticMetamodel(User.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class User_ extends BaseEntity_ {

	
	/**
	 * @see #firstName
	 **/
	public static final String FIRST_NAME = "firstName";
	
	/**
	 * @see #lastName
	 **/
	public static final String LAST_NAME = "lastName";
	
	/**
	 * @see #email
	 **/
	public static final String EMAIL = "email";
	
	/**
	 * @see #emailVerified
	 **/
	public static final String EMAIL_VERIFIED = "emailVerified";
	
	/**
	 * @see #password
	 **/
	public static final String PASSWORD = "password";

	
	/**
	 * Static metamodel type for {@link User}
	 **/
	public static volatile EntityType<User> class_;
	
	/**
	 * Static metamodel for attribute {@link User#firstName}
	 **/
	public static volatile SingularAttribute<User, String> firstName;
	
	/**
	 * Static metamodel for attribute {@link User#lastName}
	 **/
	public static volatile SingularAttribute<User, String> lastName;
	
	/**
	 * Static metamodel for attribute {@link User#email}
	 **/
	public static volatile SingularAttribute<User, String> email;
	
	/**
	 * Static metamodel for attribute {@link User#emailVerified}
	 **/
	public static volatile SingularAttribute<User, Boolean> emailVerified;
	
	/**
	 * Static metamodel for attribute {@link User#password}
	 **/
	public static volatile SingularAttribute<User, String> password;

}

