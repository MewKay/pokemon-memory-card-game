import { useState } from "react";
import CardGrid from "./CardGrid";
import Scoreboard from "./Scoreboard";

const Main = function MainContentComponent() {
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [passedClickedIDs, setPassedClickedIds] = useState([]);

  const handleAddScore = function incrementScoreAndAddIDtoPassedArray(
    pokemonIDpassed
  ) {
    if (passedClickedIDs.includes(pokemonIDpassed)) {
      setCurrentScore(0);
      setPassedClickedIds([]);
      return;
    }

    const newScore = currentScore + 1;

    if (newScore > bestScore) {
      setBestScore(newScore);
    }

    setCurrentScore(newScore);
    setPassedClickedIds([...passedClickedIDs, pokemonIDpassed]);
  };

  return (
    <main>
      <Scoreboard bestScore={bestScore} currentScore={currentScore} />
      <CardGrid handleAddScore={handleAddScore} />
    </main>
  );
};

export default Main;
