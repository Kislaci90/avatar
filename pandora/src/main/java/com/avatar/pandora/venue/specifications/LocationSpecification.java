package com.avatar.pandora.venue.specifications;

import com.avatar.pandora.venue.models.location.Location;
import com.avatar.pandora.venue.models.location.LocationAmenity;
import com.avatar.pandora.venue.models.venue.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.PredicateSpecification;

import java.util.Set;

public class LocationSpecification implements Specification {

    private static final Class<Location> ENTITY_CLASS = Location.class;
    private static final String VENUE_TABLE = "venues";

    private LocationSpecification() {
    }

    public static PredicateSpecification<Location> pitchesSurfaceTypesIn(Set<VenueSurfaceType> set) {
        return in(set, "surfaceType");
    }

    public static PredicateSpecification<Location> pitchesTypesIn(Set<VenueType> set) {
        return in(set, "type");
    }

    public static PredicateSpecification<Location> pitchesPropertiesIn(Set<VenueProperty> set) {
        return in(set, "amenities");
    }

    private static <S> PredicateSpecification<Location> in(Set<S> set, String property) {
        return (from, builder) -> {
            if (set == null || set.isEmpty()) {
                return null;
            }
            Subquery<Long> subquery = builder.createQuery().subquery(Long.class);
            Root<Location> subRoot = subquery.from(ENTITY_CLASS);
            Join<Location, Venue> pitchJoin = subRoot.join(VENUE_TABLE);

            subquery.select(subRoot.get("id"))
                    .where(
                            pitchJoin.get(property).in(set)
                    )
                    .groupBy(subRoot.get("id"));

            return from.get("id").in(subquery);
        };
    }

    public static PredicateSpecification<Location> nameContains(String searchTerm) {
        return (from, builder) -> {
            if (searchTerm == null || searchTerm.isBlank()) {
                return null;
            }
            return builder.like(
                    builder.lower(from.get("name")),
                    "%" + searchTerm.toLowerCase() + "%"
            );
        };
    }

    public static PredicateSpecification<Location> itHasLocationProperties(Set<LocationAmenity> locationAmenities) {
        return (from, builder) -> {
            if (locationAmenities == null || locationAmenities.isEmpty()) {
                return null;
            }

            Subquery<Long> subquery = builder.createQuery().subquery(Long.class);
            Root<Location> subRoot = subquery.from(ENTITY_CLASS);
            Join<Location, LocationAmenity> propertiesJoin = subRoot.join("amenities");

            subquery.select(subRoot.get("id"))
                    .where(
                            propertiesJoin.in(locationAmenities)
                    )
                    .groupBy(subRoot.get("id"))
                    .having(
                            builder.equal(builder.countDistinct(propertiesJoin), (long) locationAmenities.size())
                    );

            return from.get("id").in(subquery);
        };
    }

    public static PredicateSpecification<Location> inCities(Set<String> cities) {
        return (from, builder) -> {
            if (cities == null || cities.isEmpty()) {
                return null;
            }
            return from.get("address").get("city").in(cities);
        };
    }
}
