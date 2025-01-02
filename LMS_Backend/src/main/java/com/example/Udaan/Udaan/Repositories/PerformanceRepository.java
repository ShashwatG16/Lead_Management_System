package com.example.Udaan.Udaan.Repositories;

import com.example.Udaan.Udaan.Enitty.Performance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface PerformanceRepository extends JpaRepository<Performance,Long> {
    Optional<Performance> findByRestaurantId(Long restaurantId);

    @Query("SELECT p FROM Performance p ORDER BY p.performanceScore DESC")
    List<Performance> findTopPerformers();
}
