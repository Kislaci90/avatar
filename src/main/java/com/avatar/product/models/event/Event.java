package com.avatar.product.models.event;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table
public class Event {

    @Id
    @GeneratedValue
    private Long id;

    @Enumerated(EnumType.STRING)
    private EventType type;

}
