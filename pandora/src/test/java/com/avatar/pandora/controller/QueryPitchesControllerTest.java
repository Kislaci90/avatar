package com.avatar.pandora.controller;

import com.avatar.pandora.product.models.location.LocationProperty;
import com.avatar.pandora.product.models.pitch.PitchFilter;
import com.avatar.pandora.product.models.pitch.PitchFilterBuilder;
import com.avatar.pandora.product.models.pitch.PitchView;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.provider.Arguments;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.context.ActiveProfiles;

import java.util.Map;
import java.util.Set;
import java.util.stream.Stream;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
class QueryPitchesControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @Test
    void searchPitches() {
        PitchFilter pitchFilter = PitchFilterBuilder.builder().searchTerm("Test Location").build();

        var locations = httpGraphQlTester.documentName("searchPitches")
                .variable("filter", Map.of("searchTerm", pitchFilter.searchTerm()))
                .variable("offset", 10)
                .variable("count", 0)
                .variable("sort", Map.of("direction", "ASC"))
                .execute()
                .path("data.searchPitches.content")
                .entityList(PitchView.class)
                .get();

        Assertions.assertEquals(1, locations.size());
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
