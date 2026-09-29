package com.fishlog.repository;

import com.fishlog.model.FishCatch;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CatchRepository extends JpaRepository<FishCatch, Long> {
}
