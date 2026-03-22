package com.avatar.pandora.dataLoader;

import com.avatar.pandora.product.models.address.Address;
import com.avatar.pandora.product.models.contact.Contact;
import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationProperty;
import com.avatar.pandora.product.models.location.LocationView;
import com.avatar.pandora.product.models.pitch.Pitch;
import com.avatar.pandora.product.models.pitch.PitchProperty;
import com.avatar.pandora.product.models.pitch.PitchSurfaceType;
import com.avatar.pandora.product.models.pitch.PitchType;
import com.avatar.pandora.product.repositories.LocationRepository;
import com.avatar.pandora.product.repositories.PitchRepository;
import net.datafaker.Faker;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Component
@Profile("test")
public class LocationDataLoader implements CommandLineRunner {

    private final LocationRepository locationRepository;
    private final PitchRepository pitchRepository;

    public LocationDataLoader(LocationRepository locationRepository, PitchRepository pitchRepository) {
        this.locationRepository = locationRepository;
        this.pitchRepository = pitchRepository;
    }

    @Override
    public void run(String... args) {
        var faker = new Faker();
        var address = new Address("Budapest", faker.address().streetAddress(), faker.address().zipCode());
        var contact = new Contact(faker.name().fullName(), faker.phoneNumber().phoneNumber(), faker.internet().emailAddress());
        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
        var point = geometryFactory.createPoint(new Coordinate(Double.parseDouble(faker.address().longitude()), Double.parseDouble(faker.address().latitude())));

        addFirstLocation(faker, address, contact, point);

        contact = new Contact(faker.name().fullName(), faker.phoneNumber().phoneNumber(), faker.internet().emailAddress());
        address = new Address("Eger", faker.address().streetAddress(), faker.address().zipCode());
        point = geometryFactory.createPoint(new Coordinate(Double.parseDouble(faker.address().longitude()), Double.parseDouble(faker.address().latitude())));

        addSecondLocation(faker, address, contact, point);
    }

    private void addFirstLocation(Faker faker, Address address, Contact contact, Point point) {
        Location location = new Location();
        location.setId(1L);
        location.setWebsite(faker.internet().url());
        location.setDescription(faker.lorem().paragraph(1));
        location.setName("First Test Location");
        location.setAddress(address);
        location.setContact(contact);
        location.setGeom(point);
        location.setProperties(Set.of(LocationProperty.SHOWER, LocationProperty.CHANGING_ROOM, LocationProperty.FREE_PARKING));

        locationRepository.save(location);

        Pitch pitch = new Pitch();
        pitch.setId(1L);
        pitch.setLocation(location);
        pitch.setDescription(faker.lorem().paragraph(1));
        pitch.setType(PitchType.FULL_SIZE);
        pitch.setSurfaceType(PitchSurfaceType.TURF);
        pitch.setProperties(Set.of(PitchProperty.COVERED, PitchProperty.LIGHTING));
        pitch.setName("Pitch 1");

        Pitch pitch2 = new Pitch();
        pitch2.setId(2L);
        pitch2.setLocation(location);
        pitch2.setDescription(faker.lorem().paragraph(1));
        pitch2.setType(PitchType.FULL_SIZE);
        pitch2.setSurfaceType(PitchSurfaceType.TURF);
        pitch2.setProperties(Set.of(PitchProperty.COVERED));
        pitch2.setName("Pitch 2");

        pitchRepository.saveAll(Set.of(pitch, pitch2));
    }

    private void addSecondLocation(Faker faker, Address address, Contact contact, Point point) {
        Location location = new Location();
        location.setId(2L);
        location.setWebsite(faker.internet().url());
        location.setDescription(faker.lorem().paragraph(1));
        location.setName("Second Test Location");
        location.setAddress(address);
        location.setContact(contact);
        location.setGeom(point);
        location.setProperties(Set.of(LocationProperty.SHOWER, LocationProperty.CHANGING_ROOM, LocationProperty.FREE_PARKING, LocationProperty.CAFE));

        locationRepository.save(location);
    }

}
