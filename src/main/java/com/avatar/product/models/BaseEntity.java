package com.avatar.product.models;

import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.Instant;

@Getter
@Setter
public abstract class BaseEntity {

    @CreationTimestamp
    protected Instant createdOn;

    @UpdateTimestamp
    protected Instant lastUpdatedOn;
}
