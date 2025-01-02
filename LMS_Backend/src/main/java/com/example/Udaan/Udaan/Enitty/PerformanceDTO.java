package com.example.Udaan.Udaan.Enitty;

public class PerformanceDTO {
    private String restaurantName;
    private double performanceScore;

    public PerformanceDTO(String restaurantName, double performanceScore) {
        this.restaurantName = restaurantName;
        this.performanceScore = performanceScore;
    }

    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public double getPerformanceScore() {
        return performanceScore;
    }

    public void setPerformanceScore(double performanceScore) {
        this.performanceScore = performanceScore;
    }
}
