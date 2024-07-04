package tn.esprit.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.User;

@Repository
public interface IUserRepository extends JpaRepository<User,Long> {
}
