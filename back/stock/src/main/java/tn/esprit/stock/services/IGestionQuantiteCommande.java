package tn.esprit.stock.services;

import tn.esprit.stock.entities.QuantiteCommande;
import java.util.List;

public interface IGestionQuantiteCommande {
    QuantiteCommande addQuantiteCommande(QuantiteCommande quantiteCommande);
    List<QuantiteCommande> retrieveAllQuantiteCommandes();
    QuantiteCommande updateQuantiteCommande(QuantiteCommande quantiteCommande);
    void deleteQuantiteCommande(Long id);

}
