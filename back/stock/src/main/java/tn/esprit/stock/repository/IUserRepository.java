package tn.esprit.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface IUserRepository extends JpaRepository<User,Integer> {
    Optional<User> findByEmail(String email);
    List<User> findByFirstnameContainingIgnoreCaseOrLastnameContainingIgnoreCase(String nom, String pre);


}
