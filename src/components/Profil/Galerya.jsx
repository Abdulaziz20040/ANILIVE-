import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft, FaCaretLeft } from "react-icons/fa";
import { Profila } from "../../Api/Api";
import { Link, useNavigate } from "react-router-dom";
import profilBacground from "./../../Img/profilbacground.png";
import userDefault from "../../Img/defaultuser.png";

function Galerya({ setProfileImages }) {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("Galeriya");
  const [gender, setGender] = useState("Male");

  const navigate = useNavigate();

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("profileImages")) || {};
    setProfileImages(savedImages);
  }, [setProfileImages]);

  // Ma'lumotlarni olish uchun API chaqiruvi
  useEffect(() => {
    axios
      .get(Profila)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.error("Error fetching data:", e);
      });
  }, []);

  // Tanlangan rasmlarni saqlash funksiyasi
  const handleImageClick = (image) => {
    if (activeTab === "Galeriya") {
      const updatedImages = {
        ...JSON.parse(localStorage.getItem("profileImages")),
        headerImg: image,
      };
      localStorage.setItem("profileImages", JSON.stringify(updatedImages));
      setProfileImages(updatedImages);
    } else if (activeTab === "Profil rasm") {
      const updatedImages = {
        ...JSON.parse(localStorage.getItem("profileImages")),
        profileImg: image,
      };
      localStorage.setItem("profileImages", JSON.stringify(updatedImages));
      setProfileImages(updatedImages);
    }
  };

  return (
    <div className=" text-white p-4 sm:p-6 min-h-[400px] h-auto flex flex-col">
      {/* Header */}
      <div className="flex flex-wrap justify-between mb-6">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <span
            className={`cursor-pointer ${
              activeTab === "Galeriya" ? "font-bold text-red-500" : ""
            }`}
            onClick={() => setActiveTab("Galeriya")}
          >
            Bacground
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "Profil rasm" ? "font-bold text-red-500" : ""
            }`}
            onClick={() => setActiveTab("Profil rasm")}
          >
            Profil
          </span>
        </div>
        <div className="flex space-x-4">
          <span
            className={`cursor-pointer ${
              gender === "Male" ? "font-bold text-red-500" : ""
            }`}
            onClick={() => setGender("Male")}
          >
            Male
          </span>
          <span
            className={`cursor-pointer ${
              gender === "Female" ? "font-bold text-red-500" : ""
            }`}
            onClick={() => setGender("Female")}
          >
            Female
          </span>
        </div>
      </div>

      {/* Rasmlar tarmog'i */}
      <div className="flex-grow">
        {activeTab === "Galeriya" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {data.map((img, index) => (
              <img
                key={index}
                src={
                  gender === "Male" ? img.bacgroundImgBoy : img.bacgroundImggrl
                }
                alt={`Gallery Image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() =>
                  handleImageClick(
                    gender === "Male"
                      ? img.bacgroundImgBoy
                      : img.bacgroundImggrl
                  )
                }
              />
            ))}
            <img
              src={profilBacground}
              alt={`Gallery Image`}
              onClick={() => handleImageClick(profilBacground)}
              className="w-full h-32 object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        )}

        {activeTab === "Profil rasm" && (
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-4">
            {data.map((img, index) => (
              <img
                key={index}
                src={gender === "Male" ? img.imgBoy : img.imggrl}
                alt={`Profile Image ${index + 1}`}
                className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform"
                onClick={() =>
                  handleImageClick(gender === "Male" ? img.imgBoy : img.imggrl)
                }
              />
            ))}
            <img
              src={userDefault}
              alt={`Gallery Image`}
              onClick={() => handleImageClick(userDefault)}
              className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform"
            />
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-1 mb-4 mt-4"
        >
          <FaCaretLeft className="text-[#FC5555] text-[28px]" />
          <h2>Profil</h2>
        </button>
      </div>
    </div>
  );
}

export default Galerya;
