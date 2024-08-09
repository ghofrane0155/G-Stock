package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.BonCommande;
import tn.esprit.stock.entities.FactureClient;
import tn.esprit.stock.entities.Produit;
import tn.esprit.stock.repository.IBonCommandeRepository;
import tn.esprit.stock.repository.IFactureClientRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GestionFactureClientImpl implements IGestionFactureClient{
    IFactureClientRepository factureClientRepo;
    IBonCommandeRepository bonCommandeRepo;

    @Override
    public FactureClient addFactureClient(FactureClient factureClient,Long bonCommandeId) {
        // Find and set the BonCommande
        BonCommande bonCommande = bonCommandeRepo.findById(bonCommandeId)
                .orElseThrow(() -> new IllegalArgumentException("BonCommande not found with id: " + bonCommandeId));
        factureClient.setBonCommande(bonCommande);
        
        return factureClientRepo.save(factureClient);
    }

    @Override
    public List<FactureClient> retrieveAllFactureClients() {
        return factureClientRepo.findAll();
    }
}
