const Card = function CardComponent() {
  return (
    <div className="card">
      <div className="img-container">
        <img src=""></img>
      </div>
      <div className="pkmn-info-container">
        <p className="pkmn-id">#number</p>
        <div className="pkmn-type"></div>
      </div>
      <div className="pkmn-name">Pokemon</div>
    </div>
  );
};

export default Card;
