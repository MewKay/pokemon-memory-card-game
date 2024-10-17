const CardGrid = function CardGridComponent() {
  let cards = new Array(12).fill(null);

  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <div className="card" key={crypto.randomUUID()}>
          Card {index}
        </div>
      ))}
    </div>
  );
};

export default CardGrid;
