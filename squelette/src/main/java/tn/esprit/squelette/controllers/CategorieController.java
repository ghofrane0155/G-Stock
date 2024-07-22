package tn.esprit.squelette.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
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

    @PostMapping("/add")
    public Categorie addCategorie(@RequestBody Categorie categorie) {
        return IgCategorie.addCategorie(categorie);
    }

    @PutMapping("/update")
    public Categorie updateCategorie(@RequestBody Categorie categorie) {
        return IgCategorie.updateCategorie(categorie);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteCategorie(@PathVariable Long id) {
        IgCategorie.deleteCategorie(id);
    }
}
