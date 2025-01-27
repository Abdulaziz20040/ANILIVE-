import React, { useEffect, useState } from "react";
import axios from "axios";

function Filter() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("https://a510c4f98367eca1.mokky.dev/aniDub")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const renderSection = (title, items) => {
    return (
      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {items?.map((item, index) => (
            <div
              key={index}
              className="relative bg-gray-700 rounded-lg overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-32 object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                <span className="text-white font-semibold">{item.name}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-4 bg-gray-900 text-white">
      {/* Render each section */}
      {renderSection("Janrlar", data?.janrlar)}
      {renderSection("Formatlar", data?.formatlar)}
      {renderSection("Status", data?.status)}
    </div>
  );
}

export default Filter;
