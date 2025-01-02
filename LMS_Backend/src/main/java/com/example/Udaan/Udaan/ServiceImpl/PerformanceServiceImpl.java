package com.example.Udaan.Udaan.ServiceImpl;

import com.example.Udaan.Udaan.Enitty.Performance;
import com.example.Udaan.Udaan.Enitty.Restaurants;
import com.example.Udaan.Udaan.Repositories.PerformanceRepository;
import com.example.Udaan.Udaan.Repositories.RestaurantRepository;
import com.example.Udaan.Udaan.Services.PerformanceService;
import org.springframework.stereotype.Service;

@Service
public class PerformanceServiceImpl implements PerformanceService {
    private final PerformanceRepository performanceRepository;
    private final RestaurantRepository restaurantRepository;

    public PerformanceServiceImpl(PerformanceRepository performanceRepository, RestaurantRepository restaurantRepository) {
        this.performanceRepository = performanceRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Performance addPerformance(Long restaurantId, Performance performance) {
        Restaurants restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with ID: " + restaurantId));
        performance.setRestaurant(restaurant);
        return performanceRepository.save(performance);
    }

    @Override
    public Performance updatePerformance(Long performanceId, Performance performance) {
        Performance existingPerformance = performanceRepository.findById(performanceId)
                .orElseThrow(() -> new RuntimeException("Performance not found with ID: " + performanceId));
        existingPerformance.setAverageOrderValue(performance.getAverageOrderValue());
        existingPerformance.setOrderFrequency(performance.getOrderFrequency());
        existingPerformance.setLastOrderDate(performance.getLastOrderDate());
        existingPerformance.setPerformanceScore(performance.getPerformanceScore());
        return performanceRepository.save(existingPerformance);
    }

    @Override
    public Performance getPerformanceByRestaurantId(Long restaurantId) {
        return performanceRepository.findByRestaurantId(restaurantId)
                .orElseThrow(() -> new RuntimeException("Performance not found for Restaurant ID: " + restaurantId));
    }

    @Override
    public void deletePerformance(Long performanceId) {
        performanceRepository.deleteById(performanceId);
    }
}
