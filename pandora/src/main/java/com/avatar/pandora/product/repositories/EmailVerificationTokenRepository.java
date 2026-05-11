package com.avatar.pandora.product.repositories;

import com.avatar.pandora.product.models.user.EmailVerificationToken;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface EmailVerificationTokenRepository extends CrudRepository<EmailVerificationToken, Long> {
    Optional<EmailVerificationToken> findByToken(String token);
}

