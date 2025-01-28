import { TbLogin2 } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import "../App.css";
import {
  IoChatboxEllipses,
  IoDuplicate,
  IoSearch,
  IoSettingsSharp,
} from "react-icons/io5";
import { SiYoutubeshorts } from "react-icons/si";
import "./header.css";
import { aniDubApi } from "../Api/Api";
import { useProduct } from "../context/Context";
import logo from "../Img/photo_2024-12-29_18-43-02.jpg";
import { BiBell } from "react-icons/bi";

function Header() {
  const [data, setData] = useState([]);
  const [open, setOpen] = useState(false);
  const {
    handleSearchChange,
    searchResults,
    setSearchResults,
    searchTerm,
    setSearchTerm,
  } = useProduct();

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

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

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
                <li className="cursor-pointer">
                  <img
                    className=" w-12 h-12 rounded-full"
                    src={logo}
                    alt="Logo"
                  />
                </li>
              </Link>
              {/* Genres */}
              <div className="relative cursor-pointer group ms-10">
                <li className="cursor-pointer text-center flex flex-col items-center">
                  <IoDuplicate className="text-[#e96fae] size-[18px] hover:animate-bounce" />
                  <span>Janrlar</span>
                </li>
                <div className="absolute left-0 mt-2 bg-blue-300 w-0 h-0 opacity-0 overflow-hidden transition-all duration-500 ease-in-out group-hover:w-[440px] group-hover:h-auto px-3 py-3 flex flex-wrap gap-3 group-hover:opacity-100 rounded-lg">
                  {data.map((item) => (
                    <div key={item.categoryName}>
                      <div className="absolute inset-0 bg-black opacity-20 rounded-lg"></div>
                      <div className="relative z-10">{item.categoryName}</div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Chat */}
              <Link to={"/chat"}>
                <li className="cursor-pointer text-center flex flex-col items-center">
                  <IoChatboxEllipses className="text-[#e96fae] size-[18px] hover:animate-bounce" />
                  <span>Chat</span>
                </li>
              </Link>
              {/* Shorts */}
              <Link to={"/edit"}>
                <li className="cursor-pointer text-center flex flex-col items-center">
                  <SiYoutubeshorts className="text-[#e96fae] size-[18px] hover:animate-bounce" />
                  <span>Edit</span>
                </li>
              </Link>
            </div>

            <div className="flex items-end gap-4">
              <li>
                {username ? (
                  <Link to={"/profil"}>
                    <div className="flex items-center gap-2">
                      <h1>{username || "No name"}</h1>
                      <img
                        className="rounded-full w-[45px] h-[45px] cursor-pointer"
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
      <div className="fixed top-0 left-0 w-full p-4 flex items-center justify-between bg-gray-900 shadow-md z-50">
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
          <button className="p-2  rounded-full hover:bg-gray-700 focus:outline-none">
            <IoSettingsSharp className=" text-white w-5 h-5" />
          </button>
          <button className="p-2  rounded-full hover:bg-gray-700 focus:outline-none">
            <BiBell className="text-white w-6 h-6" />
          </button>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white flex justify-between items-center px-4 py-3 shadow-lg z-50 lg:hidden">
        <Link to="/" className="flex flex-col items-center">
          <img src={logo} alt="Logo" className="w-6 h-6 rounded-full" />
          <span className="text-sm">Home</span>
        </Link>
        <Link to="/genres" className="flex flex-col items-center">
          <IoDuplicate className="text-xl" />
          <span className="text-sm">Genre</span>
        </Link>

        <Link to="/shorts" className="flex flex-col items-center">
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
