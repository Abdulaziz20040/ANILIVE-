import React from "react";
import {
  FaBookmark,
  FaCartArrowDown,
  FaHandsHelping,
  FaUser,
  FaUserEdit,
} from "react-icons/fa";
import { HiMiniPhoto } from "react-icons/hi2";
import { IoNotificationsSharp, IoSettingsSharp } from "react-icons/io5";
import { MdAccountBalanceWallet, MdHome } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { Link, useNavigate } from "react-router-dom";
import "../../components/Profil/profil.css";
import { TbClockHour3 } from "react-icons/tb";

const cardData = [
  { icon: <FaUser size={24} />, title: "Mening hisobim" },
  {
    icon: <TbClockHour3 size={24} />,
    title: "Ko’rilganlar",
    onclick: (navigate) => navigate("ko'rilganlar"),
  },
  {
    icon: <FaBookmark size={24} />,
    title: "Sevimlilar",
    onclick: (navigate) => navigate("favorites"),
  },
  {
    icon: <IoSettingsSharp size={24} />,
    title: "Sozlamalar",
    onclick: (navigate) => navigate("sozlamalar"),
  },
  {
    icon: <FaCartArrowDown size={24} />,
    title: "Tariflar",
    onclick: (navigate) => navigate("tariflar"),
  },
  {
    icon: <HiMiniPhoto size={24} />,
    title: "Galeriya",
    onclick: (navigate) => navigate("galerya"),
  },
  {
    icon: <FaHandsHelping size={24} />,
    title: "Yordam",
    onclick: (navigate) => navigate("yordam"),
  },
  {
    icon: <IoNotificationsSharp size={24} />,
    title: "Bildirishnomalar",
    onclick: (navigate) => navigate("xabarlar"),
  },
  {
    icon: <MdAccountBalanceWallet size={24} />,
    title: "Balans",
    onclick: (navigate) => navigate("balans"),
  },
];

function Tabl() {
  const navigate = useNavigate(); // Initialize the navigate hook

  const handleExit = () => {
    localStorage.removeItem("name");
    navigate("/"); // Navigate to login page if user logs out
  };

  return (
    <div className=" p-3 relative min-h-[410px]">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-4 sm:gap-6 lg:gap-8 mb-10">
        {cardData.map((card, index) => (
          <div
            onClick={() => card.onclick && card.onclick(navigate)} // Pass navigate to onClick handlers
            key={index}
            className="bg-[#47455F] cursor-pointer flex flex-col justify-center resposnProfilTabl items-center text-center text-white p-4 rounded-2xl transition-transform hover:scale-105"
          >
            <div className="text-[20px] sm:text-[24px]">{card.icon}</div>
            <h1 className="font-semibold text-sm sm:text-base mt-2">
              {card.title}
            </h1>
          </div>
        ))}
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:gap-8 mt-8 mb-2 absolute bottom-0">
        <Link to={"/"}>
          <button className="flex items-center gap-3 text-sm sm:text-base">
            <MdHome className="text-[#FC5555] text-[20px] sm:text-[24px]" />
            <h2>Home</h2>
          </button>
        </Link>
        <button className="flex items-center gap-3 text-sm sm:text-base">
          <FaUserEdit className="text-[#FC5555] text-[20px] sm:text-[24px]" />
          <h2>Tahrirlash</h2>
        </button>
        <button
          onClick={handleExit}
          className="flex items-center gap-3 text-sm sm:text-base"
        >
          <RxExit className="text-[#FC5555] text-[20px] sm:text-[24px]" />
          <h2>Chiqish</h2>
        </button>
      </div>
    </div>
  );
}

export default Tabl;
