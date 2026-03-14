package com.avatar.pandora.product.services;

import com.avatar.pandora.product.models.stats.HomeStatView;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeService {

    private final LocationService locationService;
    private final PitchService pitchService;
    private final UserService userService;

    @Autowired
    public HomeService(LocationService locationService, PitchService pitchService, UserService userService) {
        this.locationService = locationService;
        this.pitchService = pitchService;
        this.userService = userService;
    }

    public HomeStatView getHomeStats() {
        return new HomeStatView(locationService.countLocations(),
                pitchService.countPitches(),
                locationService.countCities(),
                userService.countUsers());
    }
}
