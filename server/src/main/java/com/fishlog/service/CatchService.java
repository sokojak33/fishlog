package com.fishlog.service;

import com.fishlog.model.FishCatch;
import com.fishlog.repository.CatchRepository;
import com.fishlog.request.CreateCatchRequest;

import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public Optional<FishCatch> updateCatch(Long id, CreateCatchRequest request) {
        Optional<FishCatch> foundCatch = catchRepository.findById(id);

        if (foundCatch.isEmpty()) {
            return foundCatch;
        }

        FishCatch existingCatch = foundCatch.get();
        existingCatch.update(request.species(), request.location(), request.date(), request.length());

        FishCatch updatedCatch = catchRepository.save(existingCatch);

        return Optional.of(updatedCatch);
    }
}
