package com.github.zipcodewilmington.onestomanys.entity;

import java.time.LocalDate;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "destinations")
public class Destination {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String city;
    private String country;
    private LocalDate arrivalDate;
    private LocalDate departureDate;
    private double budget;
    private String status;
    private String notes;

    @ManyToOne()
    @JoinColumn(name = "trip_id")
    @JsonBackReference
    private Trip trip;
    @OneToMany(mappedBy = "destination", cascade = CascadeType.ALL)
    private List<Place> places;

    public Destination() {
        
    }

    public Destination(int id, Trip trip, String city, String country, LocalDate arrivalDate, LocalDate departureDate, double budget, String status, String notes) {
        this.id = id;
        this.trip = trip;
        this.city = city;
        this.country = country;
        this.arrivalDate = arrivalDate;
        this.departureDate = departureDate;
        this.budget = budget;
        this.status = status;
        this.notes = notes;
    }

    public int getId() {
        return this.id;
    }

    public Trip getTrip() {
        return this.trip;
    }

    public String getCity() {
        return this.city;
    }

    public String getCountry() {
        return this.country;
    }

    public LocalDate getArrivalDate() {
        return this.arrivalDate;
    }

    public LocalDate getDepartureDate() {
        return this.departureDate;
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

    public List<Place> getPlaces() {
        return this.places;
    }

    public void setId(int id){
        if(id > 0) {
            this.id = id;
        };
    }

    public void setTrip(Trip trip){
        if(trip != null) {
            this.trip = trip;
        };
    }

    public void setCity(String city) {
        if(!city.isEmpty()) {
            this.city = city;
        };
    }

    public void setCountry(String country) {
        if(!country.isEmpty()) {
            this.country = country;
        };
    }

    public void setArrivalDate(LocalDate arrivalDate) {
        if(arrivalDate != null) {
            this.arrivalDate = arrivalDate;
        };
    }

    public void setDepartureDate(LocalDate departureDate) {
        if(departureDate != null) {
            this.departureDate = departureDate;
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

    public void setPlaces(List<Place> places) {
        if(!places.isEmpty()) {
            this.places = places;
        };
    }
}
