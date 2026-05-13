package com.github.zipcodewilmington.onestomanys.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.github.zipcodewilmington.onestomanys.entity.Place;
import com.github.zipcodewilmington.onestomanys.repository.PlaceRepository;

@RestController
@RequestMapping("/api/places")
public class PlaceController {
    @Autowired
    private PlaceRepository place;

    @GetMapping
    public List<Place> getPlaces() {
        return place.findAll();
    }

    @GetMapping("/{id}")
    public Optional<Place> getPlaceById(@PathVariable Integer id) {
        return place.findById(id);
    }

    @PostMapping
    public Place createPlace(@RequestBody Place place) {
        return this.place.save(place);
    }

    @PutMapping("/{id}")
    public Place updatePlace(@PathVariable Integer id, @RequestBody Place updatedPlace) {
        Place existingPlace = place.findById(id).orElse(null);
        if (existingPlace == null) {
            return null;
        }
        existingPlace.setName(updatedPlace.getName());
        existingPlace.setCategory(updatedPlace.getCategory());
        existingPlace.setArrivalTime(updatedPlace.getArrivalTime());
        existingPlace.setDepartureTime(updatedPlace.getDepartureTime());
        existingPlace.setBudget(updatedPlace.getBudget());
        existingPlace.setStatus(updatedPlace.getStatus());
        existingPlace.setNotes(updatedPlace.getNotes());
        return place.save(existingPlace);
    }
    
    @DeleteMapping("/{id}")
    public void deletePlace(@PathVariable Integer id) {
        place.deleteById(id);
    }
}
