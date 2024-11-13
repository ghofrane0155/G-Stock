package tn.esprit.stock.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Categorie {
    @Id
    @GeneratedValue
    private Long idCategorie;
    private String nomCategorie;

    @OneToMany(mappedBy = "categorie")
    @JsonIgnore
    private List<Produit> produits; // Une catégorie peut avoir plusieurs produits.
}