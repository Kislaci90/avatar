package com.avatar.pandora.product.models.review;

import com.avatar.pandora.product.models.BaseEntity;
import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.user.User;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table
@Getter
@Setter
public class Review extends BaseEntity {
    @OneToOne(cascade = CascadeType.ALL)
    private User user;

    @OneToOne(cascade = CascadeType.ALL)
    private Location location;

    @Min(0)
    @Max(5)
    private Float rating;
}
