package com.avatar.pandora.product.models.user;

import jakarta.validation.ConstraintViolation;
import jakarta.validation.Validation;
import jakarta.validation.Validator;
import jakarta.validation.ValidatorFactory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.util.Set;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("RegisterUserInput Validation Tests")
class RegisterUserInputTest {

    private Validator validator;

    @BeforeEach
    void setUp() {
        ValidatorFactory factory = Validation.buildDefaultValidatorFactory();
        validator = factory.getValidator();
    }

    @Test
    @DisplayName("Should accept valid registration input")
    void shouldAcceptValidInput() {
        RegisterUserInput input = new RegisterUserInput(
            "John",
            "Doe",
            "john@example.com",
            "SecurePass123!"
        );

        Set<ConstraintViolation<RegisterUserInput>> violations = validator.validate(input);
        assertTrue(violations.isEmpty());
    }

    @Test
    @DisplayName("Should reject password without uppercase")
    void shouldRejectPasswordWithoutUppercase() {
        RegisterUserInput input = new RegisterUserInput(
            "John",
            "Doe",
            "john@example.com",
            "securepass123!"
        );

        Set<ConstraintViolation<RegisterUserInput>> violations = validator.validate(input);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
            .anyMatch(v -> v.getMessage().contains("uppercase")));
    }

    @Test
    @DisplayName("Should reject password without lowercase")
    void shouldRejectPasswordWithoutLowercase() {
        RegisterUserInput input = new RegisterUserInput(
            "John",
            "Doe",
            "john@example.com",
            "SECUREPASS123!"
        );

        Set<ConstraintViolation<RegisterUserInput>> violations = validator.validate(input);
        assertFalse(violations.isEmpty());
    }

    @Test
    @DisplayName("Should reject password without number")
    void shouldRejectPasswordWithoutNumber() {
        RegisterUserInput input = new RegisterUserInput(
            "John",
            "Doe",
            "john@example.com",
            "SecurePass!"
        );

        Set<ConstraintViolation<RegisterUserInput>> violations = validator.validate(input);
        assertFalse(violations.isEmpty());
    }

    @Test
    @DisplayName("Should reject password without special character")
    void shouldRejectPasswordWithoutSpecialChar() {
        RegisterUserInput input = new RegisterUserInput(
            "John",
            "Doe",
            "john@example.com",
            "SecurePass123"
        );

        Set<ConstraintViolation<RegisterUserInput>> violations = validator.validate(input);
        assertFalse(violations.isEmpty());
    }

    @Test
    @DisplayName("Should reject password shorter than 8 characters")
    void shouldRejectShortPassword() {
        RegisterUserInput input = new RegisterUserInput(
            "John",
            "Doe",
            "john@example.com",
            "Pass1!"
        );

        Set<ConstraintViolation<RegisterUserInput>> violations = validator.validate(input);
        assertFalse(violations.isEmpty());
    }

    @Test
    @DisplayName("Should reject invalid email")
    void shouldRejectInvalidEmail() {
        RegisterUserInput input = new RegisterUserInput(
            "John",
            "Doe",
            "invalid-email",
            "SecurePass123!"
        );

        Set<ConstraintViolation<RegisterUserInput>> violations = validator.validate(input);
        assertFalse(violations.isEmpty());
        assertTrue(violations.stream()
            .anyMatch(v -> v.getMessage().contains("Email")));
    }

    @Test
    @DisplayName("Should reject first name shorter than 2 characters")
    void shouldRejectShortFirstName() {
        RegisterUserInput input = new RegisterUserInput(
            "J",
            "Doe",
            "john@example.com",
            "SecurePass123!"
        );

        Set<ConstraintViolation<RegisterUserInput>> violations = validator.validate(input);
        assertFalse(violations.isEmpty());
    }

    @Test
    @DisplayName("Should reject blank email")
    void shouldRejectBlankEmail() {
        RegisterUserInput input = new RegisterUserInput(
            "John",
            "Doe",
            "",
            "SecurePass123!"
        );

        Set<ConstraintViolation<RegisterUserInput>> violations = validator.validate(input);
        assertFalse(violations.isEmpty());
    }
}

