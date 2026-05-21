package com.avatar.pandora.venue.controllers;

import com.avatar.pandora.venue.models.filter.Filter;
import com.avatar.pandora.venue.models.venue.VenueProperty;
import com.avatar.pandora.venue.models.venue.VenueSort;
import com.avatar.pandora.venue.models.venue.VenueView;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.graphql.test.autoconfigure.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.annotation.DirtiesContext;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Set;
import java.util.stream.Stream;


@SpringBootTest
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Query Pitches Controller Tests")
class QueryVenueControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @ParameterizedTest
    @MethodSource("provideVenuesFilters")
    @DisplayName("Should search venues with various filter combinations")
    void searchVenues(String searchTerm, Set<String> propertiesNames, Integer expected) {
        Filter pitchFilter = Filter.builder()
                .searchTerm(searchTerm)
                .properties(propertiesNames)
                .locationAmenities(Set.of())
                .surfaceTypes(Set.of())
                .venueTypes(Set.of())
                .cities(Set.of())
                .build();

        var venues = httpGraphQlTester.documentName("searchVenues")
                .variable("filter", pitchFilter.getAsMap())
                .variable("offset", 10)
                .variable("count", 0)
                .variable("sort", VenueSort.DISTANCE_ASC.name())
                .execute()
                .path("data.searchVenues.content")
                .entityList(VenueView.class)
                .get();

        Assertions.assertEquals(expected, venues.size());
        if (venues.isEmpty()) return;

        // Validate search term in all results
        if (!searchTerm.isBlank()) {
            Assertions.assertTrue(venues.stream().allMatch(pitch -> pitch.name().toLowerCase().contains(searchTerm.toLowerCase())),
                    "Not all venues contain search term: " + searchTerm);
        }

        // Validate that ALL venues contain ALL filtered amenities
        if (!propertiesNames.isEmpty()) {
            Set<VenueProperty> filterProperties = propertiesNames.stream()
                    .map(VenueProperty::valueOf)
                    .collect(java.util.stream.Collectors.toSet());
            Assertions.assertTrue(venues.stream().allMatch(pitch ->
                            pitch.properties().containsAll(filterProperties)),
                    "Not all venues contain all the filtered amenities");
        }
    }

    private static Stream<Arguments> provideVenuesFilters() {
        return Stream.of(
                // Basic search by pitch name term
                Arguments.of("Pitch 1", Set.of(), 1),
                // Search by non-existent term
                Arguments.of("NonExistent", Set.of(), 0),
                // Filter by single property - COVERED
                Arguments.of("", Set.of(VenueProperty.COVERED.name()), 2),
                // Filter by single property - LIGHTING
                Arguments.of("", Set.of(VenueProperty.LIGHTING.name()), 2),
                // Filter by multiple amenities (AND logic)
                Arguments.of("", Set.of(VenueProperty.COVERED.name(), VenueProperty.LIGHTING.name()), 1),
                // Empty search (should return all venues)
                Arguments.of("", Set.of(), 4),
                // Search term with lowercase
                Arguments.of("pitch", Set.of(), 4),
                // Search with specific pitch number
                Arguments.of("Pitch 1", Set.of(), 1),
                // Search with special characters
                Arguments.of("Pitch #", Set.of(), 0),
                // Combine search term with property filter
                Arguments.of("Pitch", Set.of(VenueProperty.COVERED.name()), 2),
                // Combine search term with another property filter
                Arguments.of("Pitch", Set.of(VenueProperty.LIGHTING.name()), 2),
                // Only one property at a time
                Arguments.of("", Set.of(VenueProperty.LIGHTING.name()), 2)
        );
    }

    @Test
    @DisplayName("Should retrieve venue details by ID")
    void getVenue() {
        VenueView pitchView = httpGraphQlTester.documentName("venueDetails")
                .variable("id", 1L)
                .execute()
                .path("data.getVenue")
                .entity(VenueView.class)
                .get();

        Assertions.assertNotNull(pitchView);
    }

}
