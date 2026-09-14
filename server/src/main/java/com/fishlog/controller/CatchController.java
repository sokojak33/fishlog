package com.fishlog.controller;

import com.fishlog.model.FishCatch;
import com.fishlog.service.CatchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

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
}
