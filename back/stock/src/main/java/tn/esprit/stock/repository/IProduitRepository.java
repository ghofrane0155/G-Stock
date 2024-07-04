package tn.esprit.stock.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.Produit;

@Repository
public interface IProduitRepository extends JpaRepository<Produit,Long>{

}
