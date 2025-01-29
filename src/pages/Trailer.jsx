import axios from "axios";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { FaPlay } from "react-icons/fa";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Trailer.css";
import { tRailer } from "../Api/Api";

function AutoPlay() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(tRailer)
      .then((res) => {
        setPosts(res.data);
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 1500,
    autoplaySpeed: 3000,
    cssEase: "linear",
    swipe: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container">
      <div className="flex items-center resposMt mb-4">
        <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
        <h2 className="text-xl font-semibold text-white">Trailerlar</h2>
      </div>
      <Slider {...settings}>
        {posts.map((post, index) => (
          <div
            key={index}
            className="relative flex flex-col items-center space-y-2 group resposnMB2"
          >
            {/* Rasm */}
            <img
              className="responsWidth object-cover rounded-lg mb-2"
              src={post.img}
              alt={post.title}
            />

            {/* Play ikonkasi */}
            <div className="absolute inset-0 flex items-center justify-center transition cursor-pointer">
              <div className="w-12 h-12 bg-black bg-opacity-70 rounded-full flex items-center justify-center">
                <FaPlay className="text-white text-xl" />
              </div>
            </div>

            {/* Title */}
            <h3 className="text-center text-lg font-medium">{post.title}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default AutoPlay;
