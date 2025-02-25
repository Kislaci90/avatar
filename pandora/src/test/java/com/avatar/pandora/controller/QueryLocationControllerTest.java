package com.avatar.pandora.controller;

import com.avatar.pandora.product.models.location.LocationView;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.graphql.tester.AutoConfigureGraphQlTester;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.graphql.test.tester.GraphQlTester;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.jdbc.Sql;

import static org.springframework.test.context.jdbc.Sql.ExecutionPhase.BEFORE_TEST_CLASS;


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@Sql(value = {"/init.sql"}, executionPhase = BEFORE_TEST_CLASS)
class QueryLocationControllerTest {
    @Autowired
    private GraphQlTester httpGraphQlTester;

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

}
