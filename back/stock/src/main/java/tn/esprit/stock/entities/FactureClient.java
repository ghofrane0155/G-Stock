package tn.esprit.stock.entities;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class FactureClient {
    @Id
    @GeneratedValue
    private Long idFactureClient;
    @Column(nullable = false, unique = true)
    private String numeroFacture;
    private LocalDate dateFactureClient;
    private double prixTotal;

    @ManyToOne
    private BonCommande bonCommande;
}
