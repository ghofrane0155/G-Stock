package tn.esprit.squelette.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Produit {
    @Id
    @GeneratedValue
    private Long idProduit;
    private String nomProduit;
    private String description;
    private double prixUnitaire;
    private String codeAB;
    private String logo;

    @OneToMany
    private List<Categorie> listCategorie;



    @PrePersist
    private void prePersist() {
        if (codeAB == null || codeAB.isEmpty()) {
            codeAB = generateBarCode();
        }
    }

    private String generateBarCode() {
        // Generate barcode logic
        return "GeneratedBarCodeValue";
    }



}





