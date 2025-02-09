package com.foodbridge.controller;

import com.foodbridge.entity.User;
import com.foodbridge.enums.UserRole;
import com.foodbridge.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/users")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    // Register a new user (either donor or volunteer)
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {

        // Validate required fields (name, email, password, and role)
        if (user.getName() == null || user.getName().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Name field cannot be empty");
        }
        if (user.getEmail() == null || user.getEmail().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email field cannot be empty");
        }
        if (user.getPassword() == null || user.getPassword().trim().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Password field cannot be empty");
        }
        if (user.getRole() == null) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Role is required");
        }

        // Convert role string to UserRole enum
        try {
            UserRole userRole = UserRole.valueOf(user.getRole().name().toUpperCase());
            user.setRole(userRole);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid role. Must be 'VOLUNTEER' or 'DONOR'");
        }

        // Check if the email is already registered
        if (userService.findByEmail(user.getEmail()).isPresent()) {
            return new ResponseEntity<>("Email already exists. Please choose another.", HttpStatus.CONFLICT);
        }

        // Proceed to register the user
        User savedUser = userService.registerUser(user);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    // Get user by email (for login or profile purposes)
    @GetMapping("/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        return userService.findByEmail(email)
                .map(user -> new ResponseEntity<>(user, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }
}
