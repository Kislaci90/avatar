package com.avatar.pandora.notification.services;

import com.avatar.pandora.user.models.user.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${app.mail.from:noreply@avatar.local}")
    private String fromEmail;

    @Value("${app.email-verification.url:http://localhost:3000/verify-email}")
    private String verificationUrl;

    @Value("${app.email-verification.expiry-hours:24}")
    private String emailVerificationExpiryHours;

    public EmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendVerificationEmail(String email, String firstName, String token) {
        try {
            String verificationLink = verificationUrl + "?token=" + token;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(email);
            message.setSubject("Verify Your Email Address");
            message.setText(buildEmailContent(firstName, verificationLink));

            mailSender.send(message);
            log.info("Verification email sent to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send verification email to: {}", email, e);
            throw new RuntimeException("Failed to send verification email", e);
        }
    }

    public void sendPasswordResetEmail(String email, String firstName, String token) {
        try {
            String resetLink = verificationUrl.replace("verify-email", "reset-password") + "?token=" + token;

            SimpleMailMessage message = new SimpleMailMessage();
            message.setFrom(fromEmail);
            message.setTo(email);
            message.setSubject("Reset Your Password");
            message.setText(buildPasswordResetEmailContent(firstName, resetLink));

            mailSender.send(message);
            log.info("Password reset email sent to: {}", email);
        } catch (Exception e) {
            log.error("Failed to send password reset email to: {}", email, e);
            throw new RuntimeException("Failed to send password reset email", e);
        }
    }

    private String buildEmailContent(String firstName, String verificationLink) {
        return "Hello " + firstName + ",\n\n" +
                "Welcome to Avatar! Please verify your email address by clicking the link below:\n\n" +
                verificationLink + "\n\n" +
                "This link will expire in " + emailVerificationExpiryHours + " hours.\n\n" +
                "If you did not create this account, please ignore this email.\n\n" +
                "Best regards,\n" +
                "Avatar Team";
    }

    private String buildPasswordResetEmailContent(String firstName, String resetLink) {
        return "Hello " + firstName + ",\n\n" +
                "To reset your password, click the link below:\n\n" +
                resetLink + "\n\n" +
                "This link will expire in 1 hour.\n\n" +
                "If you did not request this reset, please ignore this email.\n\n" +
                "Best regards,\n" +
                "Avatar Team";
    }
}

