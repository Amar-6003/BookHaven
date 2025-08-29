import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import RingLoader from "react-spinners/RingLoader";

const Home = ({ search, setSearch, currentPageNo, setCurrentPageNo }) => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const booksPerPage = 8;

  useEffect(() => {
    fetch(
      `https://my-json-server.typicode.com/pranayBaynineventures/assignment-get_all_books/books`
    )
      .then((res) => res.json())
      .then((data) => {
        setBooks(data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (error) return <p className="text-center text-red-500">{error.message}</p>;

  const filteredBook = books.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  const startIndex = (currentPageNo - 1) * booksPerPage;
  const endIndex = startIndex + booksPerPage;
  const currentBooks = filteredBook.slice(startIndex, endIndex);

  // total pages
  const totalPages = Math.ceil(filteredBook.length / booksPerPage);

  useEffect(() => {
    localStorage.setItem("currentPageNo", currentPageNo);
  }, [currentPageNo]);

  return (
    <>
      <div className="min-h-screen pt-20 px-5 dark:bg-gray-900 dark:text-white">
        <div className="flex flex-col gap-4 justify-center font-sans">
          <div className="form-control">
            <input
              type="text"
              placeholder="Search for books..."
              className="px-4 py-2 w-full border border-black dark:border-white outline-none rounded-full dark:bg-gray-900 dark:text-white"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          {loading ? (
            <div className="fixed inset-0 flex justify-center items-center bg-white/70 dark:bg-black/70 z-50">
              <RingLoader color="#facc15" size={80} />
            </div>
          ) : (
            <div className="flex flex-col md:flex-row flex-wrap justify-around gap-4 pt-8 min-h-screen">
              {currentBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          )}

          <div className="flex justify-center pt-3">
            <Pagination
              currentPageNo={currentPageNo}
              setCurrentPageNo={setCurrentPageNo}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
