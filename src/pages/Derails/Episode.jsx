import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Episode = ({ item }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const episodes = item?.episode?.[0] ? Object.values(item.episode[0]) : [];

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? episodes.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % episodes.length);
  };

  const getDisplayedEpisodes = () => {
    if (episodes.length <= 5) return episodes;

    const end = currentIndex + 5;
    if (end <= episodes.length) {
      return episodes.slice(currentIndex, end);
    }

    return [
      ...episodes.slice(currentIndex),
      ...episodes.slice(0, end - episodes.length),
    ];
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
          <h2 className="text-xl font-semibold text-white">Kadrlar</h2>
        </div>
        <div className="flex justify-between items-center gap-5">
          <button
            className="border-none bg-transparent text-gray-500"
            onClick={handlePrev}
          >
            <FaChevronLeft />
          </button>
          <button
            className="border-none bg-transparent text-gray-500"
            onClick={handleNext}
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mt-5 overflow-hidden">
        {getDisplayedEpisodes().map((epi, index) => (
          <div
            key={index}
            className="group relative w-[280px] h-[160px] sm:h-[180px] cursor-pointer overflow-hidden rounded-xl shadow-md"
          >
            <img
              src={epi}
              alt={`Episode ${currentIndex + index + 1}`}
              className="w-full h-full object-cover transform  group-hover:scale-110 transition duration-500 ease-in-out"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Episode;
