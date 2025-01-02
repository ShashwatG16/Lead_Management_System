package com.example.Udaan.Udaan.ServiceImpl;


import com.example.Udaan.Udaan.Enitty.Lead;
import com.example.Udaan.Udaan.Enitty.Restaurants;
import com.example.Udaan.Udaan.Repositories.LeadRepository;
import com.example.Udaan.Udaan.Repositories.RestaurantRepository;
import com.example.Udaan.Udaan.Services.LeadService;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class LeadServiceImpl implements LeadService {
    private final LeadRepository leadRepository;
    private final RestaurantRepository restaurantRepository;

    public LeadServiceImpl(LeadRepository leadRepository, RestaurantRepository restaurantRepository) {
        this.leadRepository = leadRepository;
        this.restaurantRepository = restaurantRepository;
    }

    @Override
    public Lead addLead(Long restaurantId, Lead lead) {
        Restaurants restaurant = restaurantRepository.findById(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found with ID: " + restaurantId));
        lead.setRestaurant(restaurant);
        return leadRepository.save(lead);
    }

    @Override
    public Lead updateLead(Long leadId, Lead lead) {
        Lead existingLead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found with ID: " + leadId));
        existingLead.setStatus(lead.getStatus());
        existingLead.setCallFrequency(lead.getCallFrequency());
        existingLead.setLastCallDate(lead.getLastCallDate());
        return leadRepository.save(existingLead);
    }

    @Override
    public void deleteLead(Long leadId) {
        leadRepository.deleteById(leadId);
    }

    @Override
    public Lead getLeadById(Long leadId) {
        return leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found with ID: " + leadId));
    }

    @Override
    public List<Lead> getAllLeads() {
        return leadRepository.findAll();
    }

    @Override
    public List<Lead> getLeadsRequiringCallToday() {
        //return leadRepository.findLeadsRequiringCall(LocalDateTime.now());
        return null;
    }

    @Override
    public List<Lead> getAllRestaurantLeads(Long restaurantId) {
        return leadRepository.findAllByRestaurant( restaurantId);
    }
}
