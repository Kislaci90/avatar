package com.avatar.pandora.product.specifications;

import com.avatar.pandora.product.models.pitch.Pitch;
import com.avatar.pandora.product.models.pitch.PitchProperty;
import com.avatar.pandora.product.models.pitch.PitchSurfaceType;
import com.avatar.pandora.product.models.pitch.PitchType;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.Root;
import jakarta.persistence.criteria.Subquery;
import org.springframework.data.jpa.domain.PredicateSpecification;

import java.util.Set;

public class PitchSpecification implements Specification {

    private static final Class<Pitch> ENTITY_CLASS = Pitch.class;

    private PitchSpecification() {

    }

    public static PredicateSpecification<Pitch> typeIn(Set<PitchType> types) {
        return in(types, "type");
    }

    public static PredicateSpecification<Pitch> propertiesIn(Set<PitchProperty> properties) {
        return inWithJoin(properties, "properties");
    }

    public static PredicateSpecification<Pitch> surfaceTypeIn(Set<PitchSurfaceType> surfaceTypes) {
        return in(surfaceTypes, "surfaceType");
    }

    public static PredicateSpecification<Pitch> nameContains(String searchTerm) {
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

    private static <S> PredicateSpecification<Pitch> inWithJoin(Set<S> properties, String attributeName) {
        return (from, builder) -> {
            if (properties == null || properties.isEmpty()) {
                return null;
            }

            Subquery<Long> subquery = builder.createQuery().subquery(Long.class);
            Root<Pitch> subRoot = subquery.from(ENTITY_CLASS);
            Join<Pitch, PitchProperty> propertiesJoin = subRoot.join(attributeName);

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

    private static <V> PredicateSpecification<Pitch> in(Set<V> values, String attributeName) {
        return (from, builder) -> {
            if (values == null || values.isEmpty()) {
                return null;
            }
            return builder.in(from.get(attributeName)).value(values);
        };
    }

}
