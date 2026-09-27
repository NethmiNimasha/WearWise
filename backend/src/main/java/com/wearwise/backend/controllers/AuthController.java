package com.wearwise.backend.controllers;

import com.wearwise.backend.models.AppUser;
import com.wearwise.backend.repositories.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body(Map.of("message", "Email already exists"));
        }
        AppUser user = new AppUser();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword()); 
        userRepository.save(user);

        return ResponseEntity.ok(Map.of(
                "token", "dummy-jwt-token-" + user.getId(),
                "user", user
        ));
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        Optional<AppUser> userOpt = userRepository.findByEmail(request.getEmail());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(request.getPassword())) {
            return ResponseEntity.ok(Map.of(
                    "token", "dummy-jwt-token-" + userOpt.get().getId(),
                    "user", userOpt.get()
            ));
        }
        return ResponseEntity.status(401).body(Map.of("message", "Invalid credentials"));
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@RequestHeader(value = "Authorization", required = false) String token) {
        if (token != null && token.startsWith("Bearer dummy-jwt-token-")) {
            try {
                Long id = Long.parseLong(token.replace("Bearer dummy-jwt-token-", ""));
                return userRepository.findById(id)
                        .map(user -> ResponseEntity.ok(user))
                        .orElseGet(() -> ResponseEntity.status(401).build());
            } catch (Exception e) {
                return ResponseEntity.status(401).build();
            }
        }
        return ResponseEntity.status(401).build();
    }
}

@Data
class RegisterRequest {
    private String name;
    private String email;
    private String password;
}

@Data
class LoginRequest {
    private String email;
    private String password;
}
