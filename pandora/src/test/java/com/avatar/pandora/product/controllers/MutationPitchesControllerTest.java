package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.pitch.PitchProperty;
import com.avatar.pandora.product.models.pitch.PitchSurfaceType;
import com.avatar.pandora.product.models.pitch.PitchType;
import com.avatar.pandora.product.models.pitch.PitchView;
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

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Mutation Pitches Controller Tests")
class MutationPitchesControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    private Map<String, Object> buildPitchInput(String name, String description, String pitchType,
                                                 String surfaceType, List<String> properties, long locationId) {
        Map<String, Object> input = new HashMap<>();
        input.put("name", name);
        input.put("description", description);
        input.put("pitchType", pitchType);
        input.put("surfaceType", surfaceType);
        input.put("properties", properties);
        input.put("locationId", locationId);
        return input;
    }

    @Test
    @DisplayName("Should create a new pitch for an existing location")
    void createPitch() {
        Map<String, Object> input = buildPitchInput(
                "New Test Pitch",
                "A brand new pitch for testing",
                PitchType.FIVE_A_SIDE.name(),
                PitchSurfaceType.GRASS.name(),
                List.of(PitchProperty.LIGHTING.name()),
                1L
        );

        PitchView created = httpGraphQlTester.documentName("createPitch")
                .variable("pitchInput", input)
                .execute()
                .path("data.createPitch")
                .entity(PitchView.class)
                .get();

        assertNotNull(created);
        assertNotNull(created.id());
        assertEquals("New Test Pitch", created.name());
        assertEquals("A brand new pitch for testing", created.description());
        assertEquals(PitchType.FIVE_A_SIDE, created.pitchType());
        assertEquals(PitchSurfaceType.GRASS, created.surfaceType());
        assertTrue(created.properties().contains(PitchProperty.LIGHTING));
        assertNotNull(created.location());
        assertEquals(1L, created.location().id());
    }

    @Test
    @DisplayName("Should update an existing pitch")
    void updatePitch() {
        Map<String, Object> input = buildPitchInput(
                "Updated Pitch Name",
                "Updated description",
                PitchType.SEVEN_A_SIDE.name(),
                PitchSurfaceType.ARTIFICIAL_GRASS.name(),
                List.of(PitchProperty.COVERED.name()),
                1L
        );

        PitchView updated = httpGraphQlTester.documentName("updatePitch")
                .variable("id", 1)
                .variable("pitchInput", input)
                .execute()
                .path("data.updatePitch")
                .entity(PitchView.class)
                .get();

        assertNotNull(updated);
        assertEquals(1L, updated.id());
        assertEquals("Updated Pitch Name", updated.name());
        assertEquals("Updated description", updated.description());
        assertEquals(PitchType.SEVEN_A_SIDE, updated.pitchType());
        assertEquals(PitchSurfaceType.ARTIFICIAL_GRASS, updated.surfaceType());
        assertTrue(updated.properties().contains(PitchProperty.COVERED));
    }

    @Test
    @DisplayName("Should delete an existing pitch")
    void deletePitch() {
        Boolean result = httpGraphQlTester.documentName("deletePitch")
                .variable("id", 1)
                .execute()
                .path("data.deletePitch")
                .entity(Boolean.class)
                .get();

        assertTrue(result);

        httpGraphQlTester.documentName("pitchDetails")
                .variable("id", 1)
                .execute()
                .errors()
                .satisfy(errors -> assertFalse(errors.isEmpty(), "Deleted pitch should no longer be accessible"));
    }

    @Test
    @DisplayName("Should create a pitch with no properties")
    void createPitchWithNoProperties() {
        Map<String, Object> input = buildPitchInput(
                "Minimal Pitch",
                "A pitch with no special properties",
                PitchType.INDOOR.name(),
                PitchSurfaceType.HARDCOURT.name(),
                List.of(),
                1L
        );

        PitchView created = httpGraphQlTester.documentName("createPitch")
                .variable("pitchInput", input)
                .execute()
                .path("data.createPitch")
                .entity(PitchView.class)
                .get();

        assertNotNull(created);
        assertEquals("Minimal Pitch", created.name());
        assertTrue(created.properties().isEmpty());
    }
}
