package com.avatar.pandora.product.repositories;

import com.avatar.pandora.product.models.location.Location;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface LocationRepository extends
        CrudRepository<Location, Long>,
        PagingAndSortingRepository<Location, Long>,
        JpaSpecificationExecutor<Location> {

    @Query("SELECT l FROM Location l LEFT JOIN FETCH l.pitches fields WHERE l.id = :id")
    Location findLocationById(@Param("id") Long id);


    @Query("""
       SELECT COUNT(DISTINCT l.address.city) FROM Location l
       """)
    Long countDistinctCities();

    @Query("""
       SELECT DISTINCT l.address.city FROM Location l ORDER BY l.address.city ASC
       """)
    List<String> getDistinctCities();
}
