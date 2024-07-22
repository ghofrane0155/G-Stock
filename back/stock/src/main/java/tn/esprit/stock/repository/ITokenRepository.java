package tn.esprit.stock.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.Token;

import java.util.List;
import java.util.Optional;

@Repository
public interface ITokenRepository extends JpaRepository<Token,Integer> {
   /* @Query(value = """
      select t from Token t inner join User u
      on t.user.id = u.id
      where u.id = :id and t.loggedOut = false and t.revoked = false
      """)
    List<Token> findAllValidTokenByUser(@Param("id") Integer id);*/

    Optional<Token> findByToken(String token);
    List<Token> findByUserId(Integer userId);



}
