package com.fishlog.model;

public class FishCatch {

    private Long id;
    private String species;
    private String location;
    private String date;
    private double length;

    public FishCatch(Long id, String species, String location, String date, double length) {
        this.id = id;
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
