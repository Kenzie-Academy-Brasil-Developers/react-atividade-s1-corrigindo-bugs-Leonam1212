import CardsList from "./components/cards-list";
import {useEffect, useState} from "react";
import "./App.css";

 const App = () => {
  const [showDeck, setShowDeck] = useState(false);
  const [cardsList, setCardsList] = useState([]);
  const [deck, setDeck] = useState("");

  const handleDeckRequest = () => {
    fetch("https://deckofcardsapi.com/api/deck/new/")
      .then((res) => res.json())
      .then((res) => setDeck(res));
  };

  const handleCardsRequest = (deckId) => {
    fetch(`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=52`)
      .then((res) => res.json())
      .then((res) => setCardsList([...res.cards]));
  };

useEffect(() => {
    handleDeckRequest();
}, [deck]);

const handleShowDeck = () => {
      setShowDeck(!showDeck);
      handleCardsRequest(deck.deck_id);
  };

  return (
    <div className="main-container">
      <h1 className="main-title">Debugue para ver o baralho</h1>
      <button onClick={handleShowDeck} className="new-deck-button">
        Novo baralho
      </button>
      {showDeck && <CardsList cardsList={cardsList} />}
    </div>
  );
};


export default App