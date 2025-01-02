package com.example.Udaan.Udaan.Controller;

import com.example.Udaan.Udaan.Enitty.Performance;
import com.example.Udaan.Udaan.Services.PerformanceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/restaurants/{restaurantId}/performance")
public class PerformanceController {

    private final PerformanceService performanceService;

    public PerformanceController(PerformanceService performanceService) {
        this.performanceService = performanceService;
    }

    @PostMapping
    public ResponseEntity<Performance> addPerformance(@PathVariable Long restaurantId, @RequestBody Performance performance) {
        return ResponseEntity.ok(performanceService.addPerformance(restaurantId, performance));
    }

    @PutMapping("/{performanceId}")
    public ResponseEntity<Performance> updatePerformance(@PathVariable Long performanceId, @RequestBody Performance performance) {
        return ResponseEntity.ok(performanceService.updatePerformance(performanceId, performance));
    }

    @GetMapping
    public ResponseEntity<Performance> getPerformanceByRestaurantId(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(performanceService.getPerformanceByRestaurantId(restaurantId));
    }

    @DeleteMapping("/{performanceId}")
    public ResponseEntity<Void> deletePerformance(@PathVariable Long performanceId) {
        performanceService.deletePerformance(performanceId);
        return ResponseEntity.noContent().build();
    }
}