package tn.esprit.stock.services;

import jakarta.transaction.Transactional;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.stock.entities.Produit;

import java.io.IOException;
import java.util.List;

public interface IGestionProduit {

    List<Produit> retrieveAllProduits();
    List<Produit> getProduitsSortedByPrixUnitaire();

    @Transactional
    Produit addProduit(Produit produit, MultipartFile logo,Long categorieId) throws IOException ;

    Produit updateProduit(Produit produit);
    void deleteProduit(Long idProduit);

    Produit getProduitById(Long id);
}
