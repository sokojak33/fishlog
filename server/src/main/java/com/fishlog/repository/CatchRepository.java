package com.fishlog.repository;

import com.fishlog.model.FishCatch;

import java.util.List;

import org.springframework.stereotype.Repository;

@Repository
public class CatchRepository {

    private final List<FishCatch> catches = List.of(
            new FishCatch(1L, "Largemouth Bass", "Pewaukee Lake", "2026-08-08", 18.5),
            new FishCatch(2L, "Northern Pike", "Lake Country", "2026-08-03", 21.0));

    public List<FishCatch> findAll() {
        return catches;
    }
}
