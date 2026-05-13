package com.github.zipcodewilmington.onestomanys.entity;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "places")
public class Place {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String category;
    private LocalDateTime arrivalTime;
    private LocalDateTime departureTime;
    private double budget;
    private String status;
    private String notes;
    @ManyToOne()
    @JoinColumn(name = "destination_id")
    private Destination destination;

    public Place() {
        
    }

    public Place(int id, String name, Destination destination, String category, LocalDateTime arrivalTime, LocalDateTime departureTime, double budget, String status, String notes) {
        this.id = id;
        this.destination = destination;
        this.name = name;
        this.category = category;
        this.arrivalTime = arrivalTime;
        this.departureTime = departureTime;
        this.budget = budget;
        this.status = status;
        this.notes = notes;
    }

    public int getId() {
        return this.id;
    }

    public Destination getDestination() {
        return this.destination;
    }

    public String getName() {
        return this.name;
    }

    public String getCategory() {
        return this.category;
    }

    public LocalDateTime getArrivalTime() {
        return this.arrivalTime;
    }

    public LocalDateTime getDepartureTime() {
        return this.departureTime;
    }

    public double getBudget() {
        return this.budget;
    }

    public String getStatus() {
        return this.status;
    }

    public String getNotes() {
        return this.notes;
    }

    public void setId(int id){
        if(id > 0) {
            this.id = id;
        };
    }

    public void setDestination(Destination destination){
        if(destination != null) {
            this.destination = destination;
        };
    }

    public void setName(String name) {
        if(!name.isEmpty()) {
            this.name = name;
        };
    }

    public void setCategory(String category) {
        if(!category.isEmpty()) {
            this.category = category;
        };
    }

    public void setArrivalTime(LocalDateTime arrivalTime) {
        if(arrivalTime != null) {
            this.arrivalTime = arrivalTime;
        };
    }

    public void setDepartureTime(LocalDateTime departureTime) {
        if(departureTime != null) {
            this.departureTime = departureTime;
        };
    }

    public void setBudget(double budget) {
        if(budget > 0) {
            this.budget = budget;
        };
    }

    public void setStatus(String status) {
        if(!status.isEmpty()) {
            this.status = status;
        };
    }

    public void setNotes(String notes) {
        if(!notes.isEmpty()) {
            this.notes = notes;
        };
    }
}
