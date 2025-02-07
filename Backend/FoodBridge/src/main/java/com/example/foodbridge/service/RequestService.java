package com.example.foodbridge.service;

import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.foodbridge.entity.Request;
import com.example.foodbridge.enums.Status;
import com.example.foodbridge.repository.ReqRepo;

@Service
public class RequestService {
    @Autowired
    private ReqRepo repository;

    // Save a new request
    public Request saveRequest(Request request) {
        return repository.save(request);
    }

    // Update an existing request
    public Request updateRequest(long reqid, Request updatedRequest) {
        Optional<Request> existingRequestOpt = repository.findById(reqid);
        if (existingRequestOpt.isPresent()) {
            Request existingRequest = existingRequestOpt.get();
            existingRequest.setFoodtype(updatedRequest.getFoodtype());
            existingRequest.setFoodname(updatedRequest.getFoodname());
            existingRequest.setQuantity(updatedRequest.getQuantity());
            existingRequest.setDonorname(updatedRequest.getDonorname());
            existingRequest.setDonoradd(updatedRequest.getDonoradd());
            existingRequest.setStatus(updatedRequest.getStatus());
            existingRequest.setDatecompleted(updatedRequest.getDatecompleted());
            return repository.save(existingRequest);
        }
        return null; // Or throw an exception if needed
    }

    // Delete a request by ID
    public boolean deleteRequest(long reqid) {
        Optional<Request> requestOpt = repository.findById(reqid);
        if (requestOpt.isPresent()) {
            repository.delete(requestOpt.get());
            return true;
        }
        return false; // Or throw an exception if needed
    }

    // Get all requests
    public List<Request> findAllRequests() {
        return repository.findAll();
    }

    // Schedule a request
    public Request scheduleRequest(long requestId) {
        Request request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        if (request.getStatus() == Status.AVAILABLE) {
            request.setStatus(Status.SCHEDULED);
            return repository.save(request);
        }
        throw new RuntimeException("Request cannot be scheduled");
    }

    // Mark a request as completed
    public Request completeRequest(long requestId) {
        Request request = repository.findById(requestId)
                .orElseThrow(() -> new RuntimeException("Request not found"));
        request.markCompleted();
        return repository.save(request);
    }
}
