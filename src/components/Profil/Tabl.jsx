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
import { MdAccountBalanceWallet } from "react-icons/md";
import { RxExit } from "react-icons/rx";
import { TbClockHour3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

const cardData = [
  { icon: <FaUser size={30} />, title: "Mening hisobim" },
  {
    icon: <TbClockHour3 size={30} />,
    title: "Ko’rilganlar",
    onclick: (navigate) => navigate("ko'rilganlar"),
  },
  {
    icon: <FaBookmark size={30} />,
    title: "Sevimlilar",
    onclick: (navigate) => navigate("favorites"),
  },
  {
    icon: <IoSettingsSharp size={30} />,
    title: "Sozlamalar",
    onclick: (navigate) => navigate("sozlamalar"),
  },
  {
    icon: <FaCartArrowDown size={30} />,
    title: "Tariflar",
    onclick: (navigate) => navigate("tariflar"),
  },
  {
    icon: <HiMiniPhoto size={30} />,
    title: "Galeriya",
    onclick: (navigate) => navigate("galerya"),
  },
  {
    icon: <FaHandsHelping size={30} />,
    title: "Yordam",
    onclick: (navigate) => navigate("yordam"),
  },
  {
    icon: <IoNotificationsSharp size={30} />,
    title: "Bildirishnomalar",
    onclick: (navigate) => navigate("xabarlar"),
  },
  {
    icon: <MdAccountBalanceWallet size={30} />,
    title: "Balans",
    onclick: (navigate) => navigate("balans"),
  },
];
function Tabl() {
  const navigate = useNavigate(); // Initialize the navigate hook

  return (
    <div>
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-5 mt-6">
        {cardData.map((card, index) => (
          <div
            onClick={() => card.onclick(navigate)} // Pass navigate to onClick handlers
            key={index}
            className="bg-[#47455F] cursor-pointer rounded-[28px] max-w-[130px] w-full h-[130px] flex flex-col justify-center items-center text-center text-white"
          >
            {card.icon}
            <h1 className="font-semibold text-[14px] mt-3">{card.title}</h1>
          </div>
        ))}
      </div>
      <div className=" flex items-center gap-8 mt-14">
        <button className=" flex items-center gap-3">
          <FaUserEdit className=" text-[#FC5555] size-[24px]" />
          <h2>Profilni tahrirlash</h2>
        </button>
        <button
          onClick={() => navigate(-1)}
          className=" flex items-center gap-3"
        >
          <RxExit className=" text-[#FC5555] size-[20px]" />
          <h2>Chiqish</h2>
        </button>
      </div>
    </div>
  );
}

export default Tabl;
