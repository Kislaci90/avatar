package com.avatar.pandora;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;

@TestConfiguration(proxyBeanMethods = false)
public class TestPandoraApplication {

    public static void main(String[] args) {
        SpringApplication.from(PandoraApplication::main).with(TestPandoraApplication.class).run(args);
    }

}
