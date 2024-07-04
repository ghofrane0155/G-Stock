package tn.esprit.stock.services;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.stock.repository.IUserRepository;

@AllArgsConstructor
@Service
public class GestionUserImpl implements IGestionUser{
    IUserRepository userRepo;
}
