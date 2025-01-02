package com.example.Udaan.Udaan.Enitty;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "performance")
public class Performance {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToOne
    @JoinColumn(name = "restaurant_id", nullable = false)
    @JsonBackReference("restaurant_performance")
    private Restaurants restaurant;

    @Column(name = "average_order_value")
    private Double averageOrderValue;

    @Column(name = "order_frequency")
    private Integer orderFrequency;

    @Column(name = "last_order_date")
    private java.time.LocalDate lastOrderDate;

    @Column(name = "performance_score")
    private Double performanceScore;

    @Column(name = "created_at", updatable = false)
    private java.time.LocalDate createdAt;

    @Column(name = "updated_at")
    private java.time.LocalDate updatedAt;

    @PrePersist
    protected void onCreate() {
        this.createdAt = java.time.LocalDate.now();
    }

    @PreUpdate
    protected void onUpdate() {
        this.updatedAt = java.time.LocalDate.now();
    }

    public Performance(){

    }

    public Restaurants getRestaurant() {
        return restaurant;
    }

    public void setRestaurant(Restaurants restaurant) {
        this.restaurant = restaurant;
    }

    public Double getAverageOrderValue() {
        return averageOrderValue;
    }

    public void setAverageOrderValue(Double averageOrderValue) {
        this.averageOrderValue = averageOrderValue;
    }

    public Integer getOrderFrequency() {
        return orderFrequency;
    }

    public void setOrderFrequency(Integer orderFrequency) {
        this.orderFrequency = orderFrequency;
    }

    public LocalDate getLastOrderDate() {
        return lastOrderDate;
    }

    public void setLastOrderDate(LocalDate lastOrderDate) {
        this.lastOrderDate = lastOrderDate;
    }

    public Double getPerformanceScore() {
        return performanceScore;
    }

    public void setPerformanceScore(Double performanceScore) {
        this.performanceScore = performanceScore;
    }

    public LocalDate getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDate createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDate getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDate updatedAt) {
        this.updatedAt = updatedAt;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Performance(Restaurants restaurant, Double averageOrderValue, Integer orderFrequency, LocalDate lastOrderDate, Double performanceScore, LocalDate createdAt, LocalDate updatedAt) {
        this.restaurant = restaurant;
        this.averageOrderValue = averageOrderValue;
        this.orderFrequency = orderFrequency;
        this.lastOrderDate = lastOrderDate;
        this.performanceScore = performanceScore;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }


}
