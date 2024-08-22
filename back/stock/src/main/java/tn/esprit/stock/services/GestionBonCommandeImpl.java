package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.BonCommande;
import tn.esprit.stock.entities.Client;
import tn.esprit.stock.repository.IBonCommandeRepository;
import tn.esprit.stock.repository.IClientRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GestionBonCommandeImpl implements IGestionBonCommande{
    IBonCommandeRepository bonCommandeRepo;
    IClientRepository clientRepo;
    
    @Override
    public BonCommande addBonCommande(BonCommande bonCommande,Long clientId) {
        // Find and set the client
        Client c = clientRepo.findById(clientId)
                .orElseThrow(() -> new IllegalArgumentException("Client not found with id: " + clientId));
        bonCommande.setClient(c);
        return bonCommandeRepo.save(bonCommande);
    }

    @Override
    public List<BonCommande> retrieveAllBonCommandes() {
        return bonCommandeRepo.findAll();
    }

    @Override
    public BonCommande updateBonCommande(BonCommande bonCommande) {
        return bonCommandeRepo.save(bonCommande);
    }
}
