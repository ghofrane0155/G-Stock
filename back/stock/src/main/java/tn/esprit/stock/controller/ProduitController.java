package tn.esprit.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import tn.esprit.stock.services.IGestionProduit;


@RestController
@RequestMapping("/produit")
@CrossOrigin
public class ProduitController {
    @Autowired
    IGestionProduit IgProduit;


}
