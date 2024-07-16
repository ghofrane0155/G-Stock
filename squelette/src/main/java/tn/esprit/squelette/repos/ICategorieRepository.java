package tn.esprit.squelette.repos;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.squelette.entities.Categorie;

@Repository
public interface ICategorieRepository extends JpaRepository<Categorie,Long> {
}
