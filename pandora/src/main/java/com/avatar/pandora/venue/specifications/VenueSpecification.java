package com.avatar.pandora.venue.specifications;

import com.avatar.pandora.venue.models.venue.*;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.PredicateSpecification;

import java.util.Set;

public class VenueSpecification implements Specification {

    private static final Class<Venue> ENTITY_CLASS = Venue.class;

    private VenueSpecification() {

    }

    public static PredicateSpecification<Venue> typeIn(Set<VenueType> types) {
        return in(types, "type");
    }

    public static PredicateSpecification<Venue> propertiesIn(Set<VenueProperty> properties) {
        return inWithJoin(properties, "properties");
    }

    public static PredicateSpecification<Venue> surfaceTypeIn(Set<VenueSurfaceType> surfaceTypes) {
        return in(surfaceTypes, "surfaceType");
    }

    public static PredicateSpecification<Venue> nameContains(String searchTerm) {
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

    private static <S> PredicateSpecification<Venue> inWithJoin(Set<S> properties, String attributeName) {
        return (from, builder) -> {
            if (properties == null || properties.isEmpty()) {
                return null;
            }

            Subquery<Long> subquery = builder.createQuery().subquery(Long.class);
            Root<Venue> subRoot = subquery.from(ENTITY_CLASS);
            Join<Venue, VenueProperty> propertiesJoin = subRoot.join(attributeName);

            subquery.select(subRoot.get("id"))
                    .where(
                            propertiesJoin.in(properties)
                    )
                    .groupBy(subRoot.get("id"))
                    .having(
                            builder.equal(builder.countDistinct(propertiesJoin), (long) properties.size())
                    );

            return from.get("id").in(subquery);
        };
    }

    private static <V> PredicateSpecification<Venue> in(Set<V> values, String attributeName) {
        return (from, builder) -> {
            if (values == null || values.isEmpty()) {
                return null;
            }
            return builder.in(from.get(attributeName)).value(values);
        };
    }

}
