import axios from "axios";
import React, { useEffect, useState } from "react";
import { GoPlay } from "react-icons/go";
import { Link } from "react-router-dom";
import { aniDubApi } from "../../Api/Api";

function RelitedAnime() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(aniDubApi).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <div className=" mt-0 flex flex-col justify-center">
      {/* Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {data.slice(0, 6).map((item, index) => (
          <div
            key={item.id}
            id={`card-${index}`}
            className="max-w-[200px] max-h-[270px] relative cursor-pointer group mb-14"
          >
            <Link to={`/details/${item.id}`}>
              <div className="relative">
                {/* Image */}
                <img
                  className="w-full h-[200px] md:h-[270px] rounded-[13px] object-cover"
                  src={item.img}
                  alt={item.title}
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
                «{item.name}»
              </h2>
              <p className="line-clamp-1 text-stone-300 text-[13px]">
                {item.desc}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default RelitedAnime;
