import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineArrowRight } from "react-icons/ai";
import { CiBookmarkPlus, CiCircleInfo } from "react-icons/ci";
import { GoPlay } from "react-icons/go";
import { Link } from "react-router-dom";
import "./tezkunda.css";
import { tezKunda } from "./../Api/Api";

function Tezkunda() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(tezKunda).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className="container responsMt2 mx-auto">
      {/* Card header */}
      <div className="flex justify-between items-center mt-10 mb-5">
        <h2 className="text-xl font-semibold text-gray-800">
          <div className="flex items-center">
            <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
            <h2 className="text-xl font-semibold text-white">Tez kunda</h2>
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
      <div className="relative overflow-x-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800 scrollbar-hidden">
        <div className="flex resposGap  min-w-max justify-center">
          {" "}
          {data.slice(0, 7).map((item, index) => (
            <div
              key={item.id}
              id={`card-${index}`}
              className="responsMaxwidth  relative cursor-pointer group resposnMB"
            >
              {/* Image */}
              <Link to={`details/${item.id}`}>
                <div>
                  <img
                    className=" w-full h-[190px] md:h-[270px] rounded-lg object-cover"
                    src={item.img}
                    alt={item.title}
                  />
                  <h2 className="text-start mt-1 font-semibold text-white overflow-hidden whitespace-nowrap text-ellipsis -tracking-2">
                    «{item.name}»
                  </h2>

                  {/* Hover Overlay */}
                  <div className="absolute inset-0  bg-opacity-60 rounded-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
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

export default Tezkunda;
