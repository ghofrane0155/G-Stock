package tn.esprit.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
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

    @PostMapping("/add")
    public FactureClient addFactureClient(@RequestBody FactureClient factureClient) {
        return IgFactureClient.addFactureClient(factureClient);
    }


}
