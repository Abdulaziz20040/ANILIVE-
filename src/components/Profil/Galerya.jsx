import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { slider } from "../../Api/Api";
import { Link } from "react-router-dom";
import profilBacground from "./../../Img/profilbacground.png";
import userDefault from "../../Img/defaultuser.png";

function Galerya({ setProfileImages }) {
  const [data, setData] = useState([]);
  const [activeTab, setActiveTab] = useState("Galeriya");
  const [gender, setGender] = useState("Male");

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("profileImages")) || {};
    setProfileImages(savedImages);
  }, [setProfileImages]);

  // Ma'lumotlarni olish uchun API chaqiruvi
  useEffect(() => {
    axios
      .get(slider)
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex space-x-6">
          <span
            className={`cursor-pointer ${
              activeTab === "Galeriya" ? "font-bold text-red-500" : ""
            }`}
            onClick={() => setActiveTab("Galeriya")}
          >
            Galeriya
          </span>
          <span
            className={`cursor-pointer ${
              activeTab === "Profil rasm" ? "font-bold text-red-500" : ""
            }`}
            onClick={() => setActiveTab("Profil rasm")}
          >
            Profil rasmlari
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
      {activeTab === "Galeriya" && (
        <div className="grid grid-cols-6 gap-4">
          {data.map((img, index) => (
            <img
              key={index}
              src={
                gender === "Male" ? img.bacgroundImgBoy : img.bacgroundImggrl
              }
              alt={`Gallery Image ${index + 1}`}
              className="w-[200px] h-32 object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() =>
                handleImageClick(
                  gender === "Male" ? img.bacgroundImgBoy : img.bacgroundImggrl
                )
              }
            />
          ))}
          <img
            src={profilBacground}
            alt={`Gallery Image`}
            onClick={() => handleImageClick(profilBacground)}
            className="w-[200px] h-32 object-cover rounded-lg shadow-lg cursor-pointer hover:scale-105 transition-transform"
          />
        </div>
      )}

      {activeTab === "Profil rasm" && (
        <div className="grid grid-cols-6 gap-4">
          {data.map((img, index) => (
            <img
              key={index}
              src={gender === "Male" ? img.imgBoy : img.imggrl}
              alt={`Profile Image ${index + 1}`}
              className="w-[80px] h-[80px] object-cover rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform"
              onClick={() =>
                handleImageClick(gender === "Male" ? img.imgBoy : img.imggrl)
              }
            />
          ))}
          <img
            src={userDefault}
            alt={`Gallery Image`}
            onClick={() => handleImageClick(userDefault)}
            className="w-[80px] h-[80px] object-cover rounded-full shadow-lg cursor-pointer hover:scale-105 transition-transform"
          />
        </div>
      )}

      {/* Footer */}
      <Link to="/profil">
        <button className="mt-6 flex items-center space-x-2 text-red-500 cursor-pointer">
          <FaArrowLeft />
          <span>Profil</span>
        </button>
      </Link>
    </div>
  );
}

export default Galerya;
