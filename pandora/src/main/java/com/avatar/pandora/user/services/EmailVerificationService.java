package com.avatar.pandora.user.services;

import com.avatar.pandora.notification.services.EmailService;
import com.avatar.pandora.user.api.VerificationEmailRequestedEvent;
import com.avatar.pandora.user.models.user.EmailVerificationToken;
import com.avatar.pandora.user.models.user.User;
import com.avatar.pandora.user.repositories.EmailVerificationTokenRepository;
import com.avatar.pandora.user.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.UUID;

@Service
public class EmailVerificationService {

    private final EmailVerificationTokenRepository tokenRepository;
    private final UserRepository userRepository;
    private final ApplicationEventPublisher eventPublisher;

    @Value("${app.email-verification.expiry-hours:24}")
    private Integer expiryHours;

    public EmailVerificationService(
            EmailVerificationTokenRepository tokenRepository,
            UserRepository userRepository,
            ApplicationEventPublisher eventPublisher) {
        this.tokenRepository = tokenRepository;
        this.userRepository = userRepository;
        this.eventPublisher = eventPublisher;
    }

    @Transactional
    public void createAndSendVerificationToken(User user) {
        String token = UUID.randomUUID().toString();

        EmailVerificationToken verificationToken = new EmailVerificationToken();
        verificationToken.setToken(token);
        verificationToken.setUser(user);
        verificationToken.setExpiryDate(LocalDateTime.now().plusHours(expiryHours));
        verificationToken.setUsed(false);

        tokenRepository.save(verificationToken);

        eventPublisher.publishEvent(new VerificationEmailRequestedEvent(user.getEmail(), user.getEmail(), token));
    }

    @Transactional
    public void verifyEmail(String token) {
        EmailVerificationToken verificationToken = tokenRepository.findByToken(token)
                .orElseThrow(() -> new IllegalArgumentException("Invalid verification token"));

        if (!verificationToken.isValid()) {
            throw new IllegalArgumentException("Verification token expired or already used");
        }

        // Mark token as used
        verificationToken.setUsed(true);
        tokenRepository.save(verificationToken);

        // Mark user email as verified
        User user = verificationToken.getUser();
        user.setEmailVerified(true);
        userRepository.save(user);
    }

    public boolean isEmailVerified(String email) {
        return userRepository.findByEmail(email)
                .map(user -> user.getEmailVerified() != null && user.getEmailVerified())
                .orElse(false);
    }
}

