import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentDashboard() {
    const [books, setBooks] = useState([]);
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const user = JSON.parse(localStorage.getItem("user"));

    useEffect(() => {
        fetchBooks();
        fetchBorrowedBooks();
    }, []);

    const fetchBooks = async () => {
        try {
            const res = await axios.get("http://localhost:8080/api/books");
            setBooks(res.data);
        } catch (err) {
            console.error("Error fetching books:", err);
        }
    };

    const fetchBorrowedBooks = async () => {
        try {
            const res = await axios.get(`http://localhost:8080/api/books/borrowed?studentId=${user.id}`);
            setBorrowedBooks(res.data);
        } catch (err) {
            console.error("Error fetching borrowed books:", err);
        }
    };

    const handleBorrow = async (bookId) => {
        try {
            await axios.post(`http://localhost:8080/api/books/borrow?bookId=${bookId}&studentId=${user.id}`);
            alert("Book borrowed successfully!");
            fetchBooks();
            fetchBorrowedBooks();
        } catch (err) {
            console.error("Borrow failed:", err);
            alert("Error borrowing book");
        }
    };

    const handleReturn = async (bookId) => {
        try {
            await axios.post(`http://localhost:8080/api/books/return?bookId=${bookId}&studentId=${user.id}`);
            alert("Book returned!");
            fetchBooks();
            fetchBorrowedBooks();
        } catch (err) {
            console.error("Return failed:", err);
            alert("Error returning book");
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        window.location.href = "/";
    };

    const filteredBooks = books.filter(book =>
        book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100">
            {/* Navbar */}
            <nav className="bg-white shadow p-4 flex justify-between items-center">
                <div className="text-xl font-bold text-gray-800">📚 LMS - Student Dashboard</div>
                <div className="flex items-center space-x-4">
                    <span className="text-gray-600">{user.email}</span>
                    <button
                        onClick={handleLogout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                    >
                        Logout
                    </button>
                </div>
            </nav>

            <div className="p-6">
                <div className="mb-6">
                    <input
                        type="text"
                        placeholder="🔍 Search books by title..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full md:w-1/2 p-2 border border-gray-300 rounded shadow-sm"
                    />
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {/* Available Books */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-semibold mb-4 text-blue-600">
                            📚 Available Books
                        </h3>
                        <ul className="space-y-3">
                            {filteredBooks.map((book) => (
                                <li
                                    key={book.id}
                                    className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
                                >
                                    <span className="font-medium text-gray-700">{book.title}</span>
                                    <button
                                        onClick={() => handleBorrow(book.id)}
                                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Borrow
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Borrowed Books */}
                    <div className="bg-white p-6 rounded shadow">
                        <h3 className="text-xl font-semibold mb-4 text-green-600">
                            📖 Your Borrowed Books
                        </h3>
                        <ul className="space-y-3">
                            {borrowedBooks.map((book) => (
                                <li
                                    key={book.id}
                                    className="flex justify-between items-center p-3 border rounded hover:bg-gray-50"
                                >
                                    <span className="font-medium text-gray-700">{book.title}</span>
                                    <button
                                        onClick={() => handleReturn(book.id)}
                                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                                    >
                                        Return
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default StudentDashboard;
