package com.foodbridge.controller;

import com.foodbridge.entity.User;
import com.foodbridge.entity.LoginRequest;
import com.foodbridge.service.UserService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
//@CrossOrigin(origins = "http://localhost:3000") // Adjust according to your frontend URL
@CrossOrigin("*")
public class AuthController {
	

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public AuthController(UserService userService, PasswordEncoder passwordEncoder) {
        this.userService = userService;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody LoginRequest loginRequest) {
        // Directly using LoginRequest for login data
        Optional<User> userOptional = userService.findByEmail(loginRequest.getEmail());

        if (userOptional.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found. Please register.");
        }

        User user = userOptional.get();

        // Check if password is correct
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid email or password.");
        }

        return ResponseEntity.ok(user);  // You can send user info, or implement JWT
    }
}