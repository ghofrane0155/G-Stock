package tn.esprit.stock.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.Stock;

@Repository
public interface IStockRepository extends JpaRepository<Stock,Long> {
}
