import React, { useEffect, useState } from "react";
import profilbacgroundIMg from "../../Img/profilbacground.png";
import userDefaultimg from "../../Img/defaultuser.png";

function Profil({ profileImages }) {
  const [headerImg, setHeaderImg] = useState("");
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("profileImages")) || {};
    setHeaderImg(savedImages.headerImg || profileImages?.headerImg || "");
    setProfileImg(savedImages.profileImg || profileImages?.profileImg || "");
  }, [profileImages]);

  const name = localStorage.getItem("name");

  return (
    <div>
      {/* Profil header */}
      <div className="relative mt-3">
        <img
          className="w-full responsheghtprofil object-cover rounded-lg shadow-xl"
          src={headerImg || profilbacgroundIMg}
          alt="Header"
        />
        <div className="absolute bottom-10 left-10 flex  items-start gap-3">
          <div>
            <img
              className="w-[70px] h-[70px] rounded-full object-cover"
              src={profileImg || userDefaultimg}
              alt="Avatar"
            />
            <button className="bg-[#D9D9D9] text-black px-2 py-1 rounded-lg mt-2 text-[13px]">
              Pc yozing
            </button>
          </div>
          <div className="bg-[#00000070] w-[150px] h-[ rounded-lg p-3">
            <h1 className="text-[15px] font-semibold">{name || "No name"}</h1>
            <p>
              <span className="font-semibold">Onlayn:</span> hozir
            </p>
            <p>
              <span className="font-semibold">Level : </span>
              <span className=" text-[20px]">1</span>
              {/* ∞ */}
            </p>
            <p>
              <span className="font-semibold">Top:</span> 1
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profil;
