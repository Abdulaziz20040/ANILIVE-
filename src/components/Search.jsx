import React, { useEffect, useRef, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoSearch } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useProduct } from "../context/Context";
import { Link } from "react-router-dom";
import { GoPlay } from "react-icons/go";

function Search() {
  const navigate = useNavigate();
  const { searchTerm, handleSearchChange } = useProduct();
  const inputRef = useRef();
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

  // API ma'lumotlarini olish
  const fetchProducts = async () => {
    try {
      const response = await fetch(
        "https://a510c4f98367eca1.mokky.dev/ANILIVE"
      );
      const data = await response.json();
      setFilteredProducts(data);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };

  useEffect(() => {
    fetchProducts(); // API'dan ma'lumotlarni olish
  }, []);

  // Sahifa yuklanganda inputga fokus berish
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  // Search queryni filtrlash
  const handleFilter = (term) => {
    if (!term) {
      setFilteredProducts(filteredProducts); // Hech qanday filtr bo'lmasa, barcha mahsulotlarni ko'rsatish
    } else {
      const filtered = filteredProducts.filter((product) => {
        return (
          product.name &&
          product.name.toLowerCase().includes(term.toLowerCase())
        );
      });
      setFilteredProducts(filtered);
    }
  };

  // Search input o'zgarganda
  useEffect(() => {
    handleFilter(searchTerm);
  }, [searchTerm, filteredProducts]);

  return (
    <div className="container relative mx-auto p-6 text-white">
      <IoMdClose
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 text-[25px] cursor-pointer"
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
            <IoSearch className="text-[24px]" />
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
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {searchTerm && (
          <div className="search-results">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((result, index) => (
                <div
                  key={index}
                  id={`card-${index}`}
                  className="max-w-[200px] max-h-[270px] relative cursor-pointer group mb-14"
                >
                  <Link to={`/details/${result.id}`}>
                    <div className="relative">
                      {/* Image */}
                      <img
                        className="w-full h-[200px] md:h-[270px] rounded-[13px] object-cover"
                        src={result.img}
                        alt={result.name}
                      />

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black bg-opacity-0 rounded-[13px] flex items-center justify-center group-hover:bg-opacity-50 transition-all duration-300 z-10">
                        {/* Play Icon */}
                        <button className="text-white opacity-0 group-hover:opacity-100 transform translate-y-[150%] group-hover:translate-y-0 transition-all duration-300">
                          <GoPlay className="text-white text-4xl" />
                        </button>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-start mt-1 font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis -tracking-2">
                      «{result.name}»
                    </h2>
                    <p className="line-clamp-1 text-stone-300 text-[13px]">
                      {result.desc}
                    </p>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-400">
                Hech qanday natija topilmadi.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Search;
