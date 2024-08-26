package tn.esprit.stock.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import tn.esprit.stock.entities.FactureClient;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface IFactureClientRepository extends JpaRepository<FactureClient,Long> {
    /*@Query("SELECT f FROM FactureClient f WHERE YEAR(f.dateFactureClient) = :year ORDER BY f.idFactureClient DESC")
    List<FactureClient> findLatestByYear(@Param("year") int year);*/

    Optional<FactureClient> findTopByOrderByNumeroFactureDesc();


}
