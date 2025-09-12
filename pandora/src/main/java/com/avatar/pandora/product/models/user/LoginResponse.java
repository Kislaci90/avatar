package com.avatar.pandora.product.models.user;

public record LoginResponse(String token, long expiresIn) {
}