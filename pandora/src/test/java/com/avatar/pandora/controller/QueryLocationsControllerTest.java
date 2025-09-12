package com.avatar.pandora.controller;

import com.avatar.pandora.product.models.location.LocationFilter;
import com.avatar.pandora.product.models.location.LocationFilterBuilder;
import com.avatar.pandora.product.models.location.LocationView;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.context.ActiveProfiles;

import java.util.Map;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
class QueryLocationsControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @Test
    void searchLocations() {
        LocationFilter locationFilter = LocationFilterBuilder.builder().searchTerm("Test Location").build();

        var locations = httpGraphQlTester.documentName("searchLocations")
                .variable("filter", Map.of("searchTerm", locationFilter.searchTerm()))
                .variable("offset", 10)
                .variable("count", 0)
                .variable("sort", Map.of("field", "name", "direction", "ASC"))
                .execute()
                .path("data.searchLocations.content")
                .entityList(LocationView.class)
                .get();

        Assertions.assertEquals(1, locations.size());
    }

    @Test
    void getLocation() {
        LocationView location = httpGraphQlTester.documentName("locationDetails")
                .variable("id", 1L)
                .execute()
                .path("data.getLocation")
                .entity(LocationView.class)
                .get();

        Assertions.assertNotNull(location);
    }

}
