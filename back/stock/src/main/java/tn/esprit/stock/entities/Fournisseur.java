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
public class Fournisseur {
    @Id
    @GeneratedValue
    private Long idFournisseur;
    private String matriculeFiscale;
    private String nomFournisseur;
    private String adresseFournisseur;
    private String phone;
    private String mail;
    private String fax;

}
