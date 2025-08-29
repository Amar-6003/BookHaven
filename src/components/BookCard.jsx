import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  return (
    <>
      <Link to={`/book/${book.id}`}>
        <div className="card bg-base-100 w-full md:w-[20vw] h-[50vh] shadow-xl mb-8 dark:bg-gray-900 dark:text-white border border-white">
          <figure className="bg-gray-50">
            <img
              src={book.coverImage}
              alt={book.title}
              loading="lazy"
              className="object-contain h-full rounded-sm py-1"
            />
          </figure>
          <div className="card-body">
            <h2 className="card-title">{book.title}</h2>
            <h3 className="items-center">
              Author: <span className="font-semibold">{book.authors}</span>
            </h3>
            <h3 className="flex gap-1">
              Publish Year :
              <span className="font-semibold">{book.publishedYear}</span>
            </h3>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BookCard;
