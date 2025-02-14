package com.foodbridge.repository;

import java.util.Optional;  // Correct import for Optional
import org.springframework.data.jpa.repository.JpaRepository;
import com.foodbridge.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
}
