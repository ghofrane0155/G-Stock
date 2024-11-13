package tn.esprit.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stock.entities.Fournisseur;
import tn.esprit.stock.services.IGestionFournisseur;

import java.util.List;

@RestController
@RequestMapping("/user/fournisseur")
@CrossOrigin
public class FournisseurController {
    @Autowired
    private IGestionFournisseur IgFournisseur;

    @PostMapping("/add")
    public Fournisseur addFournisseur(@RequestBody Fournisseur fournisseur) {
        return IgFournisseur.addFournisseur(fournisseur);
    }

    @GetMapping("/getAll")
    public List<Fournisseur> findAll() {
        return IgFournisseur.findAll();
    }

    @GetMapping("/{id}")
    public Fournisseur findById(@PathVariable Long id) {
        return IgFournisseur.findById(id);
    }

    @PutMapping("/update")
    public Fournisseur updateFournisseur(@RequestBody Fournisseur fournisseur) {
        return IgFournisseur.updateFournisseur(fournisseur);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        IgFournisseur.delete(id);
    }

}
