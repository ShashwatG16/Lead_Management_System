package com.example.Udaan.Udaan.Controller;


import com.example.Udaan.Udaan.Enitty.Restaurants;
import com.example.Udaan.Udaan.Services.RestaurantService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.Style;
import java.util.List;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }


    @PostMapping
    public ResponseEntity<Restaurants> addRestaurant(@RequestBody Restaurants restaurant) {

        System.out.println("Z" + restaurant);
        return ResponseEntity.ok(restaurantService.addRestaurant(restaurant));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Restaurants> updateRestaurant(@PathVariable Long id, @RequestBody @Valid Restaurants restaurant) {
        return ResponseEntity.ok(restaurantService.updateRestaurant(id, restaurant));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRestaurant(@PathVariable Long id) {
        restaurantService.deleteRestaurant(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Restaurants> getRestaurantById(@PathVariable Long id) {
        return ResponseEntity.ok(restaurantService.getRestaurantById(id));
    }

    @GetMapping
    public ResponseEntity<List<Restaurants>> getAllRestaurants() {
        return ResponseEntity.ok(restaurantService.getAllRestaurants());
    }
}
