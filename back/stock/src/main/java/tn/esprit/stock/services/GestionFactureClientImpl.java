package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.BonCommande;
import tn.esprit.stock.entities.FactureClient;
import tn.esprit.stock.repository.IBonCommandeRepository;
import tn.esprit.stock.repository.IFactureClientRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Calendar;
import java.util.List;
import java.util.UUID;

@AllArgsConstructor
@Service
public
class GestionFactureClientImpl implements IGestionFactureClient{
    IFactureClientRepository factureClientRepo;
    IBonCommandeRepository bonCommandeRepo;
    private static final DateTimeFormatter YEAR_FORMATTER = DateTimeFormatter.ofPattern("yyyy");
    private static final int NUMBER_LENGTH = 5;
    @Override
    public FactureClient addFactureClient(FactureClient factureClient,Long bonCommandeId) {
        // Find and set the BonCommande
        BonCommande bonCommande = bonCommandeRepo.findById(bonCommandeId)
                .orElseThrow(() -> new IllegalArgumentException("BonCommande not found with id: " + bonCommandeId));
        factureClient.setBonCommande(bonCommande);

        // Generate and set the numeroFacture
        String year = String.valueOf(java.time.LocalDate.now().getYear());
        String lastNumeroFacture = factureClientRepo.findTopByOrderByNumeroFactureDesc().map(FactureClient::getNumeroFacture).orElse(null);
        String newNumeroFacture;

        if (lastNumeroFacture != null && lastNumeroFacture.endsWith(year)) {
            // Extract the number part and increment it
            int lastNumber = Integer.parseInt(lastNumeroFacture.substring(0, lastNumeroFacture.length() - year.length()));
            newNumeroFacture = String.format("%04d%s", lastNumber + 1, year);
        } else {
            // Start with 0001 for the new year
            newNumeroFacture = "0001" + year;
        }
        factureClient.setNumeroFacture(newNumeroFacture);


        return factureClientRepo.save(factureClient);
    }




    /***********************************************/
    @Override
    public List<FactureClient> retrieveAllFactureClients() {
        return factureClientRepo.findAll();
    }

    @Override
    public FactureClient getFactureClientById(Long id) {
        return factureClientRepo.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("FactureClient not found with id: " + id));
    }

    @Override
    public void deleteFactureClient(Long id) {
        factureClientRepo.deleteById(id); // Assuming you have a repository for FactureClient
    }

}
