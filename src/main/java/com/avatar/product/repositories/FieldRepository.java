package com.avatar.product.repositories;

import com.avatar.product.models.field.Field;
import com.avatar.product.models.location.Location;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FieldRepository extends JpaRepository<Field, Long> {
}
