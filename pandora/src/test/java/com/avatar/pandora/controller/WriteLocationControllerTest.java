package com.avatar.pandora.controller;

import com.avatar.pandora.product.models.address.AddressForm;
import com.avatar.pandora.product.models.contact.ContactForm;
import com.avatar.pandora.product.models.location.LocationForm;
import com.avatar.pandora.product.models.point.PointForm;
import com.avatar.pandora.product.models.pitch.PitchForm;
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
import org.springframework.test.web.servlet.MockMvc;

import java.util.Set;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
class WriteLocationControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void contextLoads() {
    }

    @ParameterizedTest
    @MethodSource("provideLocationToSave")
    void saveLocation_ShouldBeValidated(int status,
                                        String name,
                                        AddressForm addressForm,
                                        ContactForm contactForm,
                                        PointForm pointForm,
                                        Set<String> fields) throws Exception {

        LocationForm lf = new LocationForm();
        lf.setName(name);
        lf.setAddressForm(addressForm);
        lf.setContactForm(contactForm);
        lf.setPointForm(pointForm);
        lf.setPitchForms(fields.stream().map(f -> {
            PitchForm ff = new PitchForm();
            ff.setName(f);
            return ff;
        }).collect(Collectors.toSet()));

        var post = post("/location")
                .contentType(MediaType.APPLICATION_JSON_VALUE)
                .content(objectMapper.writeValueAsString(lf));

        this.mockMvc.perform(post)
                .andDo(print())
                .andExpect(status().is(status))
                .andReturn();
    }

    private static Stream<Arguments> provideLocationToSave() {
        var faker = new Faker();
        var addressForm = new AddressForm(faker.address().city(), faker.address().streetAddress(), faker.address().zipCode());
        var contactForm = new ContactForm(faker.name().fullName(), faker.phoneNumber().phoneNumber(), faker.internet().emailAddress());
        var pointForm = new PointForm(Double.valueOf(faker.address().longitude()), Double.valueOf(faker.address().latitude()));

        return Stream.of(
                Arguments.of(200, faker.funnyName().name(), addressForm, contactForm, pointForm, Set.of("f1","f2")),

                Arguments.of(400, null, addressForm, contactForm, pointForm, Set.of()),
                Arguments.of(400, faker.funnyName().name(), null, contactForm, pointForm, Set.of("f1","f2")),
                Arguments.of(400, faker.funnyName().name(), addressForm, null, pointForm, Set.of("f1","f2")),
                Arguments.of(400, faker.funnyName().name(), addressForm, contactForm, null, Set.of("f1","f2")),
                Arguments.of(400, faker.funnyName().name(), addressForm, contactForm, pointForm, Set.of())
        );
    }
}
