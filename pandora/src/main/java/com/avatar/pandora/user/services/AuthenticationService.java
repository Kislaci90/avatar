package com.avatar.pandora.user.services;

import com.avatar.pandora.configuration.JwtService;
import com.avatar.pandora.user.models.user.*;
import com.avatar.pandora.user.repositories.UserRepository;
import com.avatar.pandora.shared.DuplicateEmailException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@Slf4j
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserConverter userConverter;
    private final EmailVerificationService emailVerificationService;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtService jwtService,
            UserConverter userConverter,
            EmailVerificationService emailVerificationService) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userConverter = userConverter;
        this.emailVerificationService = emailVerificationService;
    }

    public RegisterResponse signup(RegisterUserInput input) {
        if (userRepository.existsByEmail(input.email().trim().toLowerCase())) {
            throw new DuplicateEmailException("Email already registered");
        }

        User user = new User();
        user.setFirstName(input.firstName().trim());
        user.setLastName(input.lastName().trim());
        user.setEmail(input.email().trim().toLowerCase());
        user.setPassword(passwordEncoder.encode(input.password()));
        user.setEmailVerified(false);

        User savedUser = userRepository.save(user);

        emailVerificationService.createAndSendVerificationToken(savedUser);

        LoginResponse loginResponse = getLoginResponseFrom(savedUser);
        UserView userView = userConverter.convertToView(savedUser);

        return new RegisterResponse("User registered successfully. Please verify your email.", true, loginResponse, userView);
    }

    public User authenticate(String username, String password) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        username,
                        password
                )
        );

        return userRepository.findByEmail(username)
                .orElseThrow();
    }

    public LoginResponse getLoginResponseFrom(User authenticatedUser) {
        String jwtToken = jwtService.generateToken(authenticatedUser);

        return new LoginResponse(jwtToken, jwtService.getExpirationTime());
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email.trim().toLowerCase())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }
}