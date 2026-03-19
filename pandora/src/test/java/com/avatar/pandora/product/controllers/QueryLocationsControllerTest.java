package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.location.*;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Stream;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Query Locations Controller Tests")
class QueryLocationsControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @ParameterizedTest
    @MethodSource("provideLocationFilters")
    @DisplayName("Should search locations with various filter combinations")
    void searchLocations(String searchTerm, Set<String> cities, Set<String> locationProperties, Integer expected) {
        LocationFilter locationFilter = LocationFilterBuilder.builder()
                .searchTerm(searchTerm)
                .cities(cities)
                .locationProperties(locationProperties)
                .build();

        var locations = httpGraphQlTester.documentName("searchLocations")
                .variable("filter", locationFilter.getAsMap())
                .variable("offset", 10)
                .variable("count", 0)
                .variable("sort", LocationSort.DISTANCE_ASC.name())
                .execute()
                .path("data.searchLocations.content")
                .entityList(LocationView.class)
                .get();

        Assertions.assertEquals(expected, locations.size());
        if(locations.isEmpty()) return;
        
        // Validate search term in all results
        if(!searchTerm.isBlank()) {
            Assertions.assertTrue(locations.stream().allMatch(loc -> loc.name().contains(searchTerm)),
                    "Not all locations contain search term: " + searchTerm);
        }
        
        // Validate cities in all results
        if(!cities.isEmpty()) {
            Assertions.assertTrue(locations.stream().allMatch(loc -> cities.contains(loc.address().getCity())),
                    "Not all locations are in the filtered cities");
        }
        
        // Validate that ALL locations contain ALL filtered properties
        if(!locationProperties.isEmpty()) {
            Assertions.assertTrue(locations.stream().allMatch(loc -> 
                    loc.properties().containsAll(locationProperties)),
                    "Not all locations contain all the filtered properties");
        }
    }

    private static Stream<Arguments> provideLocationFilters() {
        return Stream.of(
                // Basic search by term
                Arguments.of("First", Set.of(), Set.of(), 1),
                // Search by non-existent term
                Arguments.of("NonExistent", Set.of(), Set.of(), 0),
                // Filter by city
                Arguments.of("", Set.of("Budapest"), Set.of(), 1),
                // Filter by non-existent city
                Arguments.of("", Set.of("NonExistentCity"), Set.of(), 0),
                // Filter by multiple cities
                Arguments.of("", Set.of("Budapest", "Eger"), Set.of(), 2),
                // Filter by single property
                Arguments.of("", Set.of(), Set.of(LocationProperty.CAFE.name()), 1),
                // Filter by multiple properties (AND logic)
                Arguments.of("", Set.of(), Set.of(LocationProperty.CAFE.name(), LocationProperty.CHANGING_ROOM.name()), 1),
                // Filter by another property
                Arguments.of("", Set.of(), Set.of(LocationProperty.CHANGING_ROOM.name()), 2),
                // Filter by all available properties
                Arguments.of("", Set.of(), Set.of(LocationProperty.SHOWER.name(), LocationProperty.FREE_PARKING.name(), LocationProperty.CAFE.name(), LocationProperty.CHANGING_ROOM.name(), LocationProperty.EQUIPMENT_RENTAL.name()), 0),
                // Combine search term with city filter
                Arguments.of("First", Set.of("Budapest"), Set.of(), 1),
                // Combine search term with property filter
                Arguments.of("First", Set.of(), Set.of(LocationProperty.CHANGING_ROOM.name()), 1),
                // Combine city filter with property filter
                Arguments.of("", Set.of("Budapest"), Set.of(LocationProperty.CAFE.name()), 0),
                // Combine all filters
                Arguments.of("First", Set.of("Budapest"), Set.of(LocationProperty.CHANGING_ROOM.name()), 1),
                // Empty string search (should act like no filter)
                Arguments.of("", Set.of(), Set.of(), 2),
                // Search term with lowercase (testing case sensitivity)
                Arguments.of("sport", Set.of(), Set.of(), 0)
        );
    }

    @Test
    @DisplayName("Should retrieve location details by ID")
    void getLocation() {
        LocationView location = httpGraphQlTester.documentName("locationDetails")
                .variable("id", 1L)
                .execute()
                .path("data.getLocation")
                .entity(LocationView.class)
                .get();

        Assertions.assertNotNull(location);
    }

    @Test
    @DisplayName("Should retrieve location search filters with available cities and properties")
    void getLocationSearchFilters() {
        var filters = httpGraphQlTester.documentName("getLocationSearchFilters")
                .execute()
                .path("data.getLocationSearchFilters")
                .entity(LocationSearchFilter.class)
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
