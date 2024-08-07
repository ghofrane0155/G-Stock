package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.Fournisseur;
import tn.esprit.stock.repository.IFournisseurRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GestionFournisseurImpl implements IGestionFournisseur{
    IFournisseurRepository fournisseurRepo;


    @Override
    public Fournisseur addFournisseur(Fournisseur f) {
        return fournisseurRepo.save(f);
    }

    @Override
    public List<Fournisseur> findAll() {
        return fournisseurRepo.findAll();
    }

    @Override
    public Fournisseur findById(Long id) {
        return fournisseurRepo.findById(id).get();
    }

    @Override
    public Fournisseur updateFournisseur(Fournisseur f) {
        return fournisseurRepo.save(f);
    }

    @Override
    public void delete(Long id) {
        fournisseurRepo.deleteById(id);
    }
}
