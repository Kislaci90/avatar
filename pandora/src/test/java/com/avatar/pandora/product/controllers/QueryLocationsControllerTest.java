package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.filter.Filter;
import com.avatar.pandora.product.models.location.LocationProperty;
import com.avatar.pandora.product.models.location.LocationSort;
import com.avatar.pandora.product.models.location.LocationView;
import com.avatar.pandora.product.models.pitch.PitchSurfaceType;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.graphql.test.autoconfigure.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.webmvc.test.autoconfigure.AutoConfigureMockMvc;
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
    void searchLocations(String searchTerm, Set<String> cities, Set<String> locationProperties, Set<String> surfaceTypes, Integer expected) {
        Filter locationFilter = Filter.builder()
                .searchTerm(searchTerm)
                .cities(cities)
                .locationProperties(locationProperties)
                .surfaceTypes(surfaceTypes)
                .pitchTypes(Set.of())
                .properties(Set.of())
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
        if (locations.isEmpty()) return;

        if (!searchTerm.isBlank()) {
            Assertions.assertTrue(locations.stream().allMatch(loc -> loc.name().contains(searchTerm)),
                    "Not all locations contain search term: " + searchTerm);
        }

        if (!cities.isEmpty()) {
            Assertions.assertTrue(locations.stream().allMatch(loc -> cities.contains(loc.address().getCity())),
                    "Not all locations are in the filtered cities");
        }

        if (!locationProperties.isEmpty()) {
            Assertions.assertTrue(locations.stream().allMatch(loc ->
                            loc.properties().containsAll(locationProperties)),
                    "Not all locations contain all the filtered properties");
        }

        if (!surfaceTypes.isEmpty()) {
            Assertions.assertTrue(locations.stream().allMatch(loc ->
                            loc.pitches().stream().anyMatch(pitch -> surfaceTypes.contains(pitch.surfaceType().name()))),
                    "Not all locations have pitches with the filtered surface types");
        }
    }

    private static Stream<Arguments> provideLocationFilters() {
        return Stream.of(
                // Basic search by term
                Arguments.of("First", Set.of(), Set.of(), Set.of(), 1),
                // Search by non-existent term
                Arguments.of("NonExistent", Set.of(), Set.of(), Set.of(), 0),
                // Filter by city
                Arguments.of("", Set.of("Budapest"), Set.of(), Set.of(), 1),
                // Filter by non-existent city
                Arguments.of("", Set.of("NonExistentCity"), Set.of(), Set.of(), 0),
                // Filter by multiple cities
                Arguments.of("", Set.of("Budapest", "Eger"), Set.of(), Set.of(), 2),
                // Filter by single property
                Arguments.of("", Set.of(), Set.of(LocationProperty.CAFE.name()), Set.of(), 1),
                // Filter by multiple properties (AND logic)
                Arguments.of("", Set.of(), Set.of(LocationProperty.CAFE.name(), LocationProperty.CHANGING_ROOM.name()), Set.of(), 1),
                // Filter by another property
                Arguments.of("", Set.of(), Set.of(LocationProperty.CHANGING_ROOM.name()), Set.of(), 2),
                // Filter by all available properties
                Arguments.of("", Set.of(), Set.of(LocationProperty.SHOWER.name(), LocationProperty.FREE_PARKING.name(), LocationProperty.CAFE.name(), LocationProperty.CHANGING_ROOM.name(), LocationProperty.EQUIPMENT_RENTAL.name()), Set.of(), 0),
                // Combine search term with city filter
                Arguments.of("First", Set.of("Budapest"), Set.of(), Set.of(), 1),
                // Combine search term with property filter
                Arguments.of("First", Set.of(), Set.of(LocationProperty.CHANGING_ROOM.name()), Set.of(), 1),
                // Combine city filter with property filter
                Arguments.of("", Set.of("Budapest"), Set.of(LocationProperty.CAFE.name()), Set.of(), 0),
                // Combine all filters
                Arguments.of("First", Set.of("Budapest"), Set.of(LocationProperty.CHANGING_ROOM.name()), Set.of(), 1),
                // Empty string search (should act like no filter)
                Arguments.of("", Set.of(), Set.of(), Set.of(), 2),
                // Search term with lowercase (testing case sensitivity)
                Arguments.of("sport", Set.of(), Set.of(), Set.of(), 0),
                // Filter by single surface type - TURF
                Arguments.of("", Set.of(), Set.of(), Set.of(PitchSurfaceType.TURF.name()), 1),
                // Filter by single surface type - ARTIFICIAL_GRASS
                Arguments.of("", Set.of(), Set.of(), Set.of(PitchSurfaceType.ARTIFICIAL_GRASS.name()), 1),
                // Filter by single surface type - CONCRETE
                Arguments.of("", Set.of(), Set.of(), Set.of(PitchSurfaceType.CONCRETE.name()), 1),
                // Filter by multiple surface types
                Arguments.of("", Set.of(), Set.of(), Set.of(PitchSurfaceType.TURF.name(), PitchSurfaceType.ARTIFICIAL_GRASS.name()), 1),
                // Filter by non-existent surface type
                Arguments.of("", Set.of(), Set.of(), Set.of(PitchSurfaceType.GRASS.name()), 0),
                // Filter location by city and surface type
                Arguments.of("", Set.of("Eger"), Set.of(), Set.of(PitchSurfaceType.ARTIFICIAL_GRASS.name()), 1),
                // Filter location by property and surface type
                Arguments.of("", Set.of(), Set.of(LocationProperty.CAFE.name()), Set.of(PitchSurfaceType.ARTIFICIAL_GRASS.name()), 1),
                // Combine all filters: term, city, property, and surface type
                Arguments.of("Second", Set.of("Eger"), Set.of(LocationProperty.CAFE.name()), Set.of(PitchSurfaceType.CONCRETE.name()), 1)
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
}
