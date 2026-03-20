package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.location.LocationProperty;
import com.avatar.pandora.product.models.location.SearchFilter;
import com.avatar.pandora.product.models.stats.HomeStatView;
import org.junit.jupiter.api.Assertions;
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


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Home Controller Tests")
public class FilterControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @Test
    @DisplayName("Should retrieve location search filters with available cities and properties")
    void getSearchFilters() {
        var filters = httpGraphQlTester.documentName("getLocationSearchFilters")
                .execute()
                .path("data.getSearchFilters")
                .entity(SearchFilter.class)
                .get();

        Assertions.assertNotNull(filters);
        Assertions.assertNotNull(filters.cities());
        Assertions.assertNotNull(filters.locationProperties());
        Assertions.assertFalse(filters.cities().isEmpty(), "Cities should not be empty");
        Assertions.assertFalse(filters.locationProperties().isEmpty(), "Properties should not be empty");
        Assertions.assertTrue(filters.cities().contains("Budapest"), "Budapest should be in cities");
        Assertions.assertTrue(filters.locationProperties().contains(LocationProperty.CAFE.name()), "CAFE property should be available");
    }


}
