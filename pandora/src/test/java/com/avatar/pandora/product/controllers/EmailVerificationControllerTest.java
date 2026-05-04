package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.user.EmailVerificationToken;
import com.avatar.pandora.product.models.user.RegisterUserInput;
import com.avatar.pandora.product.models.user.User;
import com.avatar.pandora.product.repositories.EmailVerificationTokenRepository;
import com.avatar.pandora.product.repositories.UserRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.graphql.test.autoconfigure.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;
import java.util.stream.StreamSupport;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Email Verification Controller Tests")
class EmailVerificationControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailVerificationTokenRepository tokenRepository;

    private Map<String, String> toMap(RegisterUserInput input) {
        Map<String, String> map = new HashMap<>();
        map.put("firstName", input.firstName());
        map.put("lastName", input.lastName());
        map.put("email", input.email());
        map.put("password", input.password());
        return map;
    }

    private String registerUserAndGetToken(String email) {
        RegisterUserInput input = new RegisterUserInput("Test", "User", email, "Password123!");

        // Register user
        httpGraphQlTester
                .documentName("registerUser")
                .variable("registerUserInput", toMap(input))
                .execute()
                .path("data.register.user.id")
                .hasValue();

        // Fetch the verification token from database
        User user = userRepository.findByEmail(email).orElseThrow();
        List<EmailVerificationToken> tokens = StreamSupport.stream(
                tokenRepository.findAll().spliterator(), false).toList();
        EmailVerificationToken token = tokens.stream()
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .findFirst()
                .orElseThrow();

        return token.getToken();
    }

    @Test
    @DisplayName("Should successfully verify email with valid token")
    void verifyEmailSuccess() {
        String email = "verify@example.com";
        String token = registerUserAndGetToken(email);

        // Verify that user is not verified yet
        User userBefore = userRepository.findByEmail(email).orElseThrow();
        assertFalse(userBefore.getEmailVerified(), "User should not be verified before verification");

        // Verify email
        var result = httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", token)
                .execute()
                .path("data.verifyEmail")
                .entity(Boolean.class)
                .get();

        assertTrue(result, "Email verification should return true");

        // Verify that user is now verified
        User userAfter = userRepository.findByEmail(email).orElseThrow();
        assertTrue(userAfter.getEmailVerified(), "User should be verified after verification");
    }

    @Test
    @DisplayName("Should fail verification with invalid token")
    void verifyEmailWithInvalidToken() {
        String invalidToken = UUID.randomUUID().toString();

        httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", invalidToken)
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Should have error for invalid token"));
    }

    @Test
    @DisplayName("Should fail verification with expired token")
    void verifyEmailWithExpiredToken() {
        String email = "expired@example.com";
        RegisterUserInput input = new RegisterUserInput("Expired", "User", email, "Password123!");

        httpGraphQlTester
                .documentName("registerUser")
                .variable("registerUserInput", toMap(input))
                .execute()
                .path("data.register.user.id")
                .hasValue();

        User user = userRepository.findByEmail(email).orElseThrow();
        List<EmailVerificationToken> tokens = StreamSupport.stream(
                tokenRepository.findAll().spliterator(), false).toList();
        EmailVerificationToken token = tokens.stream()
                .filter(t -> t.getUser().getId().equals(user.getId()))
                .findFirst()
                .orElseThrow();

        // Manually expire the token
        token.setExpiryDate(LocalDateTime.now().minusHours(1));
        tokenRepository.save(token);

        httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", token.getToken())
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Should have error for expired token"));
    }

    @Test
    @DisplayName("Should fail verification with already used token")
    void verifyEmailWithAlreadyUsedToken() {
        String email = "used@example.com";
        String token = registerUserAndGetToken(email);

        // First verification should succeed
        httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", token)
                .execute()
                .path("data.verifyEmail")
                .hasValue();

        // Second verification with same token should fail
        httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", token)
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Should have error for already used token"));
    }

    @Test
    @DisplayName("Should successfully resend verification email")
    void resendVerificationEmailSuccess() {
        String email = "resend@example.com";
        RegisterUserInput input = new RegisterUserInput("Resend", "User", email, "Password123!");

        httpGraphQlTester
                .documentName("registerUser")
                .variable("registerUserInput", toMap(input))
                .execute()
                .path("data.register.user.id")
                .hasValue();

        // Get first token count
        long initialTokenCount = tokenRepository.count();

        // Resend verification email
        var result = httpGraphQlTester
                .documentName("resendVerificationEmail")
                .variable("email", email)
                .execute()
                .path("data.resendVerificationEmail")
                .entity(Boolean.class)
                .get();

        assertTrue(result, "Resend verification email should return true");

        // Verify that a new token was created
        long newTokenCount = tokenRepository.count();
        assertEquals(initialTokenCount + 1, newTokenCount, "A new token should be created");
    }

    @Test
    @DisplayName("Should fail resend verification email for non-existent user")
    void resendVerificationEmailForNonExistentUser() {
        String nonExistentEmail = "nonexistent@example.com";

        httpGraphQlTester
                .documentName("resendVerificationEmail")
                .variable("email", nonExistentEmail)
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Should have error for non-existent user"));
    }

    @Test
    @DisplayName("Should fail resend verification email for already verified user")
    void resendVerificationEmailForAlreadyVerifiedUser() {
        String email = "verified@example.com";
        String token = registerUserAndGetToken(email);

        // First verify the email
        httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", token)
                .execute()
                .path("data.verifyEmail")
                .entity(Boolean.class)
                .get();

        // Try to resend verification email for already verified user
        httpGraphQlTester
                .documentName("resendVerificationEmail")
                .variable("email", email)
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Should have error for already verified user"));
    }

    @Test
    @DisplayName("Should create separate verification tokens for multiple users")
    void multiplUsersWithSeparateTokens() {
        String[] emails = {"user1@example.com", "user2@example.com", "user3@example.com"};

        for (String email : emails) {
            RegisterUserInput input = new RegisterUserInput("User", email.split("@")[0], email, "Password123!");
            httpGraphQlTester
                    .documentName("registerUser")
                    .variable("registerUserInput", toMap(input))
                    .execute()
                    .path("data.register.user.id")
                    .hasValue();
        }

        // Verify each user with their respective token
        for (String email : emails) {
            User user = userRepository.findByEmail(email).orElseThrow();
            List<EmailVerificationToken> tokens = StreamSupport.stream(
                    tokenRepository.findAll().spliterator(), false).toList();
            EmailVerificationToken token = tokens.stream()
                    .filter(t -> t.getUser().getId().equals(user.getId()))
                    .findFirst()
                    .orElseThrow();

            var result = httpGraphQlTester
                    .documentName("verifyEmail")
                    .variable("token", token.getToken())
                    .execute()
                    .path("data.verifyEmail")
                    .entity(Boolean.class)
                    .get();

            assertTrue(result, "Should successfully verify email for " + email);

            User verifiedUser = userRepository.findByEmail(email).orElseThrow();
            assertTrue(verifiedUser.getEmailVerified(), "User " + email + " should be verified");
        }
    }

    @Test
    @DisplayName("Should ensure token is marked as used after successful verification")
    void tokenMarkedAsUsedAfterVerification() {
        String email = "marked@example.com";
        String token = registerUserAndGetToken(email);

        // Verify that token is not used yet
        EmailVerificationToken tokenBefore = tokenRepository.findByToken(token).orElseThrow();
        assertFalse(tokenBefore.getUsed(), "Token should not be marked as used before verification");

        // Verify email
        httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", token)
                .execute()
                .path("data.verifyEmail")
                .entity(Boolean.class)
                .get();

        // Verify that token is now marked as used
        EmailVerificationToken tokenAfter = tokenRepository.findByToken(token).orElseThrow();
        assertTrue(tokenAfter.getUsed(), "Token should be marked as used after verification");
    }

    @Test
    @DisplayName("Should handle empty token string")
    void verifyEmailWithEmptyToken() {
        httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", "")
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Should have error for empty token"));
    }

    @Test
    @DisplayName("Should verify email independently for multiple users")
    void verifyMultipleUsersIndependently() {
        String email1 = "verify1@example.com";
        String email2 = "verify2@example.com";

        String token1 = registerUserAndGetToken(email1);
        String token2 = registerUserAndGetToken(email2);

        // Verify first user
        httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", token1)
                .execute()
                .path("data.verifyEmail")
                .entity(Boolean.class)
                .get();

        // Verify that only first user is verified
        User user1 = userRepository.findByEmail(email1).orElseThrow();
        User user2 = userRepository.findByEmail(email2).orElseThrow();

        assertTrue(user1.getEmailVerified(), "First user should be verified");
        assertFalse(user2.getEmailVerified(), "Second user should not be verified yet");

        // Verify second user
        httpGraphQlTester
                .documentName("verifyEmail")
                .variable("token", token2)
                .execute()
                .path("data.verifyEmail")
                .entity(Boolean.class)
                .get();

        // Both users should now be verified
        user2 = userRepository.findByEmail(email2).orElseThrow();
        assertTrue(user2.getEmailVerified(), "Second user should be verified");
    }

    @Test
    @DisplayName("Should resend new token after resending verification email")
    void resendCreatesNewToken() {
        String email = "newtoken@example.com";
        String firstToken = registerUserAndGetToken(email);

        // Get user
        User user = userRepository.findByEmail(email).orElseThrow();

        // Resend verification email
        httpGraphQlTester
                .documentName("resendVerificationEmail")
                .variable("email", email)
                .execute()
                .path("data.resendVerificationEmail")
                .entity(Boolean.class)
                .get();

        // Get all tokens for this user
        Long userId = user.getId();
        java.util.List<EmailVerificationToken> allTokens = (java.util.List<EmailVerificationToken>) tokenRepository.findAll();
        java.util.List<EmailVerificationToken> userTokens = allTokens.stream()
                .filter(t -> t.getUser().getId().equals(userId))
                .toList();

        assertEquals(2, userTokens.size(), "Should have 2 tokens for user");

        // Verify both tokens exist
        EmailVerificationToken secondToken = userTokens.stream()
                .filter(t -> !t.getToken().equals(firstToken))
                .findFirst()
                .orElseThrow();

        assertNotNull(secondToken.getToken(), "New token should exist");
        assertNotEquals(firstToken, secondToken.getToken(), "New token should be different from first token");
    }
}






