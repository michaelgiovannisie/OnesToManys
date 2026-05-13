package com.github.zipcodewilmington.onestomanys.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "trips")
public class Trip {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String title;
    private LocalDate startDate;
    private LocalDate endDate;
    private double budget;
    private String status;
    private String notes;

    @OneToMany(mappedBy = "trip", cascade = CascadeType.ALL)
    @JsonManagedReference
    private List<Destination> destinations;

    public Trip() {
        
    }

    public Trip(int id, String title, LocalDate startDate, LocalDate endDate, double budget, String status, String notes) {
        this.id = id;
        this.title = title;
        this.startDate = startDate;
        this.endDate = endDate;
        this.budget = budget;
        this.status = status;
        this.notes = notes;
    }

    public int getId() {
        return this.id;
    }

    public String getTitle() {
        return this.title;
    }

    public LocalDate getStartDate() {
        return this.startDate;
    }

    public LocalDate getEndDate() {
        return this.endDate;
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

    public List<Destination> getDestinations() {
        return this.destinations;
    }

    public void setId(int id){
        if(id > 0) {
            this.id = id;
        };
    }

    public void setTitle(String title) {
        if(!title.isEmpty()) {
            this.title = title;
        };
    }

    public void setStartDate(LocalDate startDate) {
        if(startDate != null) {
            this.startDate = startDate;
        };
    }

    public void setEndDate(LocalDate endDate) {
        if(endDate != null) {
            this.endDate = endDate;
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

    public void setDestinations(List<Destination> destinations) {
        if(!destinations.isEmpty()) {
            this.destinations = destinations;
        };
    }
}
