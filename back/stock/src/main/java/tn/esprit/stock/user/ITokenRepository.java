package tn.esprit.stock.user;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ITokenRepository extends JpaRepository<Token,Integer> {
    Optional<Token> findByToken(String token);

}
