package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.repository.IProduitRepository;


@AllArgsConstructor
@Service
public class GestionProduitImpl implements IGestionProduit{
    IProduitRepository produitRepo;

}
