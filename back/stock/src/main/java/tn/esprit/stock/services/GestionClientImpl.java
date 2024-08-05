package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.entities.Client;
import tn.esprit.stock.repository.IClientRepository;

import java.util.List;

@AllArgsConstructor
@Service
public class GestionClientImpl implements IGestionClient{
    IClientRepository clientRepo;

    @Override
    public Client addClient(Client c) {
        return clientRepo.save(c);
    }

    @Override
    public List<Client> findAll() {
        return clientRepo.findAll();
    }

    @Override
    public Client findById(Long id) {
        return clientRepo.findById(id).get();
    }

    @Override
    public Client updateClient(Client c) {
        return clientRepo.save(c);
    }

    @Override
    public void delete(Long id) {
        clientRepo.deleteById(id);
    }
}
