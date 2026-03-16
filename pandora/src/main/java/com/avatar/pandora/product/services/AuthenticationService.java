package com.avatar.pandora.product.services;

import com.avatar.pandora.configuration.JwtService;
import com.avatar.pandora.product.models.user.*;
import com.avatar.pandora.product.repositories.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UserConverter userConverter;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder,
            JwtService jwtService, UserService userService, UserConverter userConverter) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.userConverter = userConverter;
    }

    public RegisterResponse signup(RegisterUserInput input) {
        User user = new User();
        user.setFirstName(input.firstName());
        user.setLastName(input.lastName());
        user.setEmail(input.email());
        user.setPassword(passwordEncoder.encode(input.password()));

        User savedUser = userRepository.save(user);

        LoginResponse loginResponse = getLoginResponseFrom(savedUser);
        UserView userView = userConverter.convertToView(savedUser);

        return new RegisterResponse("", true, loginResponse, userView);
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
}