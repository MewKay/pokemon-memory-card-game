import { useState } from "react";
import Card from "./Card";

const shuffleArray = function shuffleArray(array) {
  let newArr = structuredClone(array);

  for (let i = newArr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }

  return newArr;
};

const generateArray = function generateArrayOf12RandomIDs() {
  let array = [];
  const ARRAY_MAX_LENGTH = 12;
  const POKEMON_ID_START = 1;
  const POKEMON_ID_END = 1024;

  for (let i = 0; i < ARRAY_MAX_LENGTH; i += 1) {
    const numberToInsert =
      Math.floor(Math.random() * (POKEMON_ID_END - POKEMON_ID_START + 1)) +
      POKEMON_ID_START;
    array.push(numberToInsert);
  }

  return array;
};

const CardGrid = function CardGridComponent({ handleAddScore }) {
  const [currentPokemonIDs, setCurrentPokemonIDs] = useState(generateArray());

  const handleShuffle = function handleShuffleIDCardsPosition() {
    setCurrentPokemonIDs(shuffleArray(currentPokemonIDs));
  };

  return (
    <div className="card-grid">
      {currentPokemonIDs.map((pokemonID) => (
        <Card
          key={pokemonID}
          pokemonID={pokemonID}
          handleShuffleCards={handleShuffle}
          handleAddScore={handleAddScore}
        />
      ))}
    </div>
  );
};

export default CardGrid;
