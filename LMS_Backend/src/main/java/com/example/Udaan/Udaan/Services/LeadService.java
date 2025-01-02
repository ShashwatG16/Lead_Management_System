package com.example.Udaan.Udaan.Services;

import com.example.Udaan.Udaan.Enitty.Lead;

import java.util.List;

public interface LeadService {

    Lead addLead(Long restaurantId, Lead lead);

    Lead updateLead(Long leadId, Lead lead);

    void deleteLead(Long leadId);

    Lead getLeadById(Long leadId);

    List<Lead> getAllLeads();

    List<Lead> getLeadsRequiringCallToday();

   List<Lead> getAllRestaurantLeads(Long restaurantId);
}
