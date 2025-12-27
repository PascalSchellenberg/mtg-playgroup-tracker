import { useEffect, useState } from "react";
import axios from "axios";

interface Deck {
  id: number;
  name: string;
  owner: string;
  commander: string;
  commanderScryfallId?: string;
}

export default function DeckListPage() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [loading, setLoading] = useState(true);
  

  useEffect(() => {
    const fetchDecks = async () => {
      try {
        const response = await axios.get<Deck[]>(
          "http://localhost:3000/decks"
        );
        setDecks(response.data);
      } catch (err) {
        console.error(err);
        
      } finally {
        setLoading(false);
      }
    };

    fetchDecks();
  }, []);

  if (loading) return <p>Loading decks...</p>;
  
  
  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-2xl font-semibold mb-6">My Decks</h1>

      <div className="space-y-4">
        {decks.map((deck) => (
          <div
            key={deck.id}
            className="bg-white p-4 rounded-lg shadow"
          >
            <h2 className="text-lg font-medium">{deck.name}</h2>
            <p className="text-sm text-gray-600">
              Owner: {deck.owner}
            </p>
            <p className="text-sm text-gray-600">
              Commander: {deck.commander}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}