import React from "react";
import { FaCaretLeft } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function Notifacions() {
  const navigate = useNavigate();

  return (
    <div>
      <div className=" flex w-[100%] h-[300px] items-center gap-3 justify-center mt-10">
        <IoNotificationsSharp className=" size-[20px]" />
        <h1 className="text-center text-white text-xl font-semibold">
          Hozircha Xabarlar yo'q !
        </h1>
      </div>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-1 mb-4 mt-4"
      >
        <FaCaretLeft className="text-[#FC5555] text-[28px]" />
        <h2>Profil</h2>
      </button>
    </div>
  );
}

export default Notifacions;
