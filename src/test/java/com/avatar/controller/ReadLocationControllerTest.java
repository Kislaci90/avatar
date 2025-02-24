package com.avatar.controller;

import com.avatar.exceptions.ApiSubError;
import com.avatar.exceptions.ApiValidationError;
import com.avatar.product.models.field.FieldForm;
import com.avatar.product.models.location.Address;
import com.avatar.product.models.location.LocationForm;
import com.avatar.product.models.location.PointForm;
import com.fasterxml.jackson.databind.ObjectMapper;
import net.datafaker.Faker;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.Arguments;
import org.junit.jupiter.params.provider.MethodSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@Sql(value = {"/init.sql"}, executionPhase = BEFORE_TEST_CLASS)
class ReadLocationControllerTest {

    private static int counter;

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void contextLoads() {
    }

    @ParameterizedTest
    @MethodSource("provideLocationToSave")
    void saveLocation_ShouldBeValidated(String name, Double x, Double y, int status, List<String> fields) throws Exception {
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
    }

    private static Stream<Arguments> provideLocationToSave() {
        var faker = new Faker();
        var fakeAddress = faker.address();
        var streetName = fakeAddress.streetName();
        return Stream.of(
                Arguments.of("", fakeAddress.latitude(), fakeAddress.longitude(), 400, List.of()),
                Arguments.of(fakeAddress.streetName(), null, null, 400, List.of("f1","f2")),
                Arguments.of(streetName, fakeAddress.latitude(), fakeAddress.longitude(), 201, List.of("f1","f2")),
                Arguments.of(streetName, fakeAddress.latitude(), fakeAddress.longitude(), 400, List.of("f1","f2")),
                Arguments.of(fakeAddress.streetName(), fakeAddress.latitude(), fakeAddress.longitude(), 400, List.of("f1","f1"))
        );
    }

    private static ApiSubError createValidationError(String field, String message) {
        return ApiValidationError.builder()
                .object("locationForm")
                .field(field)
                .rejectedValue(null)
                .message(message).build();
    }

}
