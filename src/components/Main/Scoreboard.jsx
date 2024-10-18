const Scoreboard = function ScoreboardComponent({ bestScore, currentScore }) {
  return (
    <div className="scoreboard">
      <div className="container">
        <p className="best-score">Best Score: {bestScore}</p>
        <p className="current-score">Score: {currentScore}</p>
      </div>
    </div>
  );
};

export default Scoreboard;
