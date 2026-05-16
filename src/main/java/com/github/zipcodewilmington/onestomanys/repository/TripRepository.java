package com.github.zipcodewilmington.onestomanys.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.github.zipcodewilmington.onestomanys.entity.Trip;

public interface TripRepository extends JpaRepository<Trip, Integer> {
    List<Trip> findAllByOrderByStartDateAsc();
}