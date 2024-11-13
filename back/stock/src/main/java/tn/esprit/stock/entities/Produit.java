package tn.esprit.stock.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Produit {
    @Id
    @GeneratedValue
    private Long idProduit;
    private String nomProduit;
    private String description;
    private double prixUnitaire;
    private String codeAB;
    private String logo;
    private Integer quantite;  // New field for quantity


    @ManyToOne
    private Categorie categorie;
    @ManyToOne
    private Stock stock;

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




