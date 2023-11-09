import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [cards, setCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);

  const loadMore = (page) => {
    setLoading(true);
    axios
      .get(
        `https://api.magicthegathering.io/v1/cards?name=${searchTerm}&pageSize=20&page=${page}`
      )
      .then((response) => {
        if (page === 1) {
          setCards([...response.data.cards]);
        } else {
          setCards([...cards, ...response.data.cards]);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    loadMore(1); // Load the first page of cards
  }, [searchTerm]);

  const handleSearch = () => {
    setCards([]);
    loadMore(1); // Reset the page to 1 when searching
  };

  return (
    <div className="bg-gray-100 p-4">
      <div className="bg-black p-4 mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-semibold text-white">Card Display App</h1>
        <div className="relative w-1/3">
          <input
            type="text"
            placeholder="Search for cards..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
          <button
            onClick={handleSearch}
            className="absolute top-0 right-0 bg-blue-500 text-white rounded-r-lg py-2 px-4 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {cards.map((card) => (
          <div key={card.id} className="bg-white shadow-md rounded-lg overflow-hidden">
            <div className="w-full h-48">
              <img
                src={card.imageUrl}
                alt={card.name}
                onError={(e) => {
                  e.target.src = 'placeholder-image-url.jpg'; // Replace with a placeholder image URL
                }}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold mb-2">{card.name}</h3>
              <p className="text-sm text-gray-700 dark:text-gray-400">
                {/* Add card description or other information here */}
              </p>
            </div>
          </div>
        ))}
      </div>
     
      {loading && <p className="text-center my-4">Loading...</p>}
      <button
        onClick={loadMore}
        disabled={loading}
        className="block mx-auto bg-blue-500 text-white py-2 px-4 rounded-lg text-center mt-4 hover:bg-blue-600 focus:ring-2 focus:ring-blue-500 focus:outline-none"
      >
        Load More
      </button>
    </div>
  );
}

export default App;

