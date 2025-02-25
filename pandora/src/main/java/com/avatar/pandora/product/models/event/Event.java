package com.avatar.pandora.product.models.event;

import com.avatar.pandora.product.models.BaseEntity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Comment;

@Entity
@Getter
@Setter
@Table
public class Event extends BaseEntity {

    @Enumerated(EnumType.STRING)
    private EventType type;

}
