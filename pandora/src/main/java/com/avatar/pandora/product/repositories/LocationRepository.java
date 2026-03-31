package com.avatar.pandora.product.repositories;

import com.avatar.pandora.product.models.location.Location;
import com.avatar.pandora.product.models.location.LocationProperty;
import jakarta.validation.constraints.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Set;

@Repository
public interface LocationRepository extends
        CrudRepository<Location, Long>,
        PagingAndSortingRepository<Location, Long> {

    @Query("SELECT l FROM Location l LEFT JOIN FETCH l.pitches fields WHERE l.id = :id")
    Location findLocationById(@Param("id") Long id);

    @NotNull
    @Query(value = """
             SELECT l FROM Location l
             LEFT JOIN FETCH l.pitches fields
             LEFT JOIN FETCH l.properties properties
             WHERE (:searchTerm = '' OR l.name LIKE %:searchTerm%)
             AND (:citiesIsEmpty = TRUE OR l.address.city IN (:cities))
             AND (:locationPropertiesIsEmpty = TRUE
                        OR :locationPropertySize = (SELECT COUNT(p)
                                         FROM Location l2
                                         JOIN l2.properties p
                                         WHERE l2 = l AND p IN (:locationProperties)))
            """,
            countQuery = """
             SELECT COUNT(DISTINCT l) FROM Location l
             LEFT JOIN l.pitches fields
             LEFT JOIN l.properties properties
             WHERE (:searchTerm = '' OR l.name LIKE %:searchTerm%)
             AND (:citiesIsEmpty = TRUE OR l.address.city IN (:cities))
             AND (:locationPropertiesIsEmpty = TRUE
                        OR :locationPropertySize = (SELECT COUNT(p)
                                         FROM Location l2
                                         JOIN l2.properties p
                                         WHERE l2 = l AND p IN (:locationProperties)))
            """
    )
    Page<Location> searchByLocationFilter(@NotNull Pageable pageable,
                                          String searchTerm,
                                          Set<String> cities,
                                          Boolean citiesIsEmpty,
                                          Set<LocationProperty> locationProperties,
                                          Boolean locationPropertiesIsEmpty,
                                          Integer locationPropertySize);

    @Query("""
       SELECT COUNT(DISTINCT l.address.city) FROM Location l
       """)
    Long countDistinctCities();

    @Query("""
       SELECT DISTINCT l.address.city FROM Location l ORDER BY l.address.city ASC
       """)
    List<String> getDistinctCities();
}
