package tn.esprit.stock.services;

import tn.esprit.stock.entities.User;

import java.util.List;
import java.util.Optional;

public interface IGestionUser {
    List<User> findAll();
    User findById (Integer id);
    Optional<User> findByEmail (String email);
    List<User> findByNomOrPrenom(String name,String pre);

    User update(User user);
    void delete(Integer id);
}
