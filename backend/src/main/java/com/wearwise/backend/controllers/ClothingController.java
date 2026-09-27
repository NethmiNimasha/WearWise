package com.wearwise.backend.controllers;

import com.wearwise.backend.models.AppClothing;
import com.wearwise.backend.repositories.ClothingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/clothing")
public class ClothingController {

    @Autowired
    private ClothingRepository clothingRepository;

    @GetMapping
    public ResponseEntity<List<AppClothing>> getClothing() {
        return ResponseEntity.ok(clothingRepository.findAll());
    }

    @PostMapping
    public ResponseEntity<AppClothing> addClothing(@RequestBody AppClothing clothing) {
        return ResponseEntity.ok(clothingRepository.save(clothing));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClothing(@PathVariable Long id) {
        clothingRepository.deleteById(id);
        return ResponseEntity.ok().build();
    }
}
