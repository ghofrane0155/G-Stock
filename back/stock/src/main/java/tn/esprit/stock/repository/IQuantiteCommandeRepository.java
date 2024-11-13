package tn.esprit.stock.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.QuantiteCommande;

@Repository
public interface IQuantiteCommandeRepository extends JpaRepository<QuantiteCommande,Long> {
}
