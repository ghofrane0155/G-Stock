package tn.esprit.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.Token;

import java.util.List;
import java.util.Optional;

@Repository
public interface ITokenRepository extends JpaRepository<Token,Integer> {
    Optional<Token> findByToken(String token);
    List<Token> findByUserId(Integer userId);



}
