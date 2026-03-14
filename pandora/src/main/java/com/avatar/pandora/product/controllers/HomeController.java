package com.avatar.pandora.product.controllers;

import com.avatar.pandora.product.models.stats.HomeStatView;
import com.avatar.pandora.product.services.HomeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/home")
public class HomeController {

    private final HomeService homeService;

    @Autowired
    public HomeController(HomeService homeService) {
        this.homeService = homeService;
    }

    @QueryMapping
    public HomeStatView getHomeStat() {
        return homeService.getHomeStats();
    }

}
