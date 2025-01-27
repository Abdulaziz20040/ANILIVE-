import React, { useState } from "react";
import { useProduct } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { CiBookmarkPlus, CiCircleInfo } from "react-icons/ci";
import { GoPlay } from "react-icons/go";
import { MdDelete, MdDeleteOutline } from "react-icons/md";
import RelitedAnime from "./ReletedAnime";
import { FaBookmark, FaCaretLeft } from "react-icons/fa";

function Favorites() {
  const { favorite, deleteFromFavorite } = useProduct();
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modalPosition, setModalPosition] = useState("right");

  const navigate = useNavigate();
  const handleDelet = (item) => {
    deleteFromFavorite(item.id);
  };

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

  return (
    <div className="">
      <div className="flex items-center mb-2">
        <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
        <h2 className="text-xl font-semibold text-white">Sevimlilar</h2>
      </div>

      {/* Check if favorite is empty */}
      {favorite.length === 0 ? (
        <div className=" flex items-center gap-3 justify-center">
          <FaBookmark />
          <h1 className="text-center text-white text-xl">
            Hozircha Sevimlar yo'q !
          </h1>
        </div>
      ) : (
        <div className="mt-0 flex flex-col justify-center">
          {/* Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favorite.map((item, index) => (
              <div
                key={item.id}
                id={`card-${index}`}
                className="max-w-[180px] max-h-[270px] relative cursor-pointer group mb-14"
              >
                <Link to={`/details/${item.id}`}>
                  <div>
                    <img
                      className="w-full h-[180px] md:h-[270px] rounded-[13px] object-cover"
                      src={item.img}
                      alt={item.title}
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <div
                        className="absolute top-0 right-[-10px] px-2 py-2 text-black cursor-pointer"
                        onMouseEnter={() => handleMouseEnter(item, index)}
                        onMouseLeave={handleMouseLeave}
                      >
                        <CiCircleInfo className="text-2xl text-white" />
                      </div>
                      <button className="text-white">
                        <GoPlay className="text-white text-6xl transform transition-transform duration-300 group-hover:-translate-y-2" />
                      </button>
                    </div>
                  </div>
                </Link>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-start mt-1 font-semibold text-white line-clamp-1">
                      «{item.name}»
                    </h2>
                    <p className="line-clamp-1 text-stone-300 text-[13px]">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelet(item)}
                    className="px-2 py-2 text-red-500 cursor-pointer"
                  >
                    <MdDelete className="size-[25px]" />
                  </button>
                </div>
                {hoveredItem === item && (
                  <div
                    className={`absolute -top-16 ${
                      modalPosition === "left" ? "right-8" : "left-full"
                    } bacgroountrans ms-2 text-white p-6 w-[280px] rounded-xl shadow-2xl z-20 border border-gray-200`}
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
                        onClick={() => handleDelet(item)}
                        className={`text-2xl ${
                          favorite.some((fav) => fav.id === item.id)
                            ? "text-red-500"
                            : "text-gray-500"
                        }`}
                      >
                        <MdDelete />
                      </button>
                    </div>
                    <p className="text-sm leading-relaxed overflow-y-auto h-[120px] custom-scrollbar mb-6">
                      {item.desc}
                    </p>
                    <div className="space-y-2">
                      <p className="text-sm">
                        <span className="font-medium">Ko'rishlar:</span>{" "}
                        {item.eye}
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
                        <span className="font-medium">Davlati:</span>{" "}
                        {item.Country}
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
        </div>
      )}

      <div className="flex items-center mb-4 mt-[90px]">
        <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
        <h2 className="text-xl font-semibold text-white">
          Sizga yoqishi mumkin
        </h2>
      </div>
      <RelitedAnime />

      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 mb-4 mt-4"
      >
        <FaCaretLeft className="text-[#FC5555] text-[28px]" />
        <h2>Profil</h2>
      </button>
    </div>
  );
}

export default Favorites;
