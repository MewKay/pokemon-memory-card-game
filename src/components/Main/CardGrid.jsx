import Card from "./Card";

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

const CardGrid = function CardGridComponent() {
  let cards = generateArray();

  return (
    <div className="card-grid">
      {cards.map((pokemonID) => (
        <Card key={pokemonID} />
      ))}
    </div>
  );
};

export default CardGrid;
