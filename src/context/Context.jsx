import React, { createContext, useContext, useState } from "react";

// Context yaratish
const ProductContext = createContext(null);

// Context Provider
const ProductContextProvider = ({ children }) => {
  const [favorite, setFavorite] = useState(() => {
    const savedFavorites = localStorage.getItem("favorites");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = async (e) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term) {
      try {
        const response = await axios.get(`${aniDubApi}?name=*${term}`);
        setSearchResults(response.data || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
        setSearchResults([]);
      }
    } else {
      setSearchResults([]);
    }
  };

  // Mahsulotni favorites-ga qo'shish
  const addToFavorite = (product) => {
    const isProductInFavorites = favorite.some(
      (item) => item.id === product.id
    );
    if (!isProductInFavorites) {
      const updatedFavorites = [...favorite, product];
      setFavorite(updatedFavorites);
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    }
  };

  // Favouritesdan o'chirish
  const deleteFromFavorite = (productId) => {
    const updatedFavorites = favorite.filter((item) => item.id !== productId);
    setFavorite(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <ProductContext.Provider
      value={{
        favorite,
        addToFavorite,
        deleteFromFavorite,
        handleSearchChange,
        setSearchTerm,
        searchTerm,
        searchResults,
        setSearchResults,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

// Custom hook
export const useProduct = () => {
  return useContext(ProductContext);
};

// Providerni eksport qilish
export default ProductContextProvider;
