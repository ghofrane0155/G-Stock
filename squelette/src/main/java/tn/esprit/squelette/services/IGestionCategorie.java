package tn.esprit.squelette.services;

import tn.esprit.squelette.entities.Categorie;

import java.util.List;

public interface IGestionCategorie {
    List<Categorie> retrieveAllCategories();
    Categorie addCategorie(Categorie categorie);
    Categorie updateCategorie(Categorie categorie);
    void deleteCategorie(Long idCategorie);
}
