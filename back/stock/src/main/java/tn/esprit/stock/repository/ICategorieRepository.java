package tn.esprit.stock.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.Categorie;

@Repository
public interface ICategorieRepository extends JpaRepository<Categorie,Long> {
}
