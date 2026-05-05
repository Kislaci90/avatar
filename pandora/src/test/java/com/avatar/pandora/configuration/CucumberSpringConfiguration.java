package com.avatar.pandora.configuration;

import org.springframework.boot.graphql.test.autoconfigure.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.MOCK)
@AutoConfigureGraphQlTester
@ActiveProfiles("bdd")
public class CucumberSpringConfiguration {
    // This class serves as the configuration bridge between Spring Boot and Cucumber
    // It ensures that Spring context is properly initialized for BDD tests
}

