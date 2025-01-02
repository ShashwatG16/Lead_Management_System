package com.example.Udaan.Udaan.ServiceImpl;

import com.example.Udaan.Udaan.Enitty.Restaurants;
import com.example.Udaan.Udaan.Repositories.RestaurantRepository;

import com.example.Udaan.Udaan.Services.RestaurantService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RestaurantServiceImpl implements RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantServiceImpl(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Restaurants addRestaurant(Restaurants restaurant) {
        return restaurantRepository.save(restaurant);
    }

    @Override
    public Restaurants updateRestaurant(Long id, Restaurants restaurant) {
        Restaurants existingRestaurant = restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with ID: " + id));
        existingRestaurant.setName(restaurant.getName());
        existingRestaurant.setAddress(restaurant.getAddress());
        existingRestaurant.setStatus(restaurant.getStatus());
        return restaurantRepository.save(existingRestaurant);
    }

    @Override
    public void deleteRestaurant(Long id) {
        restaurantRepository.deleteById(id);
    }

    @Override
    public Restaurants getRestaurantById(Long id) {
        return restaurantRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with ID: " + id));
    }

    @Override
    public List<Restaurants> getAllRestaurants() {
        return restaurantRepository.findAll();
    }
}
