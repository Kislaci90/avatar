package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.pitch.PitchFilter;
import com.avatar.pandora.product.models.pitch.PitchFilterBuilder;
import com.avatar.pandora.product.models.pitch.PitchProperty;
import com.avatar.pandora.product.models.pitch.PitchView;
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

import java.util.Map;
import java.util.Set;
import java.util.stream.Stream;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Query Pitches Controller Tests")
class QueryPitchesControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @ParameterizedTest
    @MethodSource("providePitchesFilters")
    @DisplayName("Should search pitches with various filter combinations")
    void searchPitches(String searchTerm, Set<String> propertiesNames, Integer expected) {
        PitchFilter pitchFilter = PitchFilterBuilder.builder()
                .searchTerm(searchTerm)
                .properties(propertiesNames)
                .build();

        var pitches = httpGraphQlTester.documentName("searchPitches")
                .variable("filter", pitchFilter.getAsMap())
                .variable("offset", 10)
                .variable("count", 0)
                .variable("sort", Map.of("direction", "ASC"))
                .execute()
                .path("data.searchPitches.content")
                .entityList(PitchView.class)
                .get();

        Assertions.assertEquals(expected, pitches.size());
        if(pitches.isEmpty()) return;
        
        // Validate search term in all results
        if(!searchTerm.isBlank()) {
            Assertions.assertTrue(pitches.stream().allMatch(pitch -> pitch.name().contains(searchTerm)),
                    "Not all pitches contain search term: " + searchTerm);
        }
        
        // Validate that ALL pitches contain ALL filtered properties
        if(!propertiesNames.isEmpty()) {
            Set<PitchProperty> filterProperties = propertiesNames.stream()
                    .map(PitchProperty::valueOf)
                    .collect(java.util.stream.Collectors.toSet());
            Assertions.assertTrue(pitches.stream().allMatch(pitch -> 
                    pitch.properties().containsAll(filterProperties)),
                    "Not all pitches contain all the filtered properties");
        }
    }

    private static Stream<Arguments> providePitchesFilters() {
        return Stream.of(
                // Basic search by pitch name term
                Arguments.of("Pitch 1", Set.of(), 1),
                // Search by non-existent term
                Arguments.of("NonExistent", Set.of(), 0),
                // Filter by single property - COVERED
                Arguments.of("", Set.of(PitchProperty.COVERED.name()), 2),
                // Filter by single property - LIGHTING
                Arguments.of("", Set.of(PitchProperty.LIGHTING.name()), 1),
                // Filter by multiple properties (AND logic)
                Arguments.of("", Set.of(PitchProperty.COVERED.name(), PitchProperty.LIGHTING.name()), 1),
                // Empty search (should return all pitches)
                Arguments.of("", Set.of(), 2),
                // Search term with lowercase
                Arguments.of("pitch", Set.of(), 0),
                // Search with specific pitch number
                Arguments.of("Pitch 1", Set.of(), 1),
                // Search with special characters
                Arguments.of("Pitch #", Set.of(), 0),
                // Combine search term with property filter
                Arguments.of("Pitch", Set.of(PitchProperty.COVERED.name()), 2),
                // Combine search term with another property filter
                Arguments.of("Pitch", Set.of(PitchProperty.LIGHTING.name()), 1),
                // Multiple property filter (different combinations)
                Arguments.of("", Set.of(PitchProperty.COVERED.name()), 2),
                // Only one property at a time
                Arguments.of("", Set.of(PitchProperty.LIGHTING.name()), 1)
        );
    }

    @Test
    @DisplayName("Should retrieve pitch details by ID")
    void getPitch() {
        PitchView pitchView = httpGraphQlTester.documentName("pitchDetails")
                .variable("id", 1L)
                .execute()
                .path("data.getPitch")
                .entity(PitchView.class)
                .get();

        Assertions.assertNotNull(pitchView);
    }

}
