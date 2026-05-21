package com.avatar.pandora.user.api;

public record VerificationEmailRequestedEvent(
        String email,
        String firstName,
        String token
) {}