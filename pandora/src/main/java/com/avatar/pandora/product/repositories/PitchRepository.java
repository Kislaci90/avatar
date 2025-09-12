package com.avatar.pandora.product.repositories;

import com.avatar.pandora.product.models.pitch.Pitch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface PitchRepository extends JpaRepository<Pitch, Long> {

    @Query("SELECT p FROM Pitch p WHERE p.id = :id")
    Pitch getPitchById(@Param("id") Long id);
}
