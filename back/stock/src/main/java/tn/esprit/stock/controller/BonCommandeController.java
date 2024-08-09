package tn.esprit.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stock.entities.BonCommande;
import tn.esprit.stock.services.IGestionBonCommande;


import java.util.List;

@RestController
@RequestMapping("/user/BonCommande")
@CrossOrigin
public class BonCommandeController {
    @Autowired
    IGestionBonCommande IgBonCommande;

    @GetMapping("/getAll")
    public List<BonCommande> retrieveAllBonCommande(){
        return IgBonCommande.retrieveAllBonCommandes();
    }

    @PostMapping("/add/{clientId}")
    public BonCommande addBonCommande(@RequestBody BonCommande bonCommande,@PathVariable("clientId")Long clientId) {
        return IgBonCommande.addBonCommande(bonCommande,clientId);
    }

    @PutMapping("/update")
    public BonCommande updateBonCommande(@RequestBody BonCommande bonCommande) {
        return IgBonCommande.updateBonCommande(bonCommande);
    }

}
