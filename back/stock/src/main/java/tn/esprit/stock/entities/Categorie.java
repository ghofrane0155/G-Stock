package tn.esprit.stock.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Categorie {
    @Id
    @GeneratedValue
    private Long idCategorie;
    private String nomCategorie;

    @ManyToOne
    private Produit produit;

}
