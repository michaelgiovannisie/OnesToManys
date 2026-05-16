package com.github.zipcodewilmington.onestomanys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.zipcodewilmington.onestomanys.entity.Place;

public interface PlaceRepository extends JpaRepository<Place, Integer> {
    List<Place> findByDestinationIdOrderByArrivalTimeAsc(Integer destinationId);
}