package com.avatar.pandora.product.specifications;

import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationProperty;
import com.avatar.pandora.product.models.pitch.Pitch;
import com.avatar.pandora.product.models.pitch.PitchProperty;
import com.avatar.pandora.product.models.pitch.PitchSurfaceType;
import com.avatar.pandora.product.models.pitch.PitchType;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.PredicateSpecification;

import java.util.Set;

public class LocationSpecification implements Specification {

    private static final Class<Location> ENTITY_CLASS = Location.class;
    private static final String PITCH_TABLE = "pitches";

    private LocationSpecification() {
    }

    public static PredicateSpecification<Location> pitchesSurfaceTypesIn(Set<PitchSurfaceType> set) {
        return in(set, "surfaceType");
    }

    public static PredicateSpecification<Location> pitchesTypesIn(Set<PitchType> set) {
        return in(set, "type");
    }

    public static PredicateSpecification<Location> pitchesPropertiesIn(Set<PitchProperty> set) {
        return in(set, "properties");
    }

    private static <S> PredicateSpecification<Location> in(Set<S> set, String property) {
        return (from, builder) -> {
            if (set == null || set.isEmpty()) {
                return null;
            }
            Subquery<Long> subquery = builder.createQuery().subquery(Long.class);
            Root<Location> subRoot = subquery.from(ENTITY_CLASS);
            Join<Location, Pitch> pitchJoin = subRoot.join(PITCH_TABLE);

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

    public static PredicateSpecification<Location> itHasLocationProperties(Set<LocationProperty> locationProperties) {
        return (from, builder) -> {
            if (locationProperties == null || locationProperties.isEmpty()) {
                return null;
            }

            Subquery<Long> subquery = builder.createQuery().subquery(Long.class);
            Root<Location> subRoot = subquery.from(ENTITY_CLASS);
            Join<Location, LocationProperty> propertiesJoin = subRoot.join("properties");

            subquery.select(subRoot.get("id"))
                    .where(
                            propertiesJoin.in(locationProperties)
                    )
                    .groupBy(subRoot.get("id"))
                    .having(
                            builder.equal(builder.countDistinct(propertiesJoin), (long) locationProperties.size())
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
