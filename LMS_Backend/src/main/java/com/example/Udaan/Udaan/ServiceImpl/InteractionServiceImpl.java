package com.example.Udaan.Udaan.ServiceImpl;

import com.example.Udaan.Udaan.Enitty.Interaction;
import com.example.Udaan.Udaan.Enitty.Lead;
import com.example.Udaan.Udaan.Repositories.InteractionRepository;
import com.example.Udaan.Udaan.Repositories.LeadRepository;
import com.example.Udaan.Udaan.Services.InteractionService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InteractionServiceImpl implements InteractionService {
    private final InteractionRepository interactionRepository;
    private final LeadRepository leadRepository;

    public InteractionServiceImpl(InteractionRepository interactionRepository, LeadRepository leadRepository) {
        this.interactionRepository = interactionRepository;
        this.leadRepository = leadRepository;
    }

    @Override
    public Interaction addInteraction(Long leadId, Interaction interaction) {
        Lead lead = leadRepository.findById(leadId)
                .orElseThrow(() -> new RuntimeException("Lead not found with ID: " + leadId));
        interaction.setLead(lead);
        return interactionRepository.save(interaction);
    }

    @Override
    public Interaction updateInteraction(Long interactionId, Interaction interaction) {
        Interaction existingInteraction = interactionRepository.findById(interactionId)
                .orElseThrow(() -> new RuntimeException("Interaction not found with ID: " + interactionId));
        existingInteraction.setType(interaction.getType());
        existingInteraction.setDetails(interaction.getDetails());
        existingInteraction.setDate(interaction.getDate());
        return interactionRepository.save(existingInteraction);
    }

    @Override
    public void deleteInteraction(Long interactionId) {
        interactionRepository.deleteById(interactionId);
    }

    @Override
    public List<Interaction> getInteractionsByLeadId(Long leadId) {
        return interactionRepository.findByLeadId(leadId);
    }
}

