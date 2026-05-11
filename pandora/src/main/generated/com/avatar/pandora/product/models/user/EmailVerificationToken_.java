package com.avatar.pandora.product.models.user;

import com.avatar.pandora.product.models.BaseEntity_;
import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.EntityType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.LocalDateTime;

/**
 * Static metamodel for {@link com.avatar.pandora.product.models.user.EmailVerificationToken}
 **/
@StaticMetamodel(EmailVerificationToken.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class EmailVerificationToken_ extends BaseEntity_ {

	
	/**
	 * @see #token
	 **/
	public static final String TOKEN = "token";
	
	/**
	 * @see #user
	 **/
	public static final String USER = "user";
	
	/**
	 * @see #expiryDate
	 **/
	public static final String EXPIRY_DATE = "expiryDate";
	
	/**
	 * @see #used
	 **/
	public static final String USED = "used";

	
	/**
	 * Static metamodel type for {@link com.avatar.pandora.product.models.user.EmailVerificationToken}
	 **/
	public static volatile EntityType<EmailVerificationToken> class_;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.user.EmailVerificationToken#token}
	 **/
	public static volatile SingularAttribute<EmailVerificationToken, String> token;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.user.EmailVerificationToken#user}
	 **/
	public static volatile SingularAttribute<EmailVerificationToken, User> user;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.user.EmailVerificationToken#expiryDate}
	 **/
	public static volatile SingularAttribute<EmailVerificationToken, LocalDateTime> expiryDate;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.user.EmailVerificationToken#used}
	 **/
	public static volatile SingularAttribute<EmailVerificationToken, Boolean> used;

}

