package com.wearwise.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import lombok.Data;

@RestController
@RequestMapping("/api/outfits")
public class OutfitController {
    @GetMapping
    public ResponseEntity<?> getOutfits() {
        return ResponseEntity.ok(List.of());
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateOutfit(@RequestBody GenerateRequest request) {
        return ResponseEntity.ok(Map.of(
            "id", System.currentTimeMillis(),
            "occasion", request.getOccasion(),
            "weather", request.getWeather(),
            "style", request.getStyle(),
            "recommendation", "Based on your choices for a " + request.getOccasion() + " in " + request.getWeather() + " weather, we recommend a " + request.getStyle() + " look!"
        ));
    }
}

@Data
class GenerateRequest {
    private String occasion;
    private String weather;
    private String style;
}
