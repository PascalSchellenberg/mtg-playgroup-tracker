import { useState } from "react";
import axios from "axios";

export default function CreateDeckPage() {
  const [owner, setOwner] = useState("");
  const [deckName, setDeckName] = useState("");
  const [commander, setCommander] = useState("");
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        console.log("posting");
        const response = await axios.post("http://localhost:3000/decks",{
            owner,
            deckName,
            commander,
    });
    console.log("Deck created:", response.data);
    alert("Deck created successfully!");


    setOwner("");
    setDeckName("");
    setCommander("");

    } catch (error) {
        console.error("Error creating deck", error);
        alert("Failed to create Deck");
    }
    
  };


  return (
    <div className="min-h-screen bg-grey-400 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border-solid">
        <h1 className="text-2xl font-semibold mb-6 text-center">
          Create New Deck
        </h1>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium mb-1">
              Owner
            </label>
            <input
              type="text"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Owner of the Deck"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Deck Name
            </label>
            <input
              type="text"
              value={deckName}
              onChange={(e) => setDeckName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="cool unique deck name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Commander
            </label>
            <input
              type="text"
              value={commander}
              onChange={(e) => setCommander(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Sygg"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Create Deck
          </button>
        </form>
      </div>
    </div>
  );
}
