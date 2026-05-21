package com.avatar.pandora.catalog.services;

import com.avatar.pandora.user.api.UserServiceApi;
import com.avatar.pandora.catalog.models.HomeStatView;
import com.avatar.pandora.venue.api.LocationServiceApi;
import com.avatar.pandora.venue.api.VenueServiceApi;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HomeService {

    private final LocationServiceApi locationServiceApi;
    private final VenueServiceApi venueServiceApi;
    private final UserServiceApi userServiceApi;

    @Autowired
    public HomeService(LocationServiceApi locationServiceApi, VenueServiceApi venueServiceApi, UserServiceApi userServiceApi) {
        this.locationServiceApi = locationServiceApi;
        this.venueServiceApi = venueServiceApi;
        this.userServiceApi = userServiceApi;
    }

    public HomeStatView getHomeStats() {
        return new HomeStatView(locationServiceApi.countLocations(),
                venueServiceApi.countVenues(),
                locationServiceApi.countCities(),
                userServiceApi.countUsers());
    }
}
