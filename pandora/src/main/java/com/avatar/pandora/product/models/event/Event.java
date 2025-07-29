package com.avatar.pandora.product.models.event;

import com.avatar.pandora.product.models.BaseEntity;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table
public class Event extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private EventType type;

}
