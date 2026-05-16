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
import com.github.zipcodewilmington.onestomanys.entity.Place;
import com.github.zipcodewilmington.onestomanys.repository.DestinationRepository;

@RestController
@CrossOrigin(origins = "http://localhost:5173")
@RequestMapping("/api/destinations")
public class DestinationController {
    @Autowired
    private DestinationRepository destination;

    @GetMapping
    public List<Destination> getDestinations() {
        return destination.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Destination> getDestinationById(@PathVariable Integer id) {
        return destination.findById(id);
    }

    @GetMapping("/{id}/places")
    public List<Place> getPlaces(@PathVariable Integer id) {
        Destination foundDestination = destination.findById(id).orElse(null);
        if (foundDestination == null) {
            return List.of();
        }
        return foundDestination.getPlaces();
    }

    @PostMapping
    public Destination createDestination(@RequestBody Destination destination) {
        return this.destination.save(destination);
    }

    @PutMapping("/{id}")
    public Destination updateDestination(@PathVariable Integer id, @RequestBody Destination updatedDestination) {
        Destination existingDestination = destination.findById(id).orElse(null);
        if (existingDestination == null) {
            return null;
        }
        existingDestination.setCity(updatedDestination.getCity());
        existingDestination.setCountry(updatedDestination.getCountry());
        existingDestination.setArrivalDate(updatedDestination.getArrivalDate());
        existingDestination.setDepartureDate(updatedDestination.getDepartureDate());
        existingDestination.setBudget(updatedDestination.getBudget());
        existingDestination.setStatus(updatedDestination.getStatus());
        existingDestination.setNotes(updatedDestination.getNotes());
        return destination.save(existingDestination);
    }
    
    @DeleteMapping("/{id}")
    public void deleteDestination(@PathVariable Integer id) {
        destination.deleteById(id);
    }
}
