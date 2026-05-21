package com.avatar.pandora.venue.repositories;

import com.avatar.pandora.venue.models.venue.Venue;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface VenueRepository extends JpaRepository<Venue, Long>, JpaSpecificationExecutor<Venue> {

    @Query("SELECT p FROM Venue p WHERE p.id = :id")
    Venue getVenueById(@Param("id") Long id);
}
