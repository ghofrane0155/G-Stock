package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.BonCommande;
import tn.esprit.stock.entities.FactureClient;
import tn.esprit.stock.repository.IFactureClientRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GestionFactureClientImpl implements IGestionFactureClient{
    IFactureClientRepository factureClientRepo;


    @Override
    public FactureClient addFactureClient(FactureClient factureClient) {
        return factureClientRepo.save(factureClient);
    }

    @Override
    public List<FactureClient> retrieveAllFactureClients() {
        return factureClientRepo.findAll();
    }
}
