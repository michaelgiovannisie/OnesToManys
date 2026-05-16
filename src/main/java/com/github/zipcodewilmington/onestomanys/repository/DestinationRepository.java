package com.github.zipcodewilmington.onestomanys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.zipcodewilmington.onestomanys.entity.Destination;

public interface  DestinationRepository extends JpaRepository<Destination, Integer>{
    List<Destination> findByTripIdOrderByArrivalDateAsc(Integer tripId);
}
