package tn.esprit.stock.services;

import tn.esprit.stock.entities.BonCommande;
import java.util.List;

public interface IGestionBonCommande {
    BonCommande addBonCommande(BonCommande bonCommande,Long clientId);
    List<BonCommande> retrieveAllBonCommandes();
    BonCommande updateBonCommande(BonCommande bonCommande);
}
