const BookCard = ({ book, currentUserId, handleBorrow, handleReturn }) => {
  return (
    <div className="card bg-base-100 shadow-md w-72">
      <div className="card-body">
        <h2 className="card-title text-lg font-semibold">{book.title}</h2>

        <p className="text-sm text-gray-600">by {book.author}</p>

        <p
          className={`mt-2 font-medium ${
            book.isAvailable ? "text-green-600" : "text-red-600"
          }`}
        >
          {book.isAvailable ? "Available" : "Borrowed"}
        </p>

        {/* Actions */}
        <div className="card-actions justify-end mt-4">
          {!book.isAvailable && book.borrowedBy === currentUserId ? (
            <button
              className="btn btn-sm btn-secondary"
              onClick={() => handleReturn(book._id)}
            >
              Return
            </button>
          ) : (
            book.isAvailable && (
              <button
                className="btn btn-sm btn-primary"
                onClick={() => handleBorrow(book._id)}
              >
                Borrow
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
