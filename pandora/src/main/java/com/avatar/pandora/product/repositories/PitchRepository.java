package com.avatar.pandora.product.repositories;

import com.avatar.pandora.product.models.pitch.Pitch;
import com.avatar.pandora.product.models.pitch.PitchProperty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
public interface PitchRepository extends JpaRepository<Pitch, Long> {

    @Query("SELECT p FROM Pitch p WHERE p.id = :id")
    Pitch getPitchById(@Param("id") Long id);

    @NotNull
    @Query("""
             SELECT p FROM Pitch p
             LEFT JOIN FETCH p.properties properties
             WHERE (:searchTerm = '' OR p.name LIKE %:searchTerm%)
             AND (:propertiesIsEmpty = TRUE
                        OR :propertySize = (SELECT COUNT(prop)
                                         FROM Pitch p2
                                         JOIN p2.properties prop
                                         WHERE p2.id = p.id AND prop IN (:properties)))
            """)
    Page<Pitch> searchByPitchFiler(@NotNull Pageable pageable,
                                         String searchTerm,
                                         Set<PitchProperty> properties,
                                         Boolean propertiesIsEmpty,
                                         Integer propertySize);
}
