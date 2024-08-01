package tn.esprit.stock.services;

import tn.esprit.stock.entities.Categorie;

import java.util.List;

public interface IGestionCategorie {
    List<Categorie> retrieveAllCategories();
    Categorie addCategorie(Categorie categorie);
    Categorie updateCategorie(Categorie categorie);
    void deleteCategorie(Long idCategorie);
}
