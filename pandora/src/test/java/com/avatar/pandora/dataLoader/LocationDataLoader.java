package com.avatar.pandora.dataLoader;

import com.avatar.pandora.product.models.address.Address;
import com.avatar.pandora.product.models.contact.Contact;
import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationProperty;
import com.avatar.pandora.product.models.pitch.Pitch;
import com.avatar.pandora.product.models.pitch.PitchProperty;
import com.avatar.pandora.product.models.pitch.PitchSurfaceType;
import com.avatar.pandora.product.models.pitch.PitchType;
import com.avatar.pandora.product.repositories.LocationRepository;
import com.avatar.pandora.product.repositories.PitchRepository;
import net.datafaker.Faker;
import org.jspecify.annotations.NonNull;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

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
    @Transactional
    public void run(String @NonNull ... args) {
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
         location.setWebsite(faker.internet().url());
         location.setDescription(faker.lorem().paragraph(1));
         location.setName("First Test Location");
         location.setAddress(address);
         location.setContact(contact);
         location.setGeom(point);
         location.setProperties(Set.of(LocationProperty.SHOWER, LocationProperty.CHANGING_ROOM, LocationProperty.FREE_PARKING));

         Location savedLocation = locationRepository.save(location);

         Pitch pitch = new Pitch();
         pitch.setLocation(savedLocation);
         pitch.setDescription(faker.lorem().paragraph(1));
         pitch.setType(PitchType.FULL_SIZE);
         pitch.setSurfaceType(PitchSurfaceType.TURF);
         pitch.setProperties(Set.of(PitchProperty.COVERED, PitchProperty.LIGHTING));
         pitch.setName("Pitch 1");

         Pitch pitch2 = new Pitch();
         pitch2.setLocation(savedLocation);
         pitch2.setDescription(faker.lorem().paragraph(1));
         pitch2.setType(PitchType.FULL_SIZE);
         pitch2.setSurfaceType(PitchSurfaceType.TURF);
         pitch2.setProperties(Set.of(PitchProperty.COVERED));
         pitch2.setName("Pitch 2");

         pitchRepository.saveAll(Set.of(pitch, pitch2));
     }

    private void addSecondLocation(Faker faker, Address address, Contact contact, Point point) {
         Location location = new Location();
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
