package com.fishlog.controller;

import com.fishlog.model.FishCatch;
import com.fishlog.request.CreateCatchRequest;
import com.fishlog.service.CatchService;

import org.apache.catalina.connector.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/catches")
public class CatchController {

    private final CatchService catchService;

    public CatchController(CatchService catchService) {
        this.catchService = catchService;
    }

    @GetMapping
    public List<FishCatch> getAllCatches() {
        return catchService.getAllCatches();
    }

    @PostMapping
    public FishCatch addCatch(@RequestBody CreateCatchRequest request) {
        return catchService.addCatch(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FishCatch> updateCatch(@PathVariable Long id, @RequestBody CreateCatchRequest request) {

        Optional<FishCatch> updatedCatch = catchService.updateCatch(id, request);

        if (updatedCatch.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(updatedCatch.get());
    }
}
