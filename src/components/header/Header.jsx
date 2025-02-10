import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/App.css";
import {
  IoChatboxEllipses,
  IoDuplicate,
  IoNotificationsSharp,
  IoSearch,
  IoSettingsSharp,
} from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import "./header.css";
import { aniDubApi } from "../../Api/Api";
import { useProduct } from "../../context/Context";
import logo from "../../Img/logo (2).png";
import { BiBell } from "react-icons/bi";

function Header() {
  const [data, setData] = useState([]);
  const { searchTerm } = useProduct();

  const [isScrolled, setIsScrolled] = useState(false);
  const username = localStorage.getItem("name");
  const navigate = useNavigate();

  const [profileImg, setProfileImg] = useState("");

  useEffect(() => {
    const savedImages = JSON.parse(localStorage.getItem("profileImages")) || {};
    setProfileImg(
      savedImages.profileImg ||
        "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
    );
  }, []);

  if (searchTerm > 0) {
    navigate("/search");
  }

  useEffect(() => {
    axios
      .get(aniDubApi)
      .then((res) => {
        const filterData = res.data
          .map((item) => {
            return {
              categoryName: item.categoryName,
            };
          })
          .filter((item) => item.categoryName);
        setData(filterData);
      })
      .catch((error) => {
        console.error("There was an error fetching the data: ", error);
      });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="">
      {/* Desktop Header */}
      <div
        className={`fixed px-2 top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled ? "hoberBgHeader shadow-xl" : "bg-transparent"
        } hidden lg:block`}
      >
        <div className="container mt-2 ">
          <ul className="flex gap-10 mx-auto text-white font-semibold items-center justify-between">
            <div className="flex items-center gap-10">
              {/* Logo */}
              <Link to="/">
                <li className="cursor-pointer flex items-center gap-3">
                  <img
                    className=" w-11 h-11 rounded-full object-cover"
                    src={logo}
                    alt="Logo"
                  />
                  Anilive
                </li>
              </Link>
              {/* Genres */}
              <div className="relative cursor-pointer  ms-10">
                <Link to={"/genre"}>
                  <li className="cursor-pointer text-stone-300 hover:text-white duration-300 text-center ">
                    <span>Janrlar</span>
                  </li>
                </Link>
              </div>
              {/* Chat */}
              <Link to={"/chat"}>
                <li className="cursor-pointer  text-stone-300 hover:text-white duration-300 text-center ">
                  <span>Chat</span>
                </li>
              </Link>
              {/* Shorts */}
              <Link to={"/edit"}>
                <li className="cursor-pointer  text-stone-300 hover:text-white duration-300 text-center ">
                  <span>Shorts</span>
                </li>
              </Link>
              {/* Manga */}
              <Link to={"/manga"}>
                <li className="cursor-pointer  text-stone-300 hover:text-white duration-300 text-center ">
                  <span>Manga</span>
                </li>
              </Link>
            </div>

            <div className="flex items-center gap-2">
              <button
                style={{
                  background: "linear-gradient(45deg, #f30745, #ff7a8a)",
                  border: "2px solid transparent",
                  backgroundClip: "padding-box",
                }}
                className=" max-w-[400px] w-full rounded-xl p-[6px] px-3"
              >
                30 kun bepul tomosha qiling
              </button>
              <Link to={"/filter"}>
                <IoSearch className=" size-[20px] cursor-pointer" />
              </Link>
              <Link to={"/profil/xabarlar"}>
                <IoNotificationsSharp className=" size-[20px] cursor-pointer" />
              </Link>
              <li className="">
                {username ? (
                  <Link to={"/profil"}>
                    <div className="flex items-center gap-2  w-[50px]">
                      <img
                        className="rounded-full w-[45px] h-[45px] cursor-pointer object-cover"
                        src={profileImg}
                        alt="Profile"
                      />
                    </div>
                  </Link>
                ) : (
                  <Link to="/login">
                    <button
                      style={{
                        backgroundImage: `url('https://i.pinimg.com/originals/ab/39/43/ab394303fe32175912ee20eae0e23cc5.gif')`,
                        backgroundSize: "cover",
                        borderRadius: "20px",
                        width: "140px",
                      }}
                      className="flex items-center justify-center gap-2 px-4 py-2 text-white bg-teal-500 rounded-lg shadow-lg hover:bg-teal-600 transition-colors"
                    >
                      Kirish
                      <TbLogin2 className="text-xl" />
                    </button>
                  </Link>
                )}
              </li>
            </div>
          </ul>
        </div>
      </div>

      {/* Mobile Header */}
      <div className="fixed top-0 left-0 w-full p-4 flex items-center justify-between bg-gray-900 shadow-md z-50 lg:hidden">
        {/* Search Input */}
        <div className="relative w-[240px]">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-[40px] px-4 pr-10 bg-gray-800 text-white placeholder-gray-400 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <IoSearch className="absolute top-1/2 right-3 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        </div>
        {/* Icons */}
        <div className="flex items-center">
          <Link to={"/profil/sozlamalar"}>
            <button className="p-2  rounded-full hover:bg-gray-700 focus:outline-none">
              <IoSettingsSharp className=" text-white w-5 h-5" />
            </button>
          </Link>
          <Link to={"/profil/xabarlar"}>
            <button className="p-2  rounded-full hover:bg-gray-700 focus:outline-none">
              <BiBell className="text-white w-6 h-6" />
            </button>
          </Link>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-between items-center px-4 py-3 shadow-lg z-50 lg:hidden">
        <Link to="/" className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-6 h-6 rounded-full" />
          <span className="text-sm">Home</span>
        </Link>
        <Link to="/genre" className="flex flex-col items-center">
          <IoDuplicate className="text-xl" />
          <span className="text-sm">Genre</span>
        </Link>

        <Link to="/edit" className="flex flex-col items-center">
          <SiYoutubeshorts className="text-xl" />
          <span className="text-sm">Shorts</span>
        </Link>
        <Link to="/chat" className="flex flex-col items-center">
          <IoChatboxEllipses className="text-xl" />
          <span className="text-sm">Chat</span>
        </Link>
        <Link
          to={username ? "/profil" : "/login"}
          className="flex flex-col items-center"
        >
          <img
            src={profileImg}
            alt="Profile"
            className="w-6 h-6 rounded-full"
          />
          <span className="text-sm">{username ? "Profile" : "Login"}</span>
        </Link>
      </div>
    </div>
  );
}

export default Header;
