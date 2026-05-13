package com.github.zipcodewilmington.onestomanys.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.zipcodewilmington.onestomanys.entity.Destination;
import com.github.zipcodewilmington.onestomanys.entity.Trip;
import com.github.zipcodewilmington.onestomanys.repository.TripRepository;

@RestController
@RequestMapping("/api/trips")
public class TripController {
    @Autowired
    private TripRepository trip;

    @GetMapping
    public List<Trip> getTrips() {
        return trip.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Trip> getTripById(@PathVariable Integer id) {
        return trip.findById(id);
    }

    @GetMapping("/{id}/destinations")
    public List<Destination> getTrip(@PathVariable Integer id) {
        Trip foundTrip = trip.findById(id).orElse(null);
        if (foundTrip == null) {
            return List.of();
        }
        return foundTrip.getDestinations();
    }
}
