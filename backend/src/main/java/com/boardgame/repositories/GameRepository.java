package com.boardgame.repositories;

import com.boardgame.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Integer> {

    @Query(value = "SELECT game_id FROM boardgames.play GROUP BY game_id ORDER BY count(game_id) DESC LIMIT 1", nativeQuery = true)
    Integer getTopGameId();

    @Query(value = "SELECT game_id FROM boardgames.play ORDER BY game_date DESC, id DESC LIMIT 3", nativeQuery = true)
    List<Integer> getThreeLastPlayedGamesId();

}
