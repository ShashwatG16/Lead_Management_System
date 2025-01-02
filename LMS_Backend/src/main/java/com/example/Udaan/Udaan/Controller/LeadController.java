package com.example.Udaan.Udaan.Controller;


import com.example.Udaan.Udaan.Enitty.Lead;
import com.example.Udaan.Udaan.Services.LeadService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads")
public class LeadController {

    private final LeadService leadService;

    public LeadController(LeadService leadService) {
        this.leadService = leadService;
    }

    @PostMapping("/{restaurantId}")
    public ResponseEntity<Lead> addLead(@PathVariable Long restaurantId, @RequestBody Lead lead) {
        return ResponseEntity.ok(leadService.addLead(restaurantId, lead));
    }

    @PutMapping("/{leadId}")
    public ResponseEntity<Lead> updateLead(@PathVariable Long leadId, @RequestBody Lead lead) {
        return ResponseEntity.ok(leadService.updateLead(leadId, lead));
    }

    @DeleteMapping("/{leadId}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long leadId) {
        leadService.deleteLead(leadId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{leadId}")
    public ResponseEntity<Lead> getLeadById(@PathVariable Long leadId) {
        return ResponseEntity.ok(leadService.getLeadById(leadId));
    }

    @GetMapping
    public ResponseEntity<List<Lead>> getAllLeads() {
        return ResponseEntity.ok(leadService.getAllLeads());
    }
    @GetMapping("/restaurant/{restaurantId}")
    public ResponseEntity<List<Lead>> getAllRestaurantLeads(@PathVariable Long restaurantId) {
        return ResponseEntity.ok(leadService.getAllRestaurantLeads(restaurantId));
    }

    @GetMapping("/today")
    public ResponseEntity<List<Lead>> getLeadsRequiringCallToday() {
        return ResponseEntity.ok(leadService.getLeadsRequiringCallToday());
    }
}
