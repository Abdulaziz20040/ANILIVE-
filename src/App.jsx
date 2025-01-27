import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import Allnewcard from "./pages/Home/Allnewcard";
import Detals from "./pages/Derails/Deatals";
import Login from "./components/Login";
import Rotlayout from "./Rotlayout/Rotlayout";
import Shorts from "./Shorts";
import Alltezkunda from "./pages/Alltezkunda";
import Favorites from "./components/Profil/Favorites";
import ProfilLayout from "./Rotlayout/ProfilLayout";
import Tabl from "./components/Profil/Tabl";
import Settings from "./components/Profil/Settings";
import Help from "./components/Profil/Help";
import Balans from "./components/Profil/Balans";
import Galerya from "./components/Profil/Galerya";
import Tariflar from "./components/Profil/Tariflar";
import Istorya from "./components/Profil/Istorya";
import Notifacions from "./components/Profil/Notifacions";
import Search from "./components/Search";
import Chat from "./components/Chat/Chat";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Dashboard from "./components/Dashboard/Dashboard";
import ShortsD from "./components/Dashboard/ShortsD";
import Obunachilar from "./components/Dashboard/Obunachilar";
import Animelar from "./components/Dashboard/Animelar";
import Trailerlar from "./components/Dashboard/Trailerlar";
import { useState } from "react";
import Filter from "./pages/Filter";

function App() {
  const [profileImages, setProfileImages] = useState({
    headerImg: null,
    profileImg: null,
  });
  const router = createBrowserRouter([
    {
      path: "/login",
      element: <Login />,
    },

    {
      path: "chat",
      element: <Chat />,
    },
    {
      path: "details/:id",
      element: <Detals />,
    },
    {
      path: "edit",
      element: <Shorts />,
    },
    {
      path: "search",
      element: <Search />,
    },
    {
      path: "filter",
      element: <Filter />,
    },

    {
      path: "/profil",
      element: <ProfilLayout profileImages={profileImages} />,
      children: [
        {
          index: true,
          element: <Tabl />,
        },
        {
          path: "favorites",
          element: <Favorites />,
        },
        {
          path: "sozlamalar",
          element: <Settings />,
        },
        {
          path: "yordam",
          element: <Help />,
        },
        {
          path: "balans",
          element: <Balans />,
        },
        {
          path: "galerya",
          element: <Galerya setProfileImages={setProfileImages} />,
        },
        {
          path: "tariflar",
          element: <Tariflar />,
        },
        {
          path: "ko'rilganlar",
          element: <Istorya />,
        },
        {
          path: "xabarlar",
          element: <Notifacions />,
        },
      ],
    },

    {
      path: "/admin",
      element: <DashboardLayout />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "dashboardHome",
          element: <Dashboard />,
        },
        {
          path: "shorts",
          element: <ShortsD />,
        },
        {
          path: "obunachilar",
          element: <Obunachilar />,
        },
        {
          path: "animelar",
          element: <Animelar />,
        },
        {
          path: "trailerlar",
          element: <Trailerlar />,
        },
      ],
    },

    {
      path: "/",
      element: <Rotlayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },

        {
          path: "allnewCard",
          element: <Allnewcard />,
        },

        {
          path: "allTezkunda",
          element: <Alltezkunda />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
