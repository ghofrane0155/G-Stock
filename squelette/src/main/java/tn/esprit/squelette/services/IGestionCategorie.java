package tn.esprit.squelette.services;

import tn.esprit.squelette.entities.Categorie;

import java.util.List;

public interface IGestionCategorie {
    List<Categorie> retrieveAllCategories();
}
