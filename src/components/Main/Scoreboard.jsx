const Scoreboard = function ScoreboardComponent({ bestScore, currentScore }) {
  return (
    <div className="scoreboard">
      <p className="best-score">Best Score: {bestScore}</p>
      <p className="current-score">Score: {currentScore}</p>
    </div>
  );
};

export default Scoreboard;
