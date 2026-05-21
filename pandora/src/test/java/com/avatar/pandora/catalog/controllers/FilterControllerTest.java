package com.avatar.pandora.catalog.controllers;

import com.avatar.pandora.venue.models.location.LocationAmenity;
import com.avatar.pandora.venue.models.location.SearchFilter;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.graphql.test.autoconfigure.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;


@SpringBootTest
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Home Controller Tests")
class FilterControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @Test
    @DisplayName("Should retrieve location search filters with available cities and amenities")
    void getSearchFilters() {
        var filters = httpGraphQlTester.documentName("getSearchFilters")
                .execute()
                .path("data.getSearchFilters")
                .entity(SearchFilter.class)
                .get();

        Assertions.assertNotNull(filters);
        Assertions.assertNotNull(filters.cities());
        Assertions.assertNotNull(filters.locationAmenities());
        Assertions.assertFalse(filters.cities().isEmpty(), "Cities should not be empty");
        Assertions.assertFalse(filters.locationAmenities().isEmpty(), "Properties should not be empty");
        Assertions.assertTrue(filters.cities().contains("Budapest"), "Budapest should be in cities");
        Assertions.assertTrue(filters.locationAmenities().contains(LocationAmenity.CAFE.name()), "CAFE property should be available");
    }


}
