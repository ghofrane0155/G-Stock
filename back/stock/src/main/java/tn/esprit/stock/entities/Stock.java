package tn.esprit.stock.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Stock {
    @Id
    @GeneratedValue
    private Long idStock;
    private String label; // or 'location', depending on what fits your use case
    private Integer quantite;

    @OneToMany(mappedBy = "stock")
    @JsonIgnore
    private List<Produit> produits;

}
