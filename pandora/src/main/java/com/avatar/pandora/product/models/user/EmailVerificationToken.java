package com.avatar.pandora.product.models.user;

import com.avatar.pandora.product.models.BaseEntity;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(indexes = {
    @Index(name = "idx_verification_token", columnList = "token"),
    @Index(name = "idx_verification_user", columnList = "user_id")
})
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class EmailVerificationToken extends BaseEntity {

    @Column(nullable = false, unique = true)
    private String token;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @Column(nullable = false)
    private LocalDateTime expiryDate;

    @Column(nullable = false)
    private Boolean used = false;

    public boolean isExpired() {
        return LocalDateTime.now().isAfter(expiryDate);
    }

    public boolean isValid() {
        return !used && !isExpired();
    }
}

