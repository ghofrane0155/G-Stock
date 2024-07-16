package tn.esprit.squelette.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.squelette.repos.IProduitRepository;


@AllArgsConstructor
@Service
public class GestionProduitImpl implements IGestionProduit{
    IProduitRepository produitRepo;

}
