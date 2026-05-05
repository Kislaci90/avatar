package com.avatar.pandora.steps;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.test.tester.GraphQlTester;

public class BaseSteps {

    @Autowired
    protected GraphQlTester graphQlTester;

    public GraphQlTester getGraphQlTester() {
        return graphQlTester;
    }
}

