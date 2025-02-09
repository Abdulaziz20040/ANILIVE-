import axios from "axios";
import React, { useEffect, useState } from "react";
import { CiBookmarkPlus, CiCircleInfo } from "react-icons/ci";
import { GoPlay } from "react-icons/go";
import { Link } from "react-router-dom";
import { aniDubApi } from "../../Api/Api";
import { useProduct } from "../../context/Context";
import "../tezKunda/tezkunda.css";

function Allnewcard() {
  const [data, setData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modalPosition, setModalPosition] = useState("right");
  const [cardsToShow, setCardsToShow] = useState(18); // Initial cards to show
  const { addToFavorite, favorite, deleteFromFavorite } = useProduct();

  const handleFavorite = (item) => {
    const isAdded = addToFavorite(item);
    const isInFavorites = favorite.some((fav) => fav.id === item.id);

    if (isInFavorites) {
      deleteFromFavorite(item.id);
    } else {
      addToFavorite(item);
    }
  };

  useEffect(() => {
    axios
      .get(aniDubApi)
      .then((res) => {
        const validData = res.data.filter(
          (item) => item.data && !isNaN(new Date(item.data))
        );

        const sortedData = validData.sort(
          (a, b) => new Date(b.data) - new Date(a.data)
        );

        const latestDate =
          sortedData.length > 0 ? new Date(sortedData[0].data) : null;

        const latestData = sortedData.filter(
          (item) => new Date(item.data).getTime() === latestDate.getTime()
        );

        setData(latestData);
      })
      .catch((error) => {
        console.error("Error occurred:", error);
      });
  }, []);

  const handleMouseEnter = (item, index) => {
    const card = document.getElementById(`card-${index}`);
    if (card) {
      const cardRect = card.getBoundingClientRect();
      if (cardRect.right + 300 > window.innerWidth) {
        setModalPosition("left");
      } else {
        setModalPosition("right");
      }
    }
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const loadMoreCards = () => {
    setCardsToShow(cardsToShow + 18);
  };

  return (
    <div className="container mt-5 flex flex-col justify-center">
      <div className="flex justify-between items-center mt-2 mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          <div className="flex items-center">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            <Link to={"/"}>
              <h2 className="text-xl font-semibold text-white">
                Orqaga qaytish
              </h2>
            </Link>
          </div>
        </h2>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 resposGap2 ">
        {data.slice(0, cardsToShow).map((item, index) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className=" resposncardMAxwidth relative cursor-pointer group mb-4"
          >
            {/* Image */}
            <div>
              <Link to={`details/${item.id}`}>
                <img
                  className="w-full h-[200px] md:h-[270px] rounded-[13px] object-cover"
                  loading="lazy"
                  src={item.img}
                  alt={item.title}
                />
              </Link>

              {/* Title */}
              <h2 className="text-start mt-1  font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis -tracking-2">
                «{item.name}»
              </h2>
              <p className="line-clamp-1 text-stone-300 text-[13px]">
                {item.desc}
              </p>

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-opacity-60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                {/* Info Icon */}
                <div
                  className="absolute top-0 right-[-10px] px-2 py-2 text-black cursor-pointer hidden sm:block"
                  onMouseEnter={() => handleMouseEnter(item, index)}
                  onMouseLeave={handleMouseLeave}
                >
                  <CiCircleInfo className="text-2xl text-white" />
                </div>

                {/* Play Icon */}
                <button className="text-white">
                  <GoPlay className="text-white text-6xl transform transition-transform duration-300 group-hover:-translate-y-2" />
                </button>
              </div>
            </div>

            {/* Modal */}
            {hoveredItem === item && (
              <div
                className={`absolute -top-16 ${
                  modalPosition === "left" ? "right-8" : "left-full"
                } bacgroountrans ms-2 text-white p-6 w-[280px] rounded-xl  z-20 border border-gray-200`}
                onMouseEnter={() => handleMouseEnter(item, index)}
                onMouseLeave={handleMouseLeave}
              >
                <div className="w-full flex items-start justify-between">
                  <h2 className="text-2xl font-semibold mb-3">
                    <Link
                      to={`/details/${item.id}`}
                      className="hover:text-blue-200"
                    >
                      <q>{item.name}</q>
                    </Link>
                  </h2>
                  <button
                    onClick={() => handleFavorite(item)}
                    className={`text-3xl ${
                      favorite.some((fav) => fav.id === item.id)
                        ? "text-red-500"
                        : "text-gray-500"
                    }`}
                  >
                    <CiBookmarkPlus />
                  </button>
                </div>
                <p className="text-sm leading-relaxed overflow-y-auto h-[120px] custom-scrollbar mb-6">
                  {item.desc}
                </p>

                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="font-medium">Ko'rishlar:</span> {item.eye}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Rejissyor:</span>{" "}
                    {item.Director}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Qisimlar:</span>{" "}
                    {item.NumberParts}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Davlati:</span> {item.Country}
                  </p>
                  <p className="text-sm">
                    <span className="font-medium">Yili:</span> {item.data}
                  </p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Show More Button */}
      {cardsToShow < data.length && (
        <div className="flex justify-center mt-4 mb-10">
          <button
            onClick={loadMoreCards}
            className="bg-[#F81539] text-white py-2 px-6 rounded-full hover:bg-red-600 transition duration-300"
          >
            Ko'proq ko'rsatish
          </button>
        </div>
      )}
    </div>
  );
}

export default Allnewcard;
