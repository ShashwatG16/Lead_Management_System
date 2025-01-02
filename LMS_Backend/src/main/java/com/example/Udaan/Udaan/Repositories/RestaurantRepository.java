package com.example.Udaan.Udaan.Repositories;

import com.example.Udaan.Udaan.Enitty.Restaurants;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RestaurantRepository extends JpaRepository<Restaurants, Long> {
    // Custom queries can be added here if needed
}
