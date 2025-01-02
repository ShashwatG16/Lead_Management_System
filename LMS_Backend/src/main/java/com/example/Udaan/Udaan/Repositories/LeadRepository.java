package com.example.Udaan.Udaan.Repositories;

import com.example.Udaan.Udaan.Enitty.Lead;
import com.example.Udaan.Udaan.Enitty.PendingTaskDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface LeadRepository extends JpaRepository<Lead, Long> {

    @Query("SELECT l FROM Lead l WHERE l.lastCallDate <= :today AND l.callFrequency IS NOT NULL")
    List<Lead> findLeadsRequiringCall(@Param("today") LocalDate today);

    @Query("SELECT new com.example.Udaan.Udaan.Enitty.PendingTaskDTO(r.name, l.callFrequency, l.lastCallDate) " +
            "FROM Lead l " +
            "JOIN l.restaurant r " +
            "WHERE DATEADD(DAY, CAST(l.callFrequency AS integer), l.lastCallDate) <= :today")
    List<PendingTaskDTO> findPendingTasks(@Param("today") LocalDate today);


    @Query("SELECT (COUNT(l) * 100.0 / (SELECT COUNT(l2) FROM Lead l2)) FROM Lead l WHERE l.status = 'Completed'")
    double calculateConversionRate();

    @Query(
            "SELECT l FROM Lead l WHERE l.restaurant.id = :restaurantId"
    )
    List <Lead> findAllByRestaurant(Long restaurantId);
}

