package com.foodbridge.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.foodbridge.entity.User;
import com.foodbridge.repository.UserRepository;  // Use UserRepository or VolunteerRepository if you have a separate one

import java.util.Optional;

@Service
public class VolunteerService {

    private final UserRepository userRepository;  // Or VolunteerRepository if you have one

    @Autowired
    public VolunteerService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // Example method to get a volunteer by email
    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    // Example method to register a volunteer (user)
    public User registerVolunteer(User user) {
        return userRepository.save(user);
    }

    // Add other business logic specific to volunteers if necessary
}
