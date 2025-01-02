package com.example.Udaan.Udaan.Services;

import com.example.Udaan.Udaan.Enitty.Interaction;

import java.util.List;

public interface InteractionService {

    Interaction addInteraction(Long leadId, Interaction interaction);

    Interaction updateInteraction(Long interactionId, Interaction interaction);

    void deleteInteraction(Long interactionId);

    List<Interaction> getInteractionsByLeadId(Long leadId);
}
