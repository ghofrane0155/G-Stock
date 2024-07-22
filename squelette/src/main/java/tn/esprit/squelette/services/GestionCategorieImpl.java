package tn.esprit.squelette.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.squelette.entities.Categorie;
import tn.esprit.squelette.repos.ICategorieRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GestionCategorieImpl implements IGestionCategorie{
    ICategorieRepository categorieRepo;
    @Override
    public List<Categorie> retrieveAllCategories() {
        return categorieRepo.findAll();
    }

    @Override
    public Categorie addCategorie(Categorie categorie) {
        return categorieRepo.save(categorie);
    }

    @Override
    public Categorie updateCategorie(Categorie categorie) {
        if (categorieRepo.existsById(categorie.getIdCategorie())) {
            return categorieRepo.save(categorie);
        } else {
            throw new IllegalArgumentException("Categorie not found with id: " + categorie.getIdCategorie());
        }
    }

    @Override
    public void deleteCategorie(Long idCategorie) {
        if (categorieRepo.existsById(idCategorie)) {
            categorieRepo.deleteById(idCategorie);
        } else {
            throw new IllegalArgumentException("Categorie not found with id: " + idCategorie);
        }
    }
}
