package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.stats.HomeStatView;
import org.junit.jupiter.api.Assertions;
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


@SpringBootTest
@AutoConfigureMockMvc
@AutoConfigureGraphQlTester
@ActiveProfiles("test")
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
@Transactional
@DisplayName("Home Controller Tests")
public class HomeControllerTest {

    @Autowired
    private GraphQlTester httpGraphQlTester;

    @Test
    @DisplayName("Should return correct home statistics with location, pitch, and city counts")
    void getHomeStat() {
        var homeStat = httpGraphQlTester.documentName("getHomeStat")
                .execute()
                .path("data.getHomeStat")
                .entity(HomeStatView.class)
                .get();

        Assertions.assertNotNull(homeStat);
        Assertions.assertEquals(2, homeStat.totalLocations());
        Assertions.assertEquals(2, homeStat.totalPitches());
        Assertions.assertEquals(2, homeStat.totalCities());
        Assertions.assertEquals(0, homeStat.totalUsers());
    }

}
