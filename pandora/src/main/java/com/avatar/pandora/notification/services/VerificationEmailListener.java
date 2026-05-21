package com.avatar.pandora.notification.services;

import com.avatar.pandora.user.api.VerificationEmailRequestedEvent;
import org.springframework.stereotype.Component;
import org.springframework.transaction.event.TransactionPhase;
import org.springframework.transaction.event.TransactionalEventListener;

@Component
public class VerificationEmailListener {

    private final EmailService emailService;

    public VerificationEmailListener(EmailService emailService) {
        this.emailService = emailService;
    }

    @TransactionalEventListener(phase = TransactionPhase.AFTER_COMMIT)
    void on(VerificationEmailRequestedEvent event) {
        emailService.sendVerificationEmail(event.email(), event.firstName(), event.token());
    }
}