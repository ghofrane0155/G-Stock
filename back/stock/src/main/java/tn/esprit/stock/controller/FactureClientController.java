package tn.esprit.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stock.entities.FactureClient;
import tn.esprit.stock.services.IGestionFactureClient;

import java.util.List;

@RestController
@RequestMapping("/user/FactureClient")
@CrossOrigin
public class FactureClientController {
    @Autowired
    IGestionFactureClient IgFactureClient;

    @GetMapping("/getAll")
    public List<FactureClient> retrieveAllFactureClients(){
        return IgFactureClient.retrieveAllFactureClients();
    }

    @PostMapping("/add/{bonCommandeId}")
    public FactureClient addFactureClient(@RequestBody FactureClient factureClient,@PathVariable("bonCommandeId") Long bonCommandeId) {
        return IgFactureClient.addFactureClient(factureClient,bonCommandeId);
    }

    /*******************************/
    @GetMapping("/{id}")
    public ResponseEntity<FactureClient> getFactureClientById(@PathVariable Long id) {
        FactureClient factureClient = IgFactureClient.getFactureClientById(id);
        return ResponseEntity.ok(factureClient);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFactureClient(@PathVariable Long id) {
        IgFactureClient.deleteFactureClient(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/ByBonCommandeId/{bonCommandeId}")
    public ResponseEntity<FactureClient> getFactureByBonCommandeId(@PathVariable Long bonCommandeId) {
        FactureClient factureClient = IgFactureClient.getFactureByBonCommandeId(bonCommandeId);
        return ResponseEntity.ok(factureClient);    }
}
