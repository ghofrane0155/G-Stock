package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.QuantiteCommande;
import tn.esprit.stock.repository.IQuantiteCommandeRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GestionQuantiteCommandeImpl implements IGestionQuantiteCommande{
    IQuantiteCommandeRepository quantiteCommandeRepo;


    @Override
    public QuantiteCommande addQuantiteCommande(QuantiteCommande quantiteCommande) {
        return quantiteCommandeRepo.save(quantiteCommande);
    }

    @Override
    public List<QuantiteCommande> retrieveAllQuantiteCommandes() {
        return quantiteCommandeRepo.findAll();
    }

    @Override
    public QuantiteCommande updateQuantiteCommande(QuantiteCommande quantiteCommande) {
        return quantiteCommandeRepo.save(quantiteCommande);
    }

    @Override
    public void deleteQuantiteCommande(Long id) {
        quantiteCommandeRepo.deleteById(id);
    }
}
