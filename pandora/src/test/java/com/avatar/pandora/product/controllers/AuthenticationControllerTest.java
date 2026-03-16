package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.user.*;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.DisplayName;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Authentication Controller Tests")
class AuthenticationControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    private Map<String, String> toMap(RegisterUserInput input) {
        Map<String, String> map = new HashMap<>();
        map.put("firstName", input.firstName());
        map.put("lastName", input.lastName());
        map.put("email", input.email());
        map.put("password", input.password());
        return map;
    }

    @Test
    @DisplayName("Should successfully register a new user")
    void registerUserSuccess() {
        String firstName = "John";
        String lastName = "Doe";
        String email = "john@example.com";
        String password = "securePassword123!";
        RegisterUserInput input = new RegisterUserInput(firstName, lastName, email, password);

        var response = httpGraphQlTester
                .documentName("registerUser")
                .variable("registerUserInput", toMap(input))
                .execute()
                .path("data.register")
                .entity(RegisterResponse.class)
                .get();

        assertNotNull(response);
        assertNotNull(response.user());
        assertEquals(firstName, response.user().firstName());
        assertEquals(lastName, response.user().lastName());
        assertEquals(email, response.user().email());
    }

    @Test
    @DisplayName("Should successfully login with correct credentials")
    void loginUserSuccess() {
        String email = "test@example.com";
        String password = "testPassword123!";
        RegisterUserInput input = new RegisterUserInput("Test"," User", email, password);

        httpGraphQlTester
                .documentName("registerUser")
                .variable("registerUserInput", toMap(input))
                .execute()
                .path("data.register.user.id")
                .hasValue();

        // Then login with the registered user
        var loginResponse = httpGraphQlTester
                .documentName("loginUser")
                .variable("username", email)
                .variable("password", password)
                .execute()
                .path("data.login")
                .entity(LoginResponse.class)
                .get();

        assertNotNull(loginResponse);
        assertNotNull(loginResponse.token());
        assertTrue(loginResponse.token().length() > 0);
        assertTrue(loginResponse.expiresIn() > 0);
    }

    @Test
    @DisplayName("Should return JWT token with correct structure")
    void loginReturnsValidJwtToken() {
        String email = "jwt@example.com";
        String password = "jwtPassword123!";
        RegisterUserInput input = new RegisterUserInput("JWT","Test User", email, password);

        // Register user
        httpGraphQlTester
                .documentName("registerUser")
                .variable("registerUserInput", toMap(input))
                .execute()
                .path("data.register.user.id")
                .hasValue();

        // Login and check token
        var token = httpGraphQlTester
                .documentName("loginUser")
                .variable("username", email)
                .variable("password", password)
                .execute()
                .path("data.login.token")
                .entity(String.class)
                .get();

        assertNotNull(token);
        // JWT tokens have 3 parts separated by dots
        String[] parts = token.split("\\.");
        assertEquals(3, parts.length, "JWT should have 3 parts (header.payload.signature)");
    }

    @Test
    @DisplayName("Should return expiration time on login")
    void loginReturnsExpirationTime() {
        String email = "expiry@example.com";
        String password = "expiryPassword123!";
        RegisterUserInput input = new RegisterUserInput("Expiry","Test User", email, password);

        // Register user
        httpGraphQlTester
                .documentName("registerUser")
                .variable("registerUserInput", toMap(input))
                .execute()
                .path("data.register.user.id")
                .hasValue();

        // Login and check expiration
        var expiresIn = httpGraphQlTester
                .documentName("loginUser")
                .variable("username", email)
                .variable("password", password)
                .execute()
                .path("data.login.expiresIn")
                .entity(Long.class)
                .get();

        assertNotNull(expiresIn);
        assertTrue(expiresIn > 0, "Expiration time should be positive");
    }

    @Test
    @DisplayName("Should fail login with invalid password")
    void loginFailsWithInvalidPassword() {
        String email = "user@example.com";
        String password = "correctPassword123!";
        String wrongPassword = "wrongPassword123!";
        RegisterUserInput input = new RegisterUserInput("Test","User", email, password);

        // Register user
        httpGraphQlTester
                .documentName("registerUser")
                .variable("registerUserInput", toMap(input))
                .execute()
                .path("data.register.user.id")
                .hasValue();

        // Try to login with wrong password
        httpGraphQlTester
                .documentName("loginUser")
                .variable("username", email)
                .variable("password", wrongPassword)
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Should have authentication error"));
    }

    @Test
    @DisplayName("Should fail login with non-existent user")
    void loginFailsWithNonExistentUser() {
        String nonExistentEmail = "nonexistent@example.com";
        String password = "anyPassword123!";

        httpGraphQlTester
                .documentName("loginUser")
                .variable("username", nonExistentEmail)
                .variable("password", password)
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Should have user not found error"));
    }

    @Test
    @DisplayName("Should register multiple users with different emails")
    void registerMultipleUsers() {
        String[] emails = {"user1@example.com", "user2@example.com", "user3@example.com"};
        String[] firstNames = {"User1", "User2", "User3"};
        String[] lastNames = {"One", "Two", "Three"};

        for (int i = 0; i < emails.length; i++) {
            RegisterUserInput input = new RegisterUserInput(firstNames[i], lastNames[i], emails[i], "password" + i + "!");
            
            var user = httpGraphQlTester
                    .documentName("registerUser")
                    .variable("registerUserInput", toMap(input))
                    .execute()
                    .path("data.register.user")
                    .entity(UserView.class)
                    .get();

            assertNotNull(user);
            assertEquals(emails[i], user.email());
            assertEquals(firstNames[i], user.firstName());
            assertEquals(lastNames[i], user.lastName());
        }
    }
}

