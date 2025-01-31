import React from "react";
import { FaCaretLeft, FaHandsHelping } from "react-icons/fa";
import { MdAccountBalanceWallet } from "react-icons/md";
import { TbClockHour3 } from "react-icons/tb";
import { useNavigate } from "react-router-dom";

function Balans() {
  const navigate = useNavigate();

  return (
    <div className=" min-h-[300px] h-auto">
      <div className=" flex w-[100%] h-[300px] items-center gap-3 justify-center mt-10">
        <FaHandsHelping className=" size-[20px]" />
        <h1 className="text-center text-white text-xl font-semibold">
          Hozircha Balans mavjud emas
        </h1>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 mb-4 mt-4"
      >
        <MdAccountBalanceWallet className="text-[#FC5555] text-[28px]" />
        <h2>Profil</h2>
      </button>
    </div>
  );
}

export default Balans;
