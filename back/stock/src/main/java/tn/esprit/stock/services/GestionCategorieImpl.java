package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.Categorie;
import tn.esprit.stock.repository.ICategorieRepository;

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
