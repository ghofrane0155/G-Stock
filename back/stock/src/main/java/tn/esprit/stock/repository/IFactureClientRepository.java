package tn.esprit.stock.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.FactureClient;

@Repository
public interface IFactureClientRepository extends JpaRepository<FactureClient,Long> {
}
