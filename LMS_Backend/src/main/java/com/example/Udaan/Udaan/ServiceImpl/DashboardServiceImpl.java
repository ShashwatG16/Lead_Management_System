package com.example.Udaan.Udaan.ServiceImpl;


import com.example.Udaan.Udaan.Enitty.PendingTaskDTO;
import com.example.Udaan.Udaan.Enitty.PerformanceDTO;
import com.example.Udaan.Udaan.Repositories.LeadRepository;
import com.example.Udaan.Udaan.Repositories.PerformanceRepository;
import com.example.Udaan.Udaan.Repositories.RestaurantRepository;
import com.example.Udaan.Udaan.Services.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class DashboardServiceImpl implements DashboardService {

    @Autowired
    private RestaurantRepository restaurantRepository;

    @Autowired
    private LeadRepository leadRepository;

    @Autowired
    private PerformanceRepository performanceRepository;

    @Override
    public Map<String, Object> getOverview() {
        long totalRestaurants = restaurantRepository.count();
        long totalLeads = leadRepository.count();
        double conversionRate = leadRepository.calculateConversionRate();

        return Map.of(
                "totalRestaurants", totalRestaurants,
                "totalLeads", totalLeads,
                "conversionRate", conversionRate
        );
    }

    @Override
    public List<PendingTaskDTO> getPendingTasks() {
        LocalDate today = LocalDate.now();
       return leadRepository.findPendingTasks(today);

    }

    @Override
    public List<PerformanceDTO> getTopPerformers() {
        return performanceRepository.findTopPerformers()
                .stream()
                .map(performance -> new PerformanceDTO(
                        performance.getRestaurant().getName(),
                        performance.getPerformanceScore()
                ))
                .collect(Collectors.toList());
    }
}

