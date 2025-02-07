package com.example.foodbridge.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.foodbridge.entity.Request;
import com.example.foodbridge.service.RequestService;

@RestController
@RequestMapping("/requests")
@CrossOrigin("*")
public class ReqController {

    @Autowired
    private RequestService requestService;

    // Create a new request
    @PostMapping("/add")
    public ResponseEntity<Request> createRequest(@RequestBody Request request) {
        Request savedRequest = requestService.saveRequest(request);
        return new ResponseEntity<>(savedRequest, HttpStatus.CREATED);
    }

    // Update an existing request
    @PutMapping("/{reqid}")
    public ResponseEntity<Request> updateRequest(@PathVariable int reqid, @RequestBody Request updatedRequest) {
        Request updated = requestService.updateRequest(reqid, updatedRequest);
        return (updated != null) 
            ? new ResponseEntity<>(updated, HttpStatus.OK) 
            : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    // Delete a request by ID
    @DeleteMapping("/{reqid}")
    public ResponseEntity<Void> deleteRequest(@PathVariable int reqid) {
        boolean isDeleted = requestService.deleteRequest(reqid);
        return isDeleted 
            ? new ResponseEntity<>(HttpStatus.NO_CONTENT) 
            : new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    // Get all requests
    @GetMapping("/allrequests")
    public ResponseEntity<List<Request>> getAllRequests() {
        List<Request> requests = requestService.findAllRequests();
        return requests.isEmpty()
            ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
            : new ResponseEntity<>(requests, HttpStatus.OK);
    }

    // Schedule a request
    @PutMapping("/{id}/schedule")
    public ResponseEntity<Request> scheduleRequest(@PathVariable int id) {
        try {
            Request request = requestService.scheduleRequest(id);
            return ResponseEntity.ok(request);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }

    // Complete a request
    @PostMapping("/{id}/complete")
    public ResponseEntity<Request> completeRequest(@PathVariable int id) {
        try {
            Request request = requestService.completeRequest(id);
            return ResponseEntity.ok(request);
        } catch (RuntimeException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
        }
    }
}
