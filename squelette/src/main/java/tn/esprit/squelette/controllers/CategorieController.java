package tn.esprit.squelette.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.squelette.entities.Categorie;
import tn.esprit.squelette.services.IGestionCategorie;

import java.util.List;

@RestController
@RequestMapping("/categorie")
@CrossOrigin
public class CategorieController {
    @Autowired
    IGestionCategorie IgCategorie;

    @GetMapping("/getAll")
    public List<Categorie> retrieveAllCategories(){
        return IgCategorie.retrieveAllCategories();
    }
}
