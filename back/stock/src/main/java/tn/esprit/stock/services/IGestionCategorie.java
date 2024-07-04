package tn.esprit.stock.services;

import tn.esprit.stock.entities.Categorie;

import java.util.List;

public interface IGestionCategorie {
    List<Categorie> retrieveAllCategories();
}
