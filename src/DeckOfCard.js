import { useEffect, useState } from "react";
import axios from "axios";

const DeckOfCard = () => {
  const [deck, setDeck] = useState(null);
  const [card, setCard] = useState(null);
  const url = "https://deckofcardsapi.com/api/deck";

  useEffect(() => {
    async function fetchDeck() {
      const res = await axios.get(`${url}/new/shuffle/?deck_count=1`);
      setDeck(res.data);
    }
    fetchDeck();
  }, []);

  const getCard = async () => {
    const res = await axios.get(`${url}/${deck.deck_id}/draw/?count=1`);
    console.log(res);
    setCard(res.data);
  };

  const shuffleDeck = async () => {
    const res = await axios.get(`${url}/new/shuffle/?deck_count=1`);
    console.log(res);
    setDeck(res.data);
    setCard(null);
  };
  const handleDraw = (e) => {
    e.preventDefault();
    getCard();
  };

  const handleShuffle = (e) => {
    e.preventDefault();
    shuffleDeck();
  };

  return (
    <div>
      <button onClick={handleDraw}> Draw a Card </button>
      <button onClick={handleShuffle}> Shuffle the Deck </button>
      {card ? (
        <span>
          <img src={card.cards[0].image} alt={card.cards[0].code} />{" "}
        </span>
      ) : (
        <h3> Click Draw a Card to Display New Card! </h3>
      )}
    </div>
  );
};
export default DeckOfCard;
