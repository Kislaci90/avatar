package com.avatar.pandora.user.models.user;

public record RegisterResponse(String message, Boolean success, LoginResponse loginResponse, UserView user) {
}
