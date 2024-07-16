package tn.esprit.squelette.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.squelette.services.IGestionProduit;


@RestController
@RequestMapping("/produit")
@CrossOrigin
public class ProduitController {
    @Autowired
    IGestionProduit IgProduit;
}