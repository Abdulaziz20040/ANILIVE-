import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/Context";

function Search() {
  const navigate = useNavigate();
  const { searchTerm, handleSearchChange } = useProduct();
  const inputRef = useRef();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const genres = [
    "Syonen",
    "Ongoing",
    "Romantika",
    "Drama",
    "Sarguzasht",
    "Fantastika",
    "Maktab",
    "Super kuch",
    "Sport",
    "Bolalar uchun",
    "O'zga Dunyo",
    "Sehr",
    "Detektiv",
    "Kundalik hayot",
    "O'yinlar",
    "2024",
    "2023",
  ];

  // API orqali ma'lumotlarni olish

  // Sahifa yuklanganda inputga fokus berish
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  return (
    <div className="container relative mx-auto p-6 text-white">
      <IoMdClose
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 size-[25px] cursor-pointer"
      />
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg mt-10">
        {/* Search Input */}
        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            placeholder="Izlang..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full p-3 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-red-500 bg-gray-700 placeholder-gray-400"
          />
          <span className="absolute top-3 right-3 text-gray-400">
            <IoSearch className="size-[24px]" />
          </span>
        </div>

        {/* Genres Section */}
        <div className="mt-6 flex flex-wrap gap-3">
          {genres.map((genre, index) => (
            <button
              key={index}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-sm shadow-md"
            >
              {genre}
            </button>
          ))}
        </div>
      </div>

      {/* Search Results */}
      <div className="mt-8">
        {searchTerm && (
          <div className="search-results">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((result, index) => (
                <div key={index} className="mb-4">
                  <img
                    src={result.image}
                    alt={result.title}
                    className="w-32 h-32 object-cover rounded-lg"
                  />
                  <p>{result.title}</p>
                </div>
              ))
            ) : (
              <p>Hech qanday natija topilmadi.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
