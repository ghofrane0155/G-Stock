package tn.esprit.stock.services;

import tn.esprit.stock.entities.Client;

import java.util.List;

public interface IGestionClient {
    Client addClient(Client c);
    List<Client> findAll();
    Client findById (Long id);
    Client updateClient(Client c);
    void delete(Long id);
}
