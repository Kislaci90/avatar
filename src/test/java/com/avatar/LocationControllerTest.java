package com.avatar;

import com.avatar.exceptions.ApiSubError;
import com.avatar.exceptions.ApiValidationError;
import com.avatar.product.models.field.FieldForm;
import com.avatar.product.models.location.Address;
import com.avatar.product.models.location.LocationForm;
import com.avatar.product.models.location.LocationView;
import com.avatar.product.models.location.PointForm;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;
import java.util.concurrent.ThreadLocalRandom;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@Sql(value = {"/locations.sql"}, executionPhase = BEFORE_TEST_CLASS)
class LocationControllerTest {

    private static int counter;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @Test
    void contextLoads() {
    }

    @Test
    void getLocations() throws Exception {
        var locations = httpGraphQlTester.document("""
                            { locations(count:0, offset: 10, name: "%s") { content { id name geom { x y } } } }
                            """.formatted("Test"))
                .execute()
                .path("data.locations.content[*]")
                .entityList(LocationView.class)
                .get();

        Assertions.assertEquals(2, locations.size());
    }

    @Test
    void getLocation() throws Exception {
        LocationView location = httpGraphQlTester.document("""
                        { location(id: %s) { id name geom { x y } } }
                        """.formatted(1))
                .execute()
                .path("data.location")
                .entity(LocationView.class)
                .get();

        Assertions.assertNotNull(location);
        Assertions.assertEquals("Pre Test Location", location.name());
    }

    @ParameterizedTest
    @MethodSource("provideLocationToSave")
    void saveLocation_ShouldBeValidated(String name, Double x, Double y, int status, List<String> fields, List<? extends ApiSubError> errors) throws Exception {
        var address = new Address("Budapest", "Test utca", "1111");

        LocationForm lf = new LocationForm();
        lf.setName(name);
        lf.setAddress(address);
        lf.setGeom(new PointForm(x,y));
        lf.setFields(fields.stream().map(f -> {
            FieldForm ff = new FieldForm();
            ff.setName(f);
            return ff;
        }).collect(Collectors.toList()));

        var post = post("/location")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(lf));

        MvcResult mvcResult = this.mockMvc.perform(post)
                .andDo(print())
                .andExpect(status().is(status))
                .andReturn();

        //var response = objectMapper.readValue(mvcResult.getResponse().getContentAsString(), ApiError.class);
        //Assertions.assertIterableEquals(errors, response.getSubErrors());
    }

    private static Stream<Arguments> provideLocationToSave() {
        var x = ThreadLocalRandom.current().nextDouble(-180, 180);
        var y = ThreadLocalRandom.current().nextDouble(-180, 180);
        return Stream.of(
                Arguments.of("", x, y, 400, List.of(), List.of(createValidationError("name", "must not be blank"))),
                Arguments.of("Test location", null, null, 400, List.of("f1","f2"), List.of(createValidationError("geom.y", "must not be blank"), createValidationError("geom.x", "must not be blank"))),
                Arguments.of("Test location", x, y, 201, List.of("f1","f2"), List.of()),
                Arguments.of("Test location", x, y, 400, List.of("f1","f2"), List.of()),
                Arguments.of("Test location 2", x, y, 400, List.of("f1","f1"), List.of(createValidationError("fields", "must only contain unique elements")))
        );
    }

    private static ApiSubError createValidationError(String field, String message) {
        return ApiValidationError.builder()
                .object("locationForm")
                .field(field)
                .rejectedValue("")
                .message(message).build();
    }

}
