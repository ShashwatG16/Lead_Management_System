package com.example.Udaan.Udaan.Repositories;

import com.example.Udaan.Udaan.Enitty.Interaction;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface InteractionRepository extends JpaRepository<Interaction, Long> {
    List<Interaction> findByLeadId(Long leadId);
}
