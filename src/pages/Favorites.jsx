import { useState, useEffect } from "react";
import BookCard from "../components/BookCard";
import toast from "react-hot-toast";
import { MdDelete } from "react-icons/md";

const Favorites = () => {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const storedFav = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFav);
  }, []);

  const handleRemove = (id) => {
    const updatedFav = favorites.filter((book) => book.id !== id);
    setFavorites(updatedFav);
    localStorage.setItem("favorites", JSON.stringify(updatedFav));
    toast.success("Book removed from favorites!");
  };

  if (favorites.length === 0)
    return (
      <p className="text-center mt-20 text-lg font-semibold">
        No favorite books added yet.
      </p>
    );

  return (
    <div className="min-h-screen pt-20 px-5 dark:bg-gray-900 dark:text-white">
      <h1 className="text-2xl md:text-3xl font-bold mb-5 text-center">
        Your Favorite Books
      </h1>
      <div className="flex flex-col md:flex-row flex-wrap gap-4 md:gap-10 md:pl-5 font-sans">
        {favorites.map((book) => (
          <div key={book.id} className="relative">
            <BookCard book={book} />
            <button
              onClick={() => handleRemove(book.id)}
              className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
            >
              <MdDelete size={18} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Favorites;
