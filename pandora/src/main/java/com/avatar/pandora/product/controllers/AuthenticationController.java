package com.avatar.pandora.product.controllers;

import com.avatar.pandora.configuration.JwtService;
import com.avatar.pandora.product.models.user.LoginResponse;
import com.avatar.pandora.product.models.user.RegisterUser;
import com.avatar.pandora.product.models.user.User;
import com.avatar.pandora.product.services.AuthenticationService;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/auth")
@RestController
public class AuthenticationController {
    private final JwtService jwtService;
    
    private final AuthenticationService authenticationService;

    public AuthenticationController(JwtService jwtService, AuthenticationService authenticationService) {
        this.jwtService = jwtService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/signup")
    public ResponseEntity<User> register(@RequestBody RegisterUser registerUserDto) {
        User registeredUser = authenticationService.signup(registerUserDto);

        return ResponseEntity.ok(registeredUser);
    }

    @MutationMapping
    public LoginResponse login(@Argument("username") String username, @Argument("password") String password) {
        User authenticatedUser = authenticationService.authenticate(username, password);

        String jwtToken = jwtService.generateToken(authenticatedUser);

        return new LoginResponse(jwtToken, jwtService.getExpirationTime());
    }
}