package com.avatar.pandora.dataLoader;

import com.avatar.pandora.product.models.address.Address;
import com.avatar.pandora.product.models.contact.Contact;
import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationProperty;
import com.avatar.pandora.product.repositories.LocationRepository;
import net.datafaker.Faker;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Set;

@Component
public class LocationDataLoader implements CommandLineRunner {

    private final LocationRepository locationRepository;

    public LocationDataLoader(LocationRepository locationRepository) {
        this.locationRepository = locationRepository;
    }

    @Override
    public void run(String... args) {
        var faker = new Faker();
        var address = new Address(faker.address().city(), faker.address().streetAddress(), faker.address().zipCode());
        var contact = new Contact(faker.name().fullName(), faker.phoneNumber().phoneNumber(), faker.internet().emailAddress());
        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
        Point point = geometryFactory.createPoint(new Coordinate(Double.parseDouble(faker.address().longitude()), Double.parseDouble(faker.address().latitude())));

        Location location = new Location();
        location.setId(1L);
        location.setName("Test Location");
        location.setAddress(address);
        location.setContact(contact);
        location.setGeom(point);
        location.setProperties(Set.of(LocationProperty.SHOWER, LocationProperty.CHANGING_ROOM, LocationProperty.FREE_PARKING));

        locationRepository.save(location);
    }
}
