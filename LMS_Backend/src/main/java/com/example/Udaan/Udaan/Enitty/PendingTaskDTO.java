//package com.example.Udaan.Udaan.Enitty;
//
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//
//public class PendingTaskDTO {
//    private String restaurantName;
//    private LocalDate lastCallDate;
//    private int callFrequency;
//
//    public PendingTaskDTO(String restaurantName, LocalDate lastCallDate, int callFrequency) {
//        this.restaurantName = restaurantName;
//        this.lastCallDate = lastCallDate;
//        this.callFrequency = callFrequency;
//    }
//
//    public String getRestaurantName() {
//        return restaurantName;
//    }
//
//    public void setRestaurantName(String restaurantName) {
//        this.restaurantName = restaurantName;
//    }
//
//    public LocalDate getLastCallDate() {
//        return lastCallDate;
//    }
//
//    public void setLastCallDate(LocalDate lastCallDate) {
//        this.lastCallDate = lastCallDate;
//    }
//
//    public int getCallFrequency() {
//        return callFrequency;
//    }
//
//    public void setCallFrequency(int callFrequency) {
//        this.callFrequency = callFrequency;
//    }
//}
package com.example.Udaan.Udaan.Enitty;

import java.time.LocalDate;

public class PendingTaskDTO {
    private String restaurantName;
    private String callFrequency;
    private LocalDate lastCallDate;

    // Constructor
    public PendingTaskDTO(String restaurantName, String callFrequency, LocalDate lastCallDate) {
        this.restaurantName = restaurantName;
        this.callFrequency = callFrequency;
        this.lastCallDate = lastCallDate;
    }

    // Getters and Setters
    public String getRestaurantName() {
        return restaurantName;
    }

    public void setRestaurantName(String restaurantName) {
        this.restaurantName = restaurantName;
    }

    public String getCallFrequency() {
        return callFrequency;
    }

    public void setCallFrequency(String callFrequency) {
        this.callFrequency = callFrequency;
    }

    public LocalDate getLastCallDate() {
        return lastCallDate;
    }

    public void setLastCallDate(LocalDate lastCallDate) {
        this.lastCallDate = lastCallDate;
    }

    @Override
    public String toString() {
        return "PendingTaskDTO{" +
                "restaurantName='" + restaurantName + '\'' +
                ", callFrequency='" + callFrequency + '\'' +
                ", lastCallDate=" + lastCallDate +
                '}';
    }
}


