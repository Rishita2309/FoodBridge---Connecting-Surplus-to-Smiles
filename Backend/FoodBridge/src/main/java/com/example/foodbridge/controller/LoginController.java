package com.example.foodbridge.controller;

import com.example.foodbridge.entity.User;
import com.example.foodbridge.service.VolunteerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin("*") 
public class LoginController {

    private final VolunteerService volunteerService;

    @Autowired
    public LoginController(VolunteerService volunteerService) {
        this.volunteerService = volunteerService;
    }

    // Example endpoint to get a volunteer by email
    @GetMapping("/login")
    public String login(@RequestParam String email) {
        // Try to find the volunteer (user) by email
        User user = volunteerService.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // Here you can add logic for further authentication if needed
        return "Logged in as: " + user.getName();
    }
}
