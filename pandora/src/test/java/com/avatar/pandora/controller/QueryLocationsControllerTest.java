package com.avatar.pandora.controller;

import com.avatar.pandora.product.models.location.*;
import graphql.com.google.common.collect.Sets;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.context.ActiveProfiles;

import java.util.Set;
import java.util.stream.Stream;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
class QueryLocationsControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @ParameterizedTest
    @MethodSource("provideLocationFilters")
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
        if(!searchTerm.isBlank()) {
            Assertions.assertTrue(locations.getFirst().name().contains(searchTerm));
        }
        if(!cities.isEmpty()) {
            Assertions.assertTrue(cities.contains(locations.getFirst().address().getCity()));
        }
        if(!locationProperties.isEmpty()) {
            Assertions.assertFalse(Sets.intersection(locationProperties, locations.getFirst().properties()).isEmpty());
        }
    }

    private static Stream<Arguments> provideLocationFilters() {
        return Stream.of(
                Arguments.of("First", Set.of(), Set.of(), 1),
                Arguments.of("", Set.of("Budapest"), Set.of(), 1),
                Arguments.of("", Set.of(), Set.of(LocationProperty.CAFE.name(), LocationProperty.CHANGING_ROOM.name()), 1),
                Arguments.of("", Set.of(), Set.of(LocationProperty.CHANGING_ROOM.name()), 2)
        );
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
