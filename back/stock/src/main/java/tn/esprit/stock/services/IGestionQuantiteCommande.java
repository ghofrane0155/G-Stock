package tn.esprit.stock.services;

import tn.esprit.stock.entities.QuantiteCommande;

import java.util.List;

public interface IGestionQuantiteCommande {
    QuantiteCommande addQuantiteCommande(QuantiteCommande quantiteCommande, Long produitId, Long bonCommandeId);
    List<QuantiteCommande> retrieveAllQuantiteCommandes();
    QuantiteCommande updateQuantiteCommande(QuantiteCommande quantiteCommande);
    void deleteQuantiteCommande(Long id);

}
