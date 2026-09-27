package com.wearwise.backend.models;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class AppClothing {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String name;
    private String category;
    private String color;
    private String style;
    
    @Column(length = 2048) // longer just in case they put long URLs
    private String imageUrl;
}
