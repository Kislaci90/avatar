package com.avatar.pandora.user.models.user;

public record LoginResponse(String token, long expiresIn) {
}