// GameList.js
import React, { useEffect, useState } from 'react';
import './GameList.css';

const GameList = () => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch('/live-scores');
        const data = await response.json();
        // Check if the data array is not empty and the games are "Scheduled"
        const scheduledGames = data.filter(game => game.Status === "Scheduled");
        setGames(scheduledGames); // Set the filtered games data
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data: ', error);
        setLoading(false);
      }
    };

    fetchScores();
  }, []);

  return (
    <div className="game-list">
      {loading && <div>Loading...</div>}
      {!loading && games.length === 0 && <div>No live games currently.</div>}
      {!loading && games.map((game) => (
        <div key={game.GameID} className="game">
          <div className="teams">
            {game.AwayTeam} @ {game.HomeTeam}
          </div>
          <div className="scores">
            {game.AwayTeamScore ?? 'TBD'} - {game.HomeTeamScore ?? 'TBD'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default GameList;
