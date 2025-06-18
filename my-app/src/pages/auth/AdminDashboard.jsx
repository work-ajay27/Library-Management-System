import React, { useEffect, useState } from "react";
import axios from "axios";
import BookForm from "../../components/BookForm";
import BookTable from "../../components/BookTable";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
    const [books, setBooks] = useState([]);
    const [editingBook, setEditingBook] = useState(null);
    const navigate = useNavigate();

    // Fetch books from backend
    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/books");
            setBooks(response.data);
        } catch (error) {
            console.error("Failed to fetch books:", error);
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    // Add or update book
    const handleSubmit = async (book) => {
        try {
            if (book.id) {
                // Update
                await axios.put(`http://localhost:8080/books/${book.id}`, book);
            } else {
                // Add
                await axios.post("http://localhost:8080/books", book);
            }
            fetchBooks();
            setEditingBook(null);
        } catch (error) {
            console.error("Error saving book:", error);
        }
    };

    // Edit book
    const handleEdit = (book) => {
        setEditingBook(book);
    };

    // Delete book
    const handleDelete = async (book) => {
        const confirm = window.confirm(`Are you sure you want to delete "${book.title}"?`);
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:8080/books/${book.id}`);
            fetchBooks();
        } catch (error) {
            console.error("Error deleting book:", error);
        }
    };

    // Logout
    const handleLogout = () => {
        // Clear any tokens if used
        // localStorage.removeItem("token");
        navigate("/login"); // redirect to login
    };

    return (
        <div className="p-6 bg-gray-100 min-h-screen">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold flex items-center gap-2">
                    <span role="img" aria-label="book">📚</span> Admin Dashboard
                </h1>
                <button
                    onClick={handleLogout}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Logout
                </button>
            </div>

            <div className="bg-white p-6 rounded shadow mb-6">
                <h2 className="text-lg font-semibold mb-4">Add / Edit Book</h2>
                <BookForm onSubmit={handleSubmit} initialData={editingBook} />
            </div>

            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-lg font-semibold mb-4">Books List</h2>
                <BookTable books={books} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
        </div>
    );
}

export default AdminDashboard;
