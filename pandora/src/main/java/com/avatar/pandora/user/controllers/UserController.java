package com.avatar.pandora.user.controllers;

import com.avatar.pandora.user.models.user.UserView;
import com.avatar.pandora.user.services.UserService;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/users")
@RestController
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @QueryMapping
    public UserView getMe() {
        return userService.getMe();
    }
}