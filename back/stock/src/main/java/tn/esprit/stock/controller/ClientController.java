package tn.esprit.stock.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import tn.esprit.stock.entities.Client;
import tn.esprit.stock.services.IGestionClient;

import java.util.List;

@RestController
@RequestMapping("/user/client")
@CrossOrigin
public class ClientController {
    @Autowired
    private IGestionClient IgClient;

    @PostMapping("/add")
    public Client addClient(@RequestBody Client client) {
        return IgClient.addClient(client);
    }

    @GetMapping("/getAll")
    public List<Client> findAll() {
        return IgClient.findAll();
    }

    @GetMapping("/{id}")
    public Client findById(@PathVariable Long id) {
        return IgClient.findById(id);
    }

    @PutMapping("/update")
    public Client updateClient(@RequestBody Client client) {
        return IgClient.updateClient(client);
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        IgClient.delete(id);
    }

}
