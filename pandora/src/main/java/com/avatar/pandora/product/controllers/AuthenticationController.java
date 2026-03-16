package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.user.LoginResponse;
import com.avatar.pandora.product.models.user.RegisterResponse;
import com.avatar.pandora.product.models.user.RegisterUserInput;
import com.avatar.pandora.product.models.user.User;
import com.avatar.pandora.product.services.AuthenticationService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    @MutationMapping
    public RegisterResponse register(@Argument("registerUserInput") RegisterUserInput registerInput) {
        return authenticationService.signup(registerInput);
    }

    @MutationMapping
    public LoginResponse login(@Argument("username") String username, @Argument("password") String password) {
        User authenticatedUser = authenticationService.authenticate(username, password);

        return authenticationService.getLoginResponseFrom(authenticatedUser);
    }

}