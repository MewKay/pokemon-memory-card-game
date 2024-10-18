import { useEffect, useState } from "react";
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
  const POKEMON_ID_END = 1025;

  for (let i = 0; i < ARRAY_MAX_LENGTH; i += 1) {
    const numberToInsert =
      Math.floor(Math.random() * (POKEMON_ID_END - POKEMON_ID_START + 1)) +
      POKEMON_ID_START;
    array.push(numberToInsert);
  }

  return array;
};

const fetchSprite = function fetchSprite(pokeData) {
  return pokeData.sprites.other["official-artwork"].front_default;
};

const fetchName = async function fetchNameFromSpecies(pokeData) {
  const API_REQUEST_URL = pokeData.species.url;

  const response = await fetch(API_REQUEST_URL, { mode: "cors" });
  if (!response.ok) {
    throw new Error(`Fetch Name: ${response.status}`);
  }

  const species = await response.json();
  // pokemon-species starting from id 1010 have their english name at index 7 instead of 8
  const name =
    species.id > 1010 ? species.names[7].name : species.names[8].name;

  return name;
};

const fetchTypes = async function fetchTypesSpritesFromPokeData(pokeData) {
  const API_REQUEST_URLs = pokeData.types.map((type) => type.type.url);

  const responses = await Promise.all(
    API_REQUEST_URLs.map((url) => fetch(url, { mode: "cors" }))
  );
  responses.forEach((response) => {
    if (!response.ok) {
      throw new Error(`Fetch Types: ${response.status}`);
    }
  });

  const typeData = await Promise.all(
    responses.map((response) => response.json())
  );
  const types = typeData.map((type) => {
    return {
      name: type.names[7].name,
      spriteURL: type.sprites["generation-viii"]["sword-shield"].name_icon,
    };
  });

  return types;
};

const fetchPokemonData = async function fetchPokemonData(pokemonID) {
  const API_REQUEST_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;

  const response = await fetch(API_REQUEST_URL, { mode: "cors" });
  if (!response.ok) {
    throw new Error(`Fetch Data: ${response.status}`);
  }

  const pokeData = await response.json();

  return {
    id: pokemonID,
    sprite: fetchSprite(pokeData),
    name: await fetchName(pokeData),
    types: await fetchTypes(pokeData),
  };
};

const CardGrid = function CardGridComponent({ handleAddScore }) {
  const [currentPokemonIDs, setCurrentPokemonIDs] = useState(generateArray());
  const [pokeDatas, setPokeDatas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const updatePokeDatas = async function updatePokeDatas() {
      try {
        const newPokeDatas = await Promise.all(
          currentPokemonIDs.map((pokemonID) => fetchPokemonData(pokemonID))
        );

        setPokeDatas(newPokeDatas);
        setError(null);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    updatePokeDatas();
  }, [currentPokemonIDs]);

  const handleShuffle = function handleShuffleIDCardsPosition() {
    setCurrentPokemonIDs(shuffleArray(currentPokemonIDs));
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <p className="loading-text">Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="card-grid">
      {pokeDatas.map((data) => (
        <Card
          key={data.id}
          pokemonID={data.id}
          pokemonSprite={data.sprite}
          pokemonName={data.name}
          pokemonTypes={data.types}
          handleShuffleCards={handleShuffle}
          handleAddScore={handleAddScore}
        />
      ))}
    </div>
  );
};

export default CardGrid;
