import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import RingLoader from "react-spinners/RingLoader";
import toast from "react-hot-toast";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await fetch(
          `https://my-json-server.typicode.com/pranayBaynineventures/assignment-get_all_books/books/${id}`
        );
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setBook(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBook();
  }, [id]);

  const handleAddToFavorites = () => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.find((fav) => fav.id === book.id)) {
      favorites.push(book);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      toast.success("Book added to favorites!");
    } else {
      toast.error("Already in favorites!");
    }
  };

  if (error) return <p className="text-red-500 text-center">{error.message}</p>;

  return (
    <>
      <div className="dark:bg-gray-900 dark:text-white min-h-screen">
        {loading ? (
          <div className="fixed inset-0 flex justify-center items-center bg-white/70 dark:bg-black/70 z-50">
            <RingLoader color="#facc15" size={80} />
          </div>
        ) : (
          <div className="max-w-2xl p-5 lg:ml-10 min-h-screen pt-36 flex flex-col lg:flex-row gap-5">
            <img
              src={book.coverImage}
              alt={book.title}
              className="w-60 h-72 md:h-80 mx-auto md:mx-0 border border-yellow-300 rounded-md"
            />
            <div>
              <h1 className="text-2xl font-bold mt-4">{book.title}</h1>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                <span className="font-bold">Author:</span> {book.authors}
              </p>
              <p className="text-gray-600 dark:text-gray-400 font-sans">
                <span className="font-bold">First Published:</span>{" "}
                {book.publishedYear}
              </p>
              <p className="mt-2 font-sans">
                {book.description || "No description available."}
              </p>
              <button
                onClick={handleAddToFavorites}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
              >
                Add to Favorites
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default BookDetails;
