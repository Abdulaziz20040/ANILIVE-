import { useProduct } from "../../context/Context";
import { Link, useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import RelitedAnime from "./ReletedAnime";
import { FaBookmark, FaCaretLeft } from "react-icons/fa";

function Favorites() {
  const { favorite, deleteFromFavorite } = useProduct();

  const navigate = useNavigate();
  const handleDelet = (item) => {
    deleteFromFavorite(item.id);
  };

  return (
    <div className="">
      <div className="flex items-center mb-2 mt-6">
        <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
        <h2 className="text-xl font-semibold text-white">Sevimlilar</h2>
      </div>

      {/* Check if favorite is empty */}
      {favorite.length === 0 ? (
        <div className=" flex items-center gap-3 justify-center">
          <FaBookmark />
          <h1 className="flex items-center justify-start text-white text-xl">
            Hozircha Sevimlar yo'q !
          </h1>
        </div>
      ) : (
        <div className="mt-0 flex flex-col justify-center">
          {/* Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {favorite.map((item, index) => (
              <div
                key={item.id}
                id={`card-${index}`}
                className="max-w-[180px] max-h-[270px] relative cursor-pointer group mb-14"
              >
                <Link to={`/details/${item.id}`}>
                  <div>
                    <img
                      className="w-full h-[180px] md:h-[270px] rounded-[13px] object-cover"
                      src={item.img}
                      alt={item.title}
                    />
                  </div>
                </Link>
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-start mt-1 font-semibold text-white line-clamp-1">
                      «{item.name}»
                    </h2>
                    <p className="line-clamp-1 text-stone-300 text-[13px]">
                      {item.desc}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelet(item)}
                    className="px-2 py-2 text-red-500 cursor-pointer"
                  >
                    <MdDelete className="size-[25px]" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex items-center mb-4 mt-[90px]">
        <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
        <h2 className="text-xl font-semibold text-white">
          Sizga yoqishi mumkin
        </h2>
      </div>
      <RelitedAnime />

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

export default Favorites;
