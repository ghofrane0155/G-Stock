package tn.esprit.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.Role;

import java.util.Optional;

@Repository
public interface IRoleRepository extends JpaRepository<Role,Integer> {
    Optional<Role> findByName(String role);
}
