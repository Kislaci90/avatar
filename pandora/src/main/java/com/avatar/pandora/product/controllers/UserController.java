package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.user.UserView;
import com.avatar.pandora.product.services.UserService;
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