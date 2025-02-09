package com.foodbridge.service;

import java.util.Optional; // Correct import for Optional
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // Correct import for BCryptPasswordEncoder
import org.springframework.stereotype.Service;

import com.foodbridge.entity.User;
import com.foodbridge.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    @Autowired
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public boolean validatePassword(User user, String rawPassword) {
        return new BCryptPasswordEncoder().matches(rawPassword, user.getPassword());
    }
}
