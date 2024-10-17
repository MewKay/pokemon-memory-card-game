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

  try {
    const response = await fetch(API_REQUEST_URL, { mode: "cors" });
    if (!response.ok) {
      throw new Error(response.status);
    }

    const species = await response.json();
    const name = species.names[8].name;

    return name;
  } catch (error) {
    console.error("Fetch Name", error);
  }
};

const fetchTypes = async function fetchTypesSpritesFromPokeData(pokeData) {
  const API_REQUEST_URLs = pokeData.types.map((type) => type.type.url);

  try {
    const responses = await Promise.all(
      API_REQUEST_URLs.map((url) => fetch(url, { mode: "cors" }))
    );
    responses.forEach((response) => {
      if (!response.ok) {
        throw new Error(response.status);
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
  } catch (error) {
    console.error("Fetch Types", error);
  }
};

const fetchPokemonData = async function fetchPokemonData(pokemonID) {
  const API_REQUEST_URL = `https://pokeapi.co/api/v2/pokemon/${pokemonID}`;

  try {
    const response = await fetch(API_REQUEST_URL, { mode: "cors" });
    if (!response.ok) {
      throw new Error(response.status);
    }

    const pokeData = await response.json();

    return {
      id: pokemonID,
      sprite: fetchSprite(pokeData),
      name: await fetchName(pokeData),
      types: await fetchTypes(pokeData),
    };
  } catch (error) {
    console.error("Fetch Data", error);
  }
};

const CardGrid = function CardGridComponent({ handleAddScore }) {
  const [currentPokemonIDs, setCurrentPokemonIDs] = useState(generateArray());
  const [pokeDatas, setPokeDatas] = useState([]);

  useEffect(() => {
    const updatePokeDatas = async function updatePokeDatas() {
      const newPokeDatas = await Promise.all(
        currentPokemonIDs.map((pokemonID) => fetchPokemonData(pokemonID))
      );

      setPokeDatas(newPokeDatas);
    };

    updatePokeDatas();
  }, [currentPokemonIDs]);

  const handleShuffle = function handleShuffleIDCardsPosition() {
    setCurrentPokemonIDs(shuffleArray(currentPokemonIDs));
  };

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
