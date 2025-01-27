import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa"; // Icons
import "../App.css";
import { IoIosLogOut } from "react-icons/io";
import axios from "axios";
import { userDate } from "../Api/Api";
import { BiLogoGmail } from "react-icons/bi";
import defaultimg from "../Img/userDefaultimg.png";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [oldname, setOldName] = useState("");
  const [oldpassword, setOldPassword] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [gmail, setgamil] = useState();

  useEffect(() => {
    axios
      .get(userDate)
      .then((res) => {
        setData(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const handleFormSubmitold = async () => {
    if (!oldname || !oldpassword) {
      toast.error("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    try {
      // Login tekshiruvi
      const isUserExist = data.find(
        (user) => user.name === oldname && user.password === oldpassword
      );

      if (isUserExist) {
        // Agar foydalanuvchi mavjud bo'lsa tizimga kirish
        localStorage.setItem("name", oldname);
        navigate(-1); // Dashboard sahifasiga yo'naltirish
        toast.success("Tizimga kirdingiz!");
      } else {
        toast.error("Bunday foydalanuvchi mavjud emas!");
      }
    } catch (error) {
      console.error("Xato yuz berdi:", error);
      toast.error("Xato yuz berdi, iltimos qaytadan urinib ko'ring!");
    }
  };

  const handleFormSubmit = () => {
    if (!isLogin) {
      // Validation for registration fields
      const nameValidation = name.length >= 3;
      const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/.test(
        password
      );
      const emailValidation = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(gmail || "");

      if (!nameValidation) {
        toast.error("Ismingizni To'iq kiriting");
        return;
      }

      if (!passwordValidation) {
        toast.error(
          "Parol kamida 6 ta belgi, bitta kichik harf, bitta katta harf dan iborat bo'lishi kerak!"
        );
        return;
      }

      if (!emailValidation) {
        toast.error("Yaroqli Gmail kiriting!");
        return;
      }

      // Save user to the local storage
      localStorage.setItem("name", name);
      localStorage.setItem("password", password);
      localStorage.setItem("gmail", gmail);
      localStorage.setItem("userIMg", defaultimg);

      const dataToSend = {
        name,
        password,
        gmail,
        date: new Date().toISOString(),
      };

      // Send data to the server
      axios
        .post(userDate, dataToSend)
        .then((response) => {
          console.log(response.data);
          toast.success("Ro'yxatdan muvaffaqiyatli o'tdingiz!");
        })
        .catch((error) => {
          console.error("Xato yuz berdi:", error);
          toast.error("Xato yuz berdi, iltimos qaytadan urinib ko'ring!");
        });

      navigate(-1); // Redirect to the previous page
    } else {
      toast.error("Tizimga kirish rejimida ro'yxatdan o'tolmaysiz!");
    }
  };

  const handleClose = () => {
    navigate("/");
  };

  return (
    <div className="bg-image-container relative h-screen flex justify-center items-center">
      <button
        onClick={handleClose}
        className="absolute top-9 right-9 text-cyan-50/100 text-center hover:text-white hover:ps-1 rounded-lg text-[27px] z-10"
      >
        <IoIosLogOut />
      </button>

      <div
        style={{
          borderRadius: "10px",
        }}
        className="w-full lg:w-5/12 flex justify-center items-center p-6 bg-gradient-to-r from-gray-800 to-gray-900"
      >
        <div className="w-full max-w-md p-6 ">
          <h2 className="text-center text-2xl font-bold mb-4 text-gray-400">
            {isLogin ? "Tizimga kirish" : "Ro'yxatdan o'tish"}
          </h2>
          {isLogin ? (
            <form className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <FaUser className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Foydalanuvchi nomi"
                  value={oldname}
                  onChange={(e) => setOldName(e.target.value)}
                  className="input-field pl-10 w-full rounded-md border-2"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <FaLock className="absolute left-3 top-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Parol"
                  value={oldpassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="input-field pl-10 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className="absolute right-3 top-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </span>
              </div>

              <button
                type="button"
                onClick={handleFormSubmitold}
                className=" w-full py-3 rounded-md text-white bg-[#29B4FF30]"
              >
                {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
              </button>
            </form>
          ) : (
            <form className="space-y-4">
              {/* Username Input */}
              <div className="relative">
                <FaUser className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Foydalanuvchi nomi"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="input-field pl-10 w-full rounded-md border-2"
                />
              </div>

              {/* Password Input */}
              <div className="relative">
                <FaLock className="absolute left-3 top-4 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Parol"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-field pl-10 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <span
                  className="absolute right-3 top-4 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <FaEyeSlash className="text-gray-400" />
                  ) : (
                    <FaEye className="text-gray-400" />
                  )}
                </span>
              </div>

              <div className="relative">
                <BiLogoGmail className="absolute left-3 top-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Gmailni kiriting"
                  value={gmail}
                  onChange={(e) => setgamil(e.target.value)}
                  className="input-field pl-10 w-full rounded-md border-2 border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className=" flex items-center gap-3">
                <button className=" bg-[#fbfdff2c] py-2 px-4 rounded-full hover:bg-[#29B4FF30]">
                  Female
                </button>
                <button className=" bg-[#fbfdff2c] py-2 px-4 rounded-full hover:bg-[#29B4FF30]">
                  Male
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="button"
                onClick={handleFormSubmit}
                className=" w-full py-3  rounded-md text-white bg-[#29B4FF30]"
              >
                {isLogin ? "Kirish" : "Ro'yxatdan o'tish"}
              </button>
            </form>
          )}

          {/* Switch between Login and Sign-Up */}
          <div className="text-center mt-4 flex justify-between">
            <span>{isLogin ? " Hisobinggiz yo'qmi" : "hisobingiz bormi "}</span>
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-blue-500 hover:underline"
            >
              {isLogin ? "Ro'yxatdan o'tish" : "Tizimga kirish"}
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-4 text-center">
            Kirish orqali siz Foydalanuvchi shartlari va Maxfiylik siyosati
            bilan rozi bo'lasiz
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
