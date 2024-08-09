package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.BonCommande;
import tn.esprit.stock.repository.IBonCommandeRepository;


import java.util.List;

@AllArgsConstructor
@Service
public class GestionBonCommandeImpl implements IGestionBonCommande{
    IBonCommandeRepository bonCommandeRepo;

    @Override
    public BonCommande addBonCommande(BonCommande bonCommande) {
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
