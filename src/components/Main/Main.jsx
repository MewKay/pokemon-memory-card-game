import { useState } from "react";
import CardGrid from "./CardGrid";
import Scoreboard from "./Scoreboard";

const Main = function MainContentComponent() {
  let bestScore = 0;
  const [currentScore, setCurrentScore] = useState(0);

  const handleAddScore = function handleAddScore() {
    const newScore = currentScore + 1;
    setCurrentScore(newScore);
  };

  return (
    <main>
      <Scoreboard bestScore={bestScore} currentScore={currentScore} />
      <CardGrid handleAddScore={handleAddScore} />
    </main>
  );
};

export default Main;
