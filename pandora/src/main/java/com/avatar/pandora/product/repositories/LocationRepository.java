package com.avatar.pandora.product.repositories;

import com.avatar.pandora.product.models.location.Location;
import org.jetbrains.annotations.NotNull;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface LocationRepository extends
        CrudRepository<Location, Long>,
        PagingAndSortingRepository<Location,Long> {

    @Query("SELECT l FROM Location l LEFT JOIN FETCH l.pitches fields WHERE l.id = :id")
    Location findLocationById(@Param("id") Long id);

    @NotNull
    @Query("SELECT l FROM Location l LEFT JOIN FETCH l.pitches fields")
    Page<Location> findAll(@NotNull Pageable pageable);

    @NotNull
    @Query("SELECT l FROM Location l LEFT JOIN FETCH l.pitches fields WHERE l.name ILIKE %:name%")
    Page<Location> findByName(@NotNull Pageable pageable, @Param("name") String name);

}
