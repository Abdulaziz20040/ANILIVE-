import React from "react";
import Profil from "../components/Profil/Profil";
import { Outlet } from "react-router-dom";
import Exit from "../components/Profil/Exit";

function ProfilLayout({ profileImages }) {
  return (
    <div className=" container">
      <Profil profileImages={profileImages} />
      <div className=" mt-3">
        <Outlet />
      </div>
    </div>
  );
}

export default ProfilLayout;
