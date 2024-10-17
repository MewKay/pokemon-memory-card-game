const Card = function CardComponent({
  pokemonID,
  pokemonSprite,
  pokemonTypes,
  pokemonName,
  handleAddScore,
  handleShuffleCards,
}) {
  const handleCardClick = function handleCardClick() {
    handleAddScore(pokemonID);
    handleShuffleCards();
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="img-container">
        <img src={pokemonSprite} alt={`${pokemonName} image`} />
      </div>
      <div className="pkmn-info-container">
        <p className="pkmn-id">#{pokemonID}</p>
        <div className="pkmn-type">
          {pokemonTypes.map((type) => (
            <img key={type.spriteURL} src={type.spriteURL} alt={type.name} />
          ))}
        </div>
      </div>
      <div className="pkmn-name">{pokemonName}</div>
    </div>
  );
};

export default Card;
