package tn.esprit.stock.services;

import tn.esprit.stock.entities.FactureClient;

import java.util.List;

public interface IGestionFactureClient {
    FactureClient addFactureClient(FactureClient factureClient,Long bonCommandeId);
    List<FactureClient> retrieveAllFactureClients();
    FactureClient getFactureClientById(Long id);
    void deleteFactureClient(Long id); // Add this line

    }
