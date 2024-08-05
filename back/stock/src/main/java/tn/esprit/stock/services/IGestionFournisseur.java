package tn.esprit.stock.services;

import tn.esprit.stock.entities.Fournisseur;
import java.util.List;

public interface IGestionFournisseur {
    Fournisseur addFournisseur(Fournisseur f);
    List<Fournisseur> findAll();
    Fournisseur findById (Long id);
    Fournisseur updateFournisseur(Fournisseur f);
    void delete(Long id);
}
