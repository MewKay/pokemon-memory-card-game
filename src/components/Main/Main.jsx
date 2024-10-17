import CardGrid from "./CardGrid";
import Scoreboard from "./Scoreboard";

const Main = function MainContentComponent() {
  let bestScore = 0;
  let currentScore = 0;

  return (
    <main>
      <Scoreboard bestScore={bestScore} currentScore={currentScore} />
      <CardGrid />
    </main>
  );
};

export default Main;
