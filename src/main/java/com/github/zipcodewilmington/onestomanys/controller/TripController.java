package com.github.zipcodewilmington.onestomanys.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.zipcodewilmington.onestomanys.entity.Destination;
import com.github.zipcodewilmington.onestomanys.entity.Trip;
import com.github.zipcodewilmington.onestomanys.repository.TripRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/trips")
public class TripController {
    @Autowired
    private TripRepository trip;

    @GetMapping
    public List<Trip> getTrips() {
        return trip.findAllByOrderByStartDateAsc();
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

    @PostMapping
    public Trip createTrip(@RequestBody Trip trip) {
        return this.trip.save(trip);
    }

    @PutMapping("/{id}")
    public Trip updateTrip(@PathVariable Integer id, @RequestBody Trip updatedTrip) {
        Trip existingTrip = trip.findById(id).orElse(null);
        if (existingTrip == null) {
            return null;
        }
        existingTrip.setTitle(updatedTrip.getTitle());
        existingTrip.setStartDate(updatedTrip.getStartDate());
        existingTrip.setEndDate(updatedTrip.getEndDate());
        existingTrip.setBudget(updatedTrip.getBudget());
        existingTrip.setStatus(updatedTrip.getStatus());
        existingTrip.setNotes(updatedTrip.getNotes());
        return trip.save(existingTrip);
    }

    @DeleteMapping("/{id}")
    public void deleteTrip(@PathVariable Integer id) {
        trip.deleteById(id);
    }
}
