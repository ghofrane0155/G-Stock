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
}
