import { useState, useEffect } from "react";
import axios from "axios";
import "tailwindcss/tailwind.css";
import {
  FaAngleRight,
  FaChevronLeft,
  FaChevronRight,
  FaPlayCircle,
} from "react-icons/fa";
import Header from "../../../components/Header";
import { slider } from "../../../Api/Api";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "../../Home/Slider/slider.css";

const Animation = () => {
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(slider)
      .then((res) => {
        setSlides(res.data || []);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching slides:", error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (slides.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
      }, 6000);

      return () => clearInterval(interval);
    }
  }, [slides]);

  const handlePrevSlide = () => {
    setCurrentSlide((prevSlide) =>
      prevSlide === 0 ? slides.length - 1 : prevSlide - 1
    );
  };

  const handleNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % slides.length);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <Skeleton count={5} height={150} />
      </div>
    );
  }

  if (slides.length === 0) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-200">
        <Skeleton count={4} height={150} />
      </div>
    );
  }

  return (
    <div>
      <div className="relative w-full h-[55vh] sm:h-[67vh] md:h-[80vh] lg:h-[90vh] xl:h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="absolute top-0 left-0 w-full z-30">
          <Header />
        </div>

        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            {/* Background Image */}
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url(${slide.bacgroundImg})`,
              }}
            ></div>

            {/* Gradient Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/40 to-transparent opacity-90"></div>

            {/* Slide Content */}
            <div className="relative z-10 text-white SliderTop px-4 md:px-12">
              <div>
                <h3 className="mb-4 titfd line-clamp-2">{slide.name}</h3>

                {/* Description (hidden on mobile) */}
                <p className="mt-4 subttile ">{slide.desc}</p>

                {/* Watch Button */}
                <div className="mt-4 flex items-center gap-4 flex-wrap">
                  <Link to={`details/${slide.id}`}>
                    <button
                      style={{
                        background: "linear-gradient(45deg, #f30745, #ff7a8a)",
                        border: "2px solid transparent",
                        backgroundClip: "padding-box",
                      }}
                      className="flex items-center gap-2 w-[120px] py-2 px-4 rounded-xl"
                    >
                      <FaPlayCircle className="transition-transform duration-500 ease-in-out hover:rotate-360" />
                      Ko'rish
                    </button>
                  </Link>

                  <button className="flex items-center gap-2 p-2 rounded-xl px-4 group bacgroountrans">
                    favorites
                    <FaAngleRight className="group-hover:translate-x-2 transition-transform" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Buttons */}
        <div className="absolute bottom-4 right-4 flex gap-2 z-10">
          <div className="sm:flex hidden flex-col justify-center items-center gap-2">
            <button
              onClick={handlePrevSlide}
              className="bg-gray-600 bg-opacity-70 text-white p-2 rounded-lg hover:bg-opacity-90"
            >
              <FaChevronLeft size={20} />
            </button>
            <button
              onClick={handleNextSlide}
              className="bg-gray-600 bg-opacity-70 text-white p-2 rounded-lg hover:bg-opacity-90"
            >
              <FaChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Animation;
