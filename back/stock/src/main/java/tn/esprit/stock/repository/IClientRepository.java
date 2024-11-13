package tn.esprit.stock.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.Client;

@Repository
public interface IClientRepository extends JpaRepository<Client,Long> {
}
