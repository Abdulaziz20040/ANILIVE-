import React from "react";

const image = [
  "https://i.pinimg.com/236x/47/a8/97/47a8976da5b0745349d75c18c7860175.jpg",
  "https://i.pinimg.com/736x/6a/72/ff/6a72ffcc70dfda05a0dd704c3bfb90c0.jpg",
  "https://i.pinimg.com/736x/4a/32/12/4a32127e54565484c050d186f2a6f666.jpg",
  "https://i.pinimg.com/736x/56/79/c7/5679c7752f748ed23760ba1bdc7f6393.jpg",
  "https://i.pinimg.com/736x/3d/f6/89/3df689522aebcccbd92488427de01b4a.jpg",
  "https://i.pinimg.com/736x/47/cc/51/47cc51b091176944e86b7fbc75f62d03.jpg",
  "https://i.pinimg.com/736x/9a/8d/c3/9a8dc3b0f9f5d3f6df466369fe8dade3.jpg",
  "https://i.pinimg.com/736x/e1/0c/d5/e10cd5d639297ba6561a56bc619b8523.jpg",
];

function Tariflar() {
  return (
    <div className=" mt-4">
      <div className="flex items-center mb-2">
        <span className="bg-[#F81539] w-[6px] h-[15px] rounded-lg inline-block mr-4"></span>
        <h2 className="text-xl font-semibold text-white">Tariflar</h2>
      </div>
      <p className=" mt-5 max-w-[800px] text-[15px] text-stone-300">
        Obuna bo‘lish orqali siz sevimli animelaringizni yuqori sifatli
        formatlarda tomosha qilish imkoniyatiga ega bo‘lasiz. Shuningdek, doimiy
        yangiliklardan xabardor bo‘lib turishingiz va faqat obunachilar uchun
        mavjud bo‘lgan maxsus funksiyalardan foydalanishingiz mumkin!
      </p>

      <div className=" mt-10 ">
        <div className=" grid grid-cols-1 xl:grid-cols-2 gap-10">
          {/* 1 */}
          <div className=" bg-[#272246] w-[630px] h-[300px] rounded-[25px] relative flex px-8">
            {/* left img */}
            <div className=" grid grid-cols-2 w-[140px] gap-3 absolute left-[45px]">
              {image.map((src, index) => (
                <img
                  src={src}
                  alt={`Tarif ${index + 1}`}
                  className="w-[65px] h-[65px] object-cover rounded-md"
                />
              ))}
            </div>

            {/* right  desc */}
            <div className=" py-10 absolute right-16">
              <h3 className="text-white font-semibold text-lg">
                1 Oylik obuna
              </h3>
              <p className="text-white text-[13px] max-w-[250px]">
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with
              </p>
              <div className=" flex items-center gap-2 mt-5">
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Yangi elemntlar
                </button>
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Sifatli Format
                </button>
              </div>

              <button className=" bg-[#EC221F] text-center rounded-xl w-[300px] mt-14 p-2  text-[14px]">
                Oyiga 15000 so’mga ulaning
              </button>
            </div>
          </div>
          {/* 2 */}
          <div className=" bg-[#272246] w-[630px] h-[300px] rounded-[25px] relative flex px-8">
            {/* left img */}
            <div className=" grid grid-cols-2 w-[140px] gap-3 absolute left-[45px]">
              {image.map((src, index) => (
                <img
                  src={src}
                  alt={`Tarif ${index + 1}`}
                  className="w-[65px] h-[65px] object-cover rounded-md"
                />
              ))}
            </div>

            {/* right  desc */}
            <div className=" py-10 absolute right-16">
              <h3 className="text-white font-semibold text-lg">
                3 Oylik obuna{" "}
              </h3>
              <p className="text-white text-[13px] max-w-[250px]">
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with
              </p>
              <div className=" flex items-center gap-2 mt-5">
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Yangi elemntlar
                </button>
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Sifatli Format
                </button>
              </div>

              <button className=" bg-[#EC221F] text-center rounded-xl w-[300px] mt-14 p-2 text-[14px]">
                Oyiga 39 so’mga ulaning{" "}
              </button>
            </div>
          </div>
          {/* 3 */}
          <div className=" bg-[#272246] w-[630px] h-[300px] rounded-[25px] relative flex px-8">
            {/* left img */}
            <div className=" grid grid-cols-2 w-[140px] gap-3 absolute left-[45px]">
              {image.map((src, index) => (
                <img
                  src={src}
                  alt={`Tarif ${index + 1}`}
                  className="w-[65px] h-[65px] object-cover rounded-md"
                />
              ))}
            </div>

            {/* right  desc */}
            <div className=" py-10 absolute right-16">
              <h3 className="text-white font-semibold text-lg">
                6 Oylik obuna{" "}
              </h3>
              <p className="text-white text-[13px] max-w-[250px]">
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with
              </p>
              <div className=" flex flex-wrap w-[300px] items-center gap-2 mt-5">
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Yangi elemntlar
                </button>
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Sifatli Format
                </button>
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Yangiliklardan xabrdor bo’ling{" "}
                </button>
              </div>

              <button className=" bg-[#EC221F] text-center rounded-xl w-[300px] mt-8 p-2 text-[14px]">
                Oyiga 69 so’mga ulaning{" "}
              </button>
            </div>
          </div>

          {/* 4 */}
          <div className=" bg-[#272246] w-[630px] h-[300px] rounded-[25px] relative flex px-8">
            {/* left img */}
            <div className=" grid grid-cols-2 w-[140px] gap-3 absolute left-[45px]">
              {image.map((src, index) => (
                <img
                  src={src}
                  alt={`Tarif ${index + 1}`}
                  className="w-[65px] h-[65px] object-cover rounded-md"
                />
              ))}
            </div>

            {/* right  desc */}
            <div className=" py-10 absolute right-16">
              <h3 className="text-white font-semibold text-lg">
                1 Yillik obuna{" "}
              </h3>
              <p className="text-white text-[13px] max-w-[250px]">
                Letraset sheets containing Lorem Ipsum passages, and more
                recently with
              </p>
              <div className=" flex flex-wrap w-[300px] items-center gap-2 mt-5">
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Yangi elemntlar
                </button>
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Sifatli Format
                </button>
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  Yangiliklardan xabrdor bo’ling{" "}
                </button>
                <button className=" bg-[#4746689E] rounded-full text-center p-2 text-[14px]">
                  nimadur{" "}
                </button>
              </div>

              <button className=" bg-[#EC221F] text-center rounded-xl w-[300px] mt-8 p-2 text-[14px]">
                Oyiga 119 so’mga ulaning
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tariflar;
