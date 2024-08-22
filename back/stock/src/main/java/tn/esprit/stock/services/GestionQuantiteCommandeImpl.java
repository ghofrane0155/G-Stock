package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.BonCommande;
import tn.esprit.stock.entities.Produit;
import tn.esprit.stock.entities.QuantiteCommande;
import tn.esprit.stock.repository.IBonCommandeRepository;
import tn.esprit.stock.repository.IProduitRepository;
import tn.esprit.stock.repository.IQuantiteCommandeRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GestionQuantiteCommandeImpl implements IGestionQuantiteCommande{
    IQuantiteCommandeRepository quantiteCommandeRepo;
    private final IProduitRepository produitRepo;
    private final IBonCommandeRepository bonCommandeRepo;



    @Override
    public QuantiteCommande addQuantiteCommande(QuantiteCommande quantiteCommande, Long produitId, Long bonCommandeId) {
        // Find and set the produit
        Produit p = produitRepo.findById(produitId)
                .orElseThrow(() -> new IllegalArgumentException("Produit not found with id: " + produitId));
        quantiteCommande.setProduit(p);

        // Find and set the BonCommande
        BonCommande bonCommande = bonCommandeRepo.findById(bonCommandeId)
                .orElseThrow(() -> new IllegalArgumentException("BonCommande not found with id: " + bonCommandeId));
        quantiteCommande.setBonCommande(bonCommande);

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
