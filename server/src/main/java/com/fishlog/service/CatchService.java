package com.fishlog.service;

import com.fishlog.model.FishCatch;
import com.fishlog.repository.CatchRepository;
import com.fishlog.request.CreateCatchRequest;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CatchService {

    private final CatchRepository catchRepository;

    public CatchService(CatchRepository catchRepository) {
        this.catchRepository = catchRepository;
    }

    public List<FishCatch> getAllCatches() {
        return catchRepository.findAll();
    }

    public FishCatch addCatch(CreateCatchRequest request) {
        FishCatch newCatch = new FishCatch(
                request.species(),
                request.location(),
                request.date(),
                request.length());
        return catchRepository.save(newCatch);
    }
}
