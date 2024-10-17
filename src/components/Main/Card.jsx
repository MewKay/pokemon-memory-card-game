const Card = function CardComponent({
  pokemonID,
  handleAddScore,
  handleShuffleCards,
}) {
  const handleCardClick = function handleCardClick() {
    handleAddScore();
    handleShuffleCards();
  };

  return (
    <div className="card" onClick={handleCardClick}>
      <div className="img-container">
        <img src=""></img>
      </div>
      <div className="pkmn-info-container">
        <p className="pkmn-id">#{pokemonID}</p>
        <div className="pkmn-type"></div>
      </div>
      <div className="pkmn-name">Pokemon</div>
    </div>
  );
};

export default Card;
