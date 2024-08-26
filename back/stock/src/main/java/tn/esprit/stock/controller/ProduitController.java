package tn.esprit.stock.controller;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import tn.esprit.stock.entities.Produit;
import tn.esprit.stock.services.IGestionProduit;

import java.io.IOException;
import java.util.List;


@RestController
@RequestMapping("/user/produit")
@CrossOrigin
@Tag(name = "Produit", description = "Produit management APIs")
public class ProduitController {
    @Autowired
    IGestionProduit IgProduit;


    @PostMapping("/add")
    @Operation(summary = "Add a new produit")
    public ResponseEntity<Produit> addProduit(
            @RequestParam("logo") MultipartFile logo,
            @RequestParam("nomProduit") String nomProduit,
            @RequestParam("description") String description,
            @RequestParam("prixUnitaire") double prixUnitaire,
            @RequestParam("quantite") Integer quantite,
            @RequestParam("categorieId") Long categorieId,
            @RequestParam("stockId") Long stockId) {
        try {
            Produit produit = new Produit();
            produit.setNomProduit(nomProduit);
            produit.setDescription(description);
            produit.setPrixUnitaire(prixUnitaire);
            produit.setQuantite(quantite);

            Produit savedProduit = IgProduit.addProduit(produit, logo, categorieId,stockId);
            return ResponseEntity.status(HttpStatus.CREATED).body(savedProduit);
        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    @PutMapping("/update")
    public Produit updateProduit(@RequestBody Produit produit) {
        return IgProduit.updateProduit(produit);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteProduit(@PathVariable Long id) {
        IgProduit.deleteProduit(id);
    }

    @GetMapping("/getAll")
    public List<Produit> retrieveAllProduits() {
        return IgProduit.retrieveAllProduits();
    }



    @GetMapping("/getProduitById/{id}")
    public ResponseEntity<Produit> getProduitById(@PathVariable Long id) {
        Produit produit = IgProduit.getProduitById(id);
        if (produit == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(produit);
    }


    @GetMapping("/sortedByPrixUnitaire")
    public ResponseEntity<List<Produit>> getProduitsSortedByPrixUnitaire() {
        List<Produit> produits = IgProduit.getProduitsSortedByPrixUnitaire();
        return ResponseEntity.ok(produits);
    }
}