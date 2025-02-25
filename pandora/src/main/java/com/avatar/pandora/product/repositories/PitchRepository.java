package com.avatar.pandora.product.repositories;

import com.avatar.pandora.product.models.pitch.Pitch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PitchRepository extends JpaRepository<Pitch, Long> {
}
