package com.avatar.pandora.product.models;

import jakarta.annotation.Generated;
import jakarta.persistence.metamodel.MappedSuperclassType;
import jakarta.persistence.metamodel.SingularAttribute;
import jakarta.persistence.metamodel.StaticMetamodel;
import java.time.Instant;

/**
 * Static metamodel for {@link com.avatar.pandora.product.models.BaseEntity}
 **/
@StaticMetamodel(BaseEntity.class)
@Generated("org.hibernate.processor.HibernateProcessor")
public abstract class BaseEntity_ {

	
	/**
	 * @see #id
	 **/
	public static final String ID = "id";
	
	/**
	 * @see #createdBy
	 **/
	public static final String CREATED_BY = "createdBy";
	
	/**
	 * @see #createdDate
	 **/
	public static final String CREATED_DATE = "createdDate";
	
	/**
	 * @see #lastModifiedBy
	 **/
	public static final String LAST_MODIFIED_BY = "lastModifiedBy";
	
	/**
	 * @see #lastModifiedDate
	 **/
	public static final String LAST_MODIFIED_DATE = "lastModifiedDate";

	
	/**
	 * Static metamodel type for {@link com.avatar.pandora.product.models.BaseEntity}
	 **/
	public static volatile MappedSuperclassType<BaseEntity> class_;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.BaseEntity#id}
	 **/
	public static volatile SingularAttribute<BaseEntity, Long> id;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.BaseEntity#createdBy}
	 **/
	public static volatile SingularAttribute<BaseEntity, String> createdBy;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.BaseEntity#createdDate}
	 **/
	public static volatile SingularAttribute<BaseEntity, Instant> createdDate;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.BaseEntity#lastModifiedBy}
	 **/
	public static volatile SingularAttribute<BaseEntity, String> lastModifiedBy;
	
	/**
	 * Static metamodel for attribute {@link com.avatar.pandora.product.models.BaseEntity#lastModifiedDate}
	 **/
	public static volatile SingularAttribute<BaseEntity, Instant> lastModifiedDate;

}

