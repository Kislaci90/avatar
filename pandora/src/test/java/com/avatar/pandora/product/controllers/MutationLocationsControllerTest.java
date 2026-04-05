package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.location.LocationView;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Mutation Locations Controller Tests")
class MutationLocationsControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @Test
    @DisplayName("Should delete a location with no pitches")
    void deleteLocationWithNoPitches() {
        Boolean result = httpGraphQlTester.documentName("deleteLocation")
                .variable("id", 2)
                .execute()
                .path("data.deleteLocation")
                .entity(Boolean.class)
                .get();

        assertTrue(result);

        httpGraphQlTester.documentName("locationDetails")
                .variable("id", 2)
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Deleted location should no longer be accessible"));
    }

    @Test
    @DisplayName("Should delete a location with pitches (cascade delete)")
    void deleteLocationWithPitches() {
        Boolean result = httpGraphQlTester.documentName("deleteLocation")
                .variable("id", 1)
                .execute()
                .path("data.deleteLocation")
                .entity(Boolean.class)
                .get();

        assertTrue(result);

        httpGraphQlTester.documentName("locationDetails")
                .variable("id", 1)
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Deleted location should no longer be accessible"));
    }
}
