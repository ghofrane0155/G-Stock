package tn.esprit.stock.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.BonCommande;

@Repository
public interface IBonCommandeRepository extends JpaRepository<BonCommande,Long> {
}
