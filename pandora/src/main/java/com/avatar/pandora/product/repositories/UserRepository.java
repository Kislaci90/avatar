package com.avatar.pandora.product.repositories;

import com.avatar.pandora.product.models.user.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends CrudRepository<User, Long> {

    Optional<User> findByEmail(String email);

    boolean existsByEmail(String email);
}