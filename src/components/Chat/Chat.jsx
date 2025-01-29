import React, { useEffect, useState, useRef } from "react";
import {
  IoSendSharp,
  IoExitOutline,
  IoArrowRedoCircleOutline,
  IoTrashOutline,
} from "react-icons/io5"; // Reply ikonkasi
import { supabase } from "./Supabase";
import { useNavigate, Link } from "react-router-dom"; // Navigate va Link uchun
import chatimg from "../../Img/chatImg.png";
import "../../App.css";

function Chat() {
  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");
  const [replyTo, setReplyTo] = useState(null); // Reply qilingan xabar
  const navigate = useNavigate(); // navigate hook

  // localStorage'dan username olish
  const username = localStorage.getItem("name");
  const profilIMg = localStorage.getItem("profilIMg");
  const gmail = localStorage.getItem("gmail");

  const messagesEndRef = useRef(null); // Eng oxirgi xabarga scroll qilish uchun
  const messageInputRef = useRef(null); // Inputni faollashtirish uchun

  // Agar username bo'lmasa, ro'yxatga olish sahifasiga yo'naltirish
  if (!username) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="flex flex-col items-center justify-center">
          <img className="w-[330px] -ms-10" src={chatimg} alt="Chat" />
          <Link to={"/login"}>
            <button className="text-[15px] border border-[#B7B7B7] mt-4 rounded-full py-2 px-4 font-semibold text-[#B7B7B7]">
              Chatga qo‘shilish uchun ro‘yxatdan o‘ting..
            </button>
          </Link>
        </div>
      </div>
    );
  }

  const deleteMessage = async (messageId) => {
    const { error } = await supabase
      .from("messages")
      .delete()
      .match({ id: messageId });
    if (error) {
      console.error("Xabarni o'chirishda xato:", error.message);
    } else {
      setMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== messageId)
      );
    }
  };

  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("created_at", { ascending: true });

      if (error) {
        console.error("Xabarlarni olishda xato:", error.message);
      } else {
        setMessages(data);
      }
    };

    fetchMessages();

    // Real-time yangilanish
    const channel = supabase
      .channel("realtime:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          setMessages((prev) => [...prev, payload.new]);
        }
      )
      .subscribe();

    // Tozalash
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    // Eng oxirgi xabarga scroll qilish
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });

    // Inputni faollashtirish
    messageInputRef.current?.focus();
  }, [messages]); // messages o'zgarganda har doim scroll qilish va inputni faollashtirish

  const sendMessage = async () => {
    if (!messageText.trim()) return;

    const newMessage = {
      user_name: username,
      user_img: profilIMg,
      message: messageText,
      reply_to: replyTo ? replyTo.id : null, // Agar reply qilinayotgan xabar bo'lsa, uni saqlash
    };

    const { error } = await supabase.from("messages").insert([newMessage]);
    if (error) {
      console.error("Xabarni yuborishda xato:", error.message);
    } else {
      setMessageText(""); // Xabar yuborilgandan keyin inputni tozalash
      setReplyTo(null); // Reply qilingan xabarni bo'shatish
    }
  };

  const handleReply = (msg) => {
    setReplyTo(msg); // Reply qilish uchun tanlangan xabarni saqlash
    messageInputRef.current?.focus(); // Inputni faollashtirish
  };

  return (
    <div className="chat-container relative h-full">
      {/* Tepa qismini sticky qilish */}
      <div className="chat-header sticky top-0 left-0 right-0 shadow-md z-10 p-4 flex justify-between items-center">
        <div className="font-semibold text-lg flex items-center gap-2">
          <img
            className="w-[55px] h-[55px] rounded-full"
            src={
              profilIMg ||
              "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
            } // Agar profil rasmi bo'lmasa, default rasmni ko'rsatish
            alt="Profile"
          />
          <div className=" flex flex-col gap-0">
            <h4 className=" text-[15px]">{username}</h4>
            <h4 className=" text-[12px] text-stone-300 p-0 m-0 -mt-3">
              {gmail}
            </h4>
          </div>
        </div>
        <div
          className="exit-icon cursor-pointer text-gray-300"
          onClick={() => navigate(-1)} // Sahifaga qaytish
        >
          <IoExitOutline className="w-6 h-6" />
        </div>
      </div>

      <div className="messages p-4 flex flex-col gap-4 overflow-y-auto max-h-[calc(100vh-130px)]">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex gap-4 items-start ${
              msg.user_name === username ? "justify-end" : "justify-start"
            }`}
          >
            {/* Xabarni yozgan foydalanuvchining rasmi birinchi */}
            <img
              src={
                msg.user_img ||
                "https://winaero.com/blog/wp-content/uploads/2018/08/Windows-10-user-icon-big.png"
              } // Agar foydalanuvchining rasmi bo'lmasa, default rasmni ko'rsatish
              alt="user"
              className="rounded-full w-[45px] h-[45px]"
            />
            <div className="max-w-[60%]">
              {/* Reply bo'lsa, Reply xabarini ko'rsatish */}
              {msg.reply_to && (
                <div className="reply-message text-gray-500 border-l-4 border-blue-500 pl-2 mt-2">
                  <p className="font-semibold text-xs">Reply to:</p>
                  <p>
                    {/* Reply qilingan xabarni ko'rsatish */}
                    {messages.find((m) => m.id === msg.reply_to) &&
                      messages.find((m) => m.id === msg.reply_to).message}
                  </p>
                </div>
              )}
              <div className="message-content">
                {/* Xabarni yozgan foydalanuvchi nomi */}
                <h1 className="text-blue-400">{msg.user_name}</h1>
                {/* Xabar matni */}
                <p className="max-w-[300px] break-words font-thin">
                  {msg.message}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-gray-400 text-[12px]">
                    {/* Xabar yuborilgan vaqtni ko'rsatish */}
                    {new Date(msg.created_at).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                  {/* Agar foydalanuvchi o'zi yozgan bo'lsa, reply va delete ikonkalari */}
                  {msg.user_name !== username && (
                    <button
                      className="reply-icon text-gray-500"
                      onClick={() => handleReply(msg)} // Reply qilish uchun
                    >
                      <IoArrowRedoCircleOutline className="w-6 h-6" />
                    </button>
                  )}
                  {msg.user_name === username && (
                    <IoTrashOutline
                      className="w-5 h-5 text-red-500 cursor-pointer ml-2"
                      onClick={() => deleteMessage(msg.id)} // O'chirish ikonkasi
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
        {/* Scroll uchun bo'sh joy, eng oxirgi xabar uchun */}
        <div ref={messagesEndRef} />
      </div>

      <div className="message-input fixed bottom-0 left-0 w-full p-4 border-t">
        <div className="flex items-center gap-4">
          {replyTo && (
            <div className="reply-info text-sm text-gray-500">
              Replying to: <strong>{replyTo.user_name}</strong>
            </div>
          )}
          <input
            ref={messageInputRef} // Inputni ref orqali ulash
            type="text"
            placeholder="Xabar yozing..."
            className="w-full py-2 px-4 border rounded-full bg-transparent border-[#B7B7B7] focus:outline-none"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          />
          <button onClick={sendMessage} className="text-blue-600">
            <IoSendSharp className="w-[24px] h-[24px]" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;
