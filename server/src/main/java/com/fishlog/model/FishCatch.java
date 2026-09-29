package com.fishlog.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class FishCatch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String species;
    private String location;
    private String date;
    private double length;

    protected FishCatch() {
    }

    public FishCatch(String species, String location, String date, double length) {
        this.species = species;
        this.location = location;
        this.date = date;
        this.length = length;
    }

    public Long getId() {
        return id;
    }

    public String getSpecies() {
        return species;
    }

    public String getLocation() {
        return location;
    }

    public String getDate() {
        return date;
    }

    public double getLength() {
        return length;
    }
}
