package tn.esprit.stock.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.Categorie;
import tn.esprit.stock.entities.Fournisseur;

@Repository
public interface IFournisseurRepository extends JpaRepository<Fournisseur,Long> {
}
