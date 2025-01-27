import React, { useEffect, useState } from "react";

function Profil({ profileImages }) {
  const [headerImg, setHeaderImg] = useState("");
  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    // LocalStorage'dan saqlangan rasmlarni o'qish
    const savedImages = JSON.parse(localStorage.getItem("profileImages")) || {};
    setHeaderImg(savedImages.headerImg || profileImages?.headerImg || "");
    setProfileImg(savedImages.profileImg || profileImages?.profileImg || "");
  }, [profileImages]);

  return (
    <div>
      {/* Profil header */}
      <div className="relative">
        <img
          className="w-full h-[340px] object-cover rounded-b-lg shadow-xl"
          src={
            headerImg ||
            "https://www.hdwallpapers.in/download/anime_moon_sky_window_4k_hd-3840x2160.jpg"
          }
          alt="Header"
        />
        <div className="absolute bottom-10 left-10 flex flex-col sm:flex-row items-start gap-3">
          <div>
            <img
              className="w-[70px] h-[70px] rounded-full"
              src={
                profileImg ||
                "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
              }
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
