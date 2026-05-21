package com.avatar.pandora.user.validators;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;
import org.springframework.stereotype.Component;

@Component
public class StrongPasswordValidator implements ConstraintValidator<StrongPassword, String> {
    @Override
    public boolean isValid(String value, ConstraintValidatorContext context) {
        if (value == null) return true;

        boolean hasUpperCase = value.matches(".*[A-Z].*");
        boolean hasLowerCase = value.matches(".*[a-z].*");
        boolean hasDigit = value.matches(".*\\d.*");
        boolean hasSpecialChar = value.matches(".*[!@#$%^&*()_+\\-=\\[\\]{};':\"\\\\|,.<>\\/?].*");

        return hasUpperCase && hasLowerCase && hasDigit && hasSpecialChar;
    }
}
