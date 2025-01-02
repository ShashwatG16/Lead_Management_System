package com.example.Udaan.Udaan.Controller;

import com.example.Udaan.Udaan.Enitty.Interaction;
import com.example.Udaan.Udaan.Services.InteractionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/leads/{leadId}/interactions")
public class InteractionController {

    private final InteractionService interactionService;

    public InteractionController(InteractionService interactionService) {
        this.interactionService = interactionService;
    }

    @PostMapping
    public ResponseEntity<Interaction> addInteraction(@PathVariable Long leadId, @RequestBody Interaction interaction) {
        return ResponseEntity.ok(interactionService.addInteraction(leadId, interaction));
    }

    @PutMapping("/{interactionId}")
    public ResponseEntity<Interaction> updateInteraction(@PathVariable Long interactionId, @RequestBody Interaction interaction) {
        return ResponseEntity.ok(interactionService.updateInteraction(interactionId, interaction));
    }

    @DeleteMapping("/{interactionId}")
    public ResponseEntity<Void> deleteInteraction(@PathVariable Long interactionId) {
        interactionService.deleteInteraction(interactionId);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Interaction>> getInteractionsByLeadId(@PathVariable Long leadId) {
        return ResponseEntity.ok(interactionService.getInteractionsByLeadId(leadId));
    }
}
