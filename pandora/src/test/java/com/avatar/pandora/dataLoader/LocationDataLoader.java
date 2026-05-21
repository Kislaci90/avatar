package com.avatar.pandora.dataLoader;

import com.avatar.pandora.venue.models.address.Address;
import com.avatar.pandora.venue.models.contact.Contact;
import com.avatar.pandora.venue.models.location.Location;
import com.avatar.pandora.venue.models.location.LocationAmenity;
import com.avatar.pandora.venue.models.venue.*;
import com.avatar.pandora.venue.repositories.LocationRepository;
import com.avatar.pandora.venue.repositories.VenueRepository;
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
    private final VenueRepository venueRepository;

    public LocationDataLoader(LocationRepository locationRepository, VenueRepository venueRepository) {
        this.locationRepository = locationRepository;
        this.venueRepository = venueRepository;
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
         location.setAmenities(Set.of(LocationAmenity.SHOWER, LocationAmenity.CHANGING_ROOM, LocationAmenity.FREE_PARKING));

         Location savedLocation = locationRepository.save(location);

         Venue venue = new Venue();
         venue.setLocation(savedLocation);
         venue.setDescription(faker.lorem().paragraph(1));
         venue.setType(VenueType.FULL_SIZE);
         venue.setSurfaceType(VenueSurfaceType.TURF);
         venue.setProperties(Set.of(VenueProperty.COVERED, VenueProperty.LIGHTING));
         venue.setName("Pitch 1");

         Venue venue2 = new Venue();
         venue2.setLocation(savedLocation);
         venue2.setDescription(faker.lorem().paragraph(1));
         venue2.setType(VenueType.FULL_SIZE);
         venue2.setSurfaceType(VenueSurfaceType.TURF);
         venue2.setProperties(Set.of(VenueProperty.COVERED));
         venue2.setName("Pitch 2");

         venueRepository.saveAll(Set.of(venue, venue2));
     }

    private void addSecondLocation(Faker faker, Address address, Contact contact, Point point) {
         Location location = new Location();
         location.setWebsite(faker.internet().url());
         location.setDescription(faker.lorem().paragraph(1));
         location.setName("Second Test Location");
         location.setAddress(address);
         location.setContact(contact);
         location.setGeom(point);
         location.setAmenities(Set.of(LocationAmenity.SHOWER, LocationAmenity.CHANGING_ROOM, LocationAmenity.FREE_PARKING, LocationAmenity.CAFE));

         Location savedLocation = locationRepository.save(location);

         Venue venue3 = new Venue();
         venue3.setLocation(savedLocation);
         venue3.setDescription(faker.lorem().paragraph(1));
         venue3.setType(VenueType.HALF_SIZE);
         venue3.setSurfaceType(VenueSurfaceType.ARTIFICIAL_GRASS);
         venue3.setProperties(Set.of(VenueProperty.LIGHTING));
         venue3.setName("Pitch 3");

         Venue venue4 = new Venue();
         venue4.setLocation(savedLocation);
         venue4.setDescription(faker.lorem().paragraph(1));
         venue4.setType(VenueType.FULL_SIZE);
         venue4.setSurfaceType(VenueSurfaceType.CONCRETE);
         venue4.setProperties(Set.of());
         venue4.setName("Pitch 4");

         venueRepository.saveAll(Set.of(venue3, venue4));
    }

}
