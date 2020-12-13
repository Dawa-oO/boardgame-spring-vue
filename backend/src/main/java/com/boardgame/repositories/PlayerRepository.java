package com.boardgame.repositories;

import com.boardgame.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlayerRepository extends JpaRepository<Player, Integer> {

    @Query(value = "SELECT winner_id FROM boardgames.play GROUP BY winner_id ORDER BY count(winner_id) DESC LIMIT 1", nativeQuery = true)
    Integer getTopPlayerId();

    List<Player> findByPseudo(String pseudo);
}
