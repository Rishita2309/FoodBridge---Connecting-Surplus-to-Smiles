package com.example.foodbridge.entity;

import com.example.foodbridge.enums.FoodType;
import com.example.foodbridge.enums.Status;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name="request")
public class Request {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY) 
    @Column(name="reqid")
    private int reqid;

    @Enumerated(EnumType.STRING)
    @Column(name="foodtype")
    private FoodType foodtype;
    
    @Column(name="foodname")
    private String foodname;

    @Column(name="quantity")
    private int quantity;

    @Column(name="donorname")
    private String donorname;

    @Column(name="donoradd")
    private String donoradd;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name="date_posted")
    private LocalDate dateposted;

    @JsonFormat(pattern = "yyyy-MM-dd")
    @Column(name="date_completed")
    private LocalDate datecompleted; 

    @Enumerated(EnumType.STRING)
    @Column(name="status")
    private Status status; 

    public Request() {}

    public Request(FoodType foodtype, String foodName, int quantity, String donorname, String donoradd) {
        this.foodtype = foodtype;
        this.foodname = foodName;
        this.quantity = quantity;
        this.donorname = donorname;
        this.donoradd = donoradd;
        this.dateposted = LocalDate.now();
        this.status = Status.AVAILABLE;
    }

    @PrePersist
    public void prePersist() {
        this.dateposted = LocalDate.now();
        this.status = Status.AVAILABLE;
    }

    public void markCompleted() {
        if (this.status == Status.SCHEDULED) {
            this.status = Status.COMPLETED;
            this.datecompleted = LocalDate.now();
        }
    }

    // Getters and Setters

    public int getReqid() {
        return reqid;
    }

    public void setReqid(int reqid) {
        this.reqid = reqid;
    }

    public FoodType getFoodtype() {
        return foodtype;
    }

    public void setFoodtype(FoodType foodtype) {
        this.foodtype = foodtype;
    }

    public String getFoodname() {
        return foodname;
        
    }

    public void setFoodname(String foodName) {
        this.foodname = foodName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public String getDonorname() {
        return donorname;
    }

    public void setDonorname(String donorname) {
        this.donorname = donorname;
    }

    public String getDonoradd() {
        return donoradd;
    }

    public void setDonoradd(String donoradd) {
        this.donoradd = donoradd;
    }

    public LocalDate getDateposted() {
        return dateposted;
    }

    public void setDatePosted(LocalDate datePosted) {
        this.dateposted = datePosted;
    }

    public LocalDate getDatecompleted() {
        return datecompleted;
    }

    
    public void setDatecompleted(LocalDate dateCompleted) {
        this.datecompleted = dateCompleted;
    }

    public Status getStatus() {
        return status;
    }

    public void setStatus(Status status) {
        this.status = status;
    }
}
