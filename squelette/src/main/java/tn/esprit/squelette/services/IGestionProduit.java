package tn.esprit.squelette.services;

import org.springframework.web.multipart.MultipartFile;
import tn.esprit.squelette.entities.Produit;

import java.io.IOException;
import java.util.List;

public interface IGestionProduit {

    List<Produit> retrieveAllProduits();
    List<Produit> getProduitsSortedByPrixUnitaire();


    Produit addProduit(Produit produit, MultipartFile logo) throws IOException ;

    Produit updateProduit(Produit produit);
    void deleteProduit(Long idProduit);

    Produit getProduitById(Long id);
}
