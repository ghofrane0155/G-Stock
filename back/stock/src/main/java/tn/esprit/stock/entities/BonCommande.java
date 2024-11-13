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
public class BonCommande {
    @Id
    @GeneratedValue
    private Long idBonCommande;
    private LocalDate dateCommande;

    @OneToMany(mappedBy = "bonCommande")
    private List<QuantiteCommande> listQtCommande;
    @ManyToOne
    private Client client;
}