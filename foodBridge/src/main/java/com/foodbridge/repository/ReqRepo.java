package com.foodbridge.repository;


import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.foodbridge.entity.Request;

@Repository

public interface ReqRepo extends JpaRepository<Request, Long> {

    // Find requests by status
    List<Request> findByStatus(String status);

   
}

