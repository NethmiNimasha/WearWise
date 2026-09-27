package com.wearwise.backend.repositories;

import com.wearwise.backend.models.AppClothing;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ClothingRepository extends JpaRepository<AppClothing, Long> {
}
