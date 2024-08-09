package tn.esprit.stock.services;

import tn.esprit.stock.entities.FactureClient;

import java.util.List;

public interface IGestionFactureClient {
    FactureClient addFactureClient(FactureClient factureClient);
    List<FactureClient> retrieveAllFactureClients();
}
