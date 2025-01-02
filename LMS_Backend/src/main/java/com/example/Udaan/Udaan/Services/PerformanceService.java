package com.example.Udaan.Udaan.Services;

import com.example.Udaan.Udaan.Enitty.Performance;
import org.springframework.stereotype.Service;

public interface PerformanceService {

    Performance addPerformance(Long restaurantId, Performance performance);

    Performance updatePerformance(Long performanceId, Performance performance);

    Performance getPerformanceByRestaurantId(Long restaurantId);

    void deletePerformance(Long performanceId);
}
