package com.avatar.pandora.user.controllers;

import com.avatar.pandora.user.models.user.LoginResponse;
import com.avatar.pandora.user.models.user.RegisterResponse;
import com.avatar.pandora.user.models.user.RegisterUserInput;
import com.avatar.pandora.user.models.user.User;
import com.avatar.pandora.user.services.AuthenticationService;
import com.avatar.pandora.user.services.EmailVerificationService;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
@Slf4j
public class AuthenticationController {
    private final AuthenticationService authenticationService;
    private final EmailVerificationService emailVerificationService;

    public AuthenticationController(
            AuthenticationService authenticationService,
            EmailVerificationService emailVerificationService) {
        this.authenticationService = authenticationService;
        this.emailVerificationService = emailVerificationService;
    }

    @MutationMapping
    public RegisterResponse register(@Argument("registerUserInput") @Valid RegisterUserInput registerInput) {
        return authenticationService.signup(registerInput);
    }

    @MutationMapping
    public LoginResponse login(@Argument("username") String username, @Argument("password") String password) {
        User authenticatedUser = authenticationService.authenticate(username, password);

        return authenticationService.getLoginResponseFrom(authenticatedUser);
    }

    @MutationMapping
    public Boolean verifyEmail(@Argument("token") String token) {
        log.info("Received email verification request");
        emailVerificationService.verifyEmail(token);
        return true;
    }

    @MutationMapping
    public Boolean resendVerificationEmail(@Argument("email") String email) {
        User user = authenticationService.getUserByEmail(email);

        if (Boolean.TRUE.equals(user.getEmailVerified())) {
            throw new IllegalArgumentException("Email already verified");
        }

        emailVerificationService.createAndSendVerificationToken(user);
        return true;
    }

}