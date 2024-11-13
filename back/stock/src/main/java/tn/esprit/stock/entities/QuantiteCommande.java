package tn.esprit.stock.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Entity
@Getter
@Setter
@NoArgsConstructor
public class QuantiteCommande {
    @Id
    @GeneratedValue
    private Long idQuantiteCommande;
    private Integer QuantiteCommande;
    private double montant;

    @ManyToOne
    private Produit produit;
    @ManyToOne
    @JsonIgnore
    private BonCommande bonCommande;

}
