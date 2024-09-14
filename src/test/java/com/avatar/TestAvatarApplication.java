package com.avatar;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.test.context.TestConfiguration;

@TestConfiguration(proxyBeanMethods = false)
public class TestAvatarApplication {

    public static void main(String[] args) {
        SpringApplication.from(AvatarApplication::main).with(TestAvatarApplication.class).run(args);
    }

}
