package tn.esprit.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stock.entities.QuantiteCommande;
import tn.esprit.stock.services.IGestionQuantiteCommande;


import java.util.List;

@RestController
@RequestMapping("/user/QuantiteCommande")
@CrossOrigin
public class QuantiteCommandeController {
    @Autowired
    IGestionQuantiteCommande IgQuantiteCommande;

    @GetMapping("/getAll")
    public List<QuantiteCommande> retrieveAllQuantiteCommandes(){
        return IgQuantiteCommande.retrieveAllQuantiteCommandes();
    }

    @PostMapping("/add/{produitId}/{bonCommandeId}")
    public QuantiteCommande addQuantiteCommande(@RequestBody QuantiteCommande quantiteCommande,@PathVariable("produitId") Long produitId,@PathVariable("bonCommandeId") Long bonCommandeId) {
        return IgQuantiteCommande.addQuantiteCommande(quantiteCommande,produitId,bonCommandeId);
    }

    @PutMapping("/update")
    public QuantiteCommande updateQuantiteCommande(@RequestBody QuantiteCommande quantiteCommande) {
        return IgQuantiteCommande.updateQuantiteCommande(quantiteCommande);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteQuantiteCommande(@PathVariable Long id) {
        IgQuantiteCommande.deleteQuantiteCommande(id);
    }




}
