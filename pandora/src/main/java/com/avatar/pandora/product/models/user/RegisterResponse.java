package com.avatar.pandora.product.models.user;

public record RegisterResponse(String message, Boolean success, LoginResponse loginResponse, UserView user) {
}
