import { useEffect, useState } from "react";

export default function App() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("https://ai-agent-systems-suite-1.onrender.com/cards")
      .then(res => res.json())
      .then(data => setCards(data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>Kanban Board</h1>

      {cards.length === 0 ? (
        <p>Loading...</p>
      ) : (
        cards.map((c, i) => (
          <div key={i} style={{
            border: "1px solid black",
            margin: "10px",
            padding: "10px"
          }}>
            <h3>{c.title}</h3>
            <p>{c.description}</p>
          </div>
        ))
      )}
    </div>
  );
}