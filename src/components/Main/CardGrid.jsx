import Card from "./Card";

const CardGrid = function CardGridComponent() {
  let cards = new Array(12).fill(null);

  return (
    <div className="card-grid">
      {cards.map((card, index) => (
        <Card key={crypto.randomUUID()} />
      ))}
    </div>
  );
};

export default CardGrid;
