package tn.esprit.squelette.repos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.squelette.entities.Produit;

import java.util.List;

@Repository
public interface IProduitRepository extends JpaRepository<Produit, Long> {
    List<Produit> findAllByOrderByPrixUnitaireAsc();
}
