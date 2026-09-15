package com.fishlog.repository;

import com.fishlog.model.FishCatch;
import com.fishlog.request.CreateCatchRequest;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class CatchRepository {
    private long nextId = 1;

    private final List<FishCatch> catches = new ArrayList<>();

    public List<FishCatch> findAll() {
        return catches;
    }

    public FishCatch createCatch(CreateCatchRequest request) {
        long id = nextId++;

        FishCatch newCatch = new FishCatch(id, request.species(), request.location(), request.date(), request.length());

        catches.add(newCatch);
        return newCatch;
    }
}
