package com.wearwise.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/clothing")
public class ClothingController {
    @GetMapping
    public ResponseEntity<?> getClothing() {
        return ResponseEntity.ok(List.of(
            Map.of("id", 1, "name", "Classic Blue Jeans", "category", "Bottoms", "color", "Blue", "style", "Casual", "imageUrl", "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&q=80"),
            Map.of("id", 2, "name", "White T-Shirt", "category", "Tops", "color", "White", "style", "Casual", "imageUrl", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&q=80")
        ));
    }

    @PostMapping
    public ResponseEntity<?> addClothing(@RequestBody Map<String, Object> clothing) {
        clothing.put("id", System.currentTimeMillis());
        return ResponseEntity.ok(clothing);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClothing(@PathVariable Long id) {
        return ResponseEntity.ok().build();
    }
}
