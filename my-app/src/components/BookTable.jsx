import React from "react";

function BookTable({ books, onEdit, onDelete }) {
  return (
    <table className="w-full text-left border-collapse">
      <thead>
        <tr className="bg-gray-100 text-gray-700">
          <th className="p-3 border">Name</th>
          <th className="p-3 border">Author</th>
          <th className="p-3 border">Price</th>
          <th className="p-3 border">Year</th>
          <th className="p-3 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {books.length === 0 ? (
          <tr>
            <td colSpan="5" className="text-center py-4 text-gray-500">
              No books added yet.
            </td>
          </tr>
        ) : (
          books.map((book) => (
            <tr key={book.id} className="border-t hover:bg-gray-50">
              <td className="p-3 border">{book.title}</td>
              <td className="p-3 border">{book.author}</td>
              <td className="p-3 border">{book.price}</td>
              <td className="p-3 border">{book.year}</td>
              <td className="p-3 border space-x-2">
                <button
                  onClick={() => onEdit(book)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => onDelete(book)}
                  className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default BookTable;
