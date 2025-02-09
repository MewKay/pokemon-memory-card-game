import title from "../../assets/pokemonMemoryGameTitle.png";

const Header = function HeaderComponent() {
  return (
    <header>
      <div className="title-container">
        <img src={title} alt="Pokemon Memory Card Game" />
      </div>
      <p>
        Click a card to gain a point. Do not click on the same card twice or you
        will loose the game. Try to get to 12 points to win!!
      </p>
    </header>
  );
};

export default Header;
