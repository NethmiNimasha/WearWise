package com.wearwise.backend.controllers;

import com.wearwise.backend.models.AppClothing;
import com.wearwise.backend.repositories.ClothingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import lombok.Data;

@RestController
@RequestMapping("/api/outfits")
public class OutfitController {

    @Autowired
    private ClothingRepository clothingRepository;

    @GetMapping
    public ResponseEntity<?> getOutfits() {
        return ResponseEntity.ok(List.of());
    }

    @PostMapping("/generate")
    public ResponseEntity<?> generateOutfit(@RequestBody GenerateRequest request) {
        List<AppClothing> allClothes = clothingRepository.findAll();
        List<AppClothing> tops = allClothes.stream().filter(c -> "Tops".equalsIgnoreCase(c.getCategory())).collect(Collectors.toList());
        List<AppClothing> bottoms = allClothes.stream().filter(c -> "Bottoms".equalsIgnoreCase(c.getCategory())).collect(Collectors.toList());

        String styleLabel = request.getStyle() == null || request.getStyle().isEmpty() ? "Great" : request.getStyle();
        
        StringBuilder recommendation = new StringBuilder("Based on your choices for a ")
            .append(request.getOccasion())
            .append(" in ")
            .append(request.getWeather())
            .append(" weather, we recommend a ")
            .append(styleLabel)
            .append(" look!\n\n");

        if (tops.isEmpty() || bottoms.isEmpty()) {
            String occ = request.getOccasion().toLowerCase();
            String wth = request.getWeather().toLowerCase();
            String topSuggestion = "a comfortable lightweight shirt";
            String bottomSuggestion = "some nice tailored trousers or dark jeans";
            
            if (occ.contains("funeral") || occ.contains("wedding") || occ.contains("formal")) {
                topSuggestion = "a dark, formal button-down shirt or blouse";
                bottomSuggestion = "matching dark dress pants or a formal skirt";
            } else if (occ.contains("gym") || occ.contains("workout") || occ.contains("run")) {
                topSuggestion = "a moisture-wicking athletic top";
                bottomSuggestion = "gym shorts or leggings";
            } else if (occ.contains("party") || occ.contains("date")) {
                topSuggestion = "a stylish statement shirt or elegant top";
            }
            
            if (wth.contains("cold") || wth.contains("winter") || wth.contains("snow")) {
                topSuggestion += " layered with a warm coat or sweater";
                bottomSuggestion += " with thermal layers";
            } else if (wth.contains("hot") || wth.contains("summer") || wth.contains("sun")) {
                topSuggestion += " (preferably breathable linen or cotton)";
            }

            recommendation.append("Since you don't have enough Tops or Bottoms in your digital wardrobe yet, here is a general suggestion:\n")
                .append("👕 For a ").append(request.getOccasion()).append(" in ").append(request.getWeather()).append(" weather, we suggest wearing ").append(topSuggestion).append(".\n")
                .append("👖 Pair it with ").append(bottomSuggestion).append(" for a clean ").append(styleLabel).append(" look!\n\n")
                .append("(Add more items to 'My Wardrobe' for personalized recommendations!)");
        } else {
            // Pick a random top and bottom
            AppClothing top = tops.get((int) (Math.random() * tops.size()));
            AppClothing bottom = bottoms.get((int) (Math.random() * bottoms.size()));
            recommendation.append("Try wearing:\n")
                .append("👕 Top: ").append(top.getColor()).append(" ").append(top.getName()).append("\n")
                .append("👖 Bottom: ").append(bottom.getColor()).append(" ").append(bottom.getName()).append("\n");
        }

        return ResponseEntity.ok(Map.of(
            "id", System.currentTimeMillis(),
            "occasion", request.getOccasion(),
            "weather", request.getWeather(),
            "style", styleLabel,
            "recommendation", recommendation.toString()
        ));
    }
}

@Data
class GenerateRequest {
    private String occasion;
    private String weather;
    private String style;
}
