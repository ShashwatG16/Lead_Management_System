package com.example.Udaan.Udaan.Services;



import com.example.Udaan.Udaan.Enitty.Restaurants;

import java.util.List;

public interface RestaurantService {
    Restaurants addRestaurant(Restaurants restaurant);

    Restaurants updateRestaurant(Long id, Restaurants restaurant);

    void deleteRestaurant(Long id);

    Restaurants getRestaurantById(Long id);

    List<Restaurants> getAllRestaurants();

}
