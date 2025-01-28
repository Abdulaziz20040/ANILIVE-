import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiBookmarkPlus, CiCircleInfo } from "react-icons/ci";
import { GoPlay } from "react-icons/go";
import { Link } from "react-router-dom";
import { aniDubApi } from "../../Api/Api";
import { useProduct } from "../../context/Context";
import "./../../App.css";

function Newcard() {
  const [data, setData] = useState([]);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [modalPosition, setModalPosition] = useState("right");
  const { addToFavorite, favorite, deleteFromFavorite } = useProduct();

  const handleFavorite = (item) => {
    const isAdded = addToFavorite(item);
    const isInFavorites = favorite.some((fav) => fav.id === item.id);

    if (isInFavorites) {
      deleteFromFavorite(item.id);
      // alert("Removed from favorites");
    } else {
      addToFavorite(item);
      // alert("Added to favorites");
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
    // Calculate the modal position
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
    <div className="container mt-0 mx-auto">
      {/* Card header */}
      <div className="flex justify-between items-center mt-10 mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          <div className="flex items-center">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            <h2 className="text-xl font-semibold text-white">Chiqarilmoqda</h2>
          </div>
        </h2>
        <Link
          to={"allnewCard"}
          className="flex items-center bg-transparent text-gray-500"
        >
          Barchasni ko'rish <AiOutlineArrowRight className="ml-2" />
        </Link>
      </div>

      {/* Cards */}
      <div className="relative ps-[10px] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-hidden">
        <div className="flex gap-8 min-w-max">
          {" "}
          {data.slice(0, 6).map((item, index) => (
            <div
              key={item.id}
              id={`card-${index}`}
              className="max-w-[190px] ms-4 max-h-[260px] relative cursor-pointer group mb-10"
            >
              {/* Image */}
              <Link to={`details/${item.id}`}>
                <div>
                  <img
                    className="w-full h-[190px] md:h-[260px] rounded-lg object-cover"
                    src={item.img}
                    alt={item.title}
                  />

                  {/* Title */}
                  <div className="relative flex flex-col items-start">
                    {/* ID ko'rsatish */}
                    <p className=" text-[#ffbade] absolute -left-7 -top-6 text-lg font-bold">
                      0{item.id}
                    </p>

                    {/* Name ko'rsatish */}
                    <h2
                      className="absolute -left-8 bottom-10 text-start font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis tracking-tight"
                      style={{
                        writingMode: "vertical-lr",
                        textOrientation: "mixed",
                        transform: "rotate(180deg)",
                      }}
                    >
                      {item.name.length > 20
                        ? `${item.name.slice(0, 20)}...`
                        : item.name}
                    </h2>
                  </div>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    {/* Info Icon */}
                    {/* Play Icon */}
                    <button className="text-white">
                      <GoPlay className="text-white text-6xl transform transition-transform duration-300 group-hover:-translate-y-2" />
                    </button>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Newcard;
