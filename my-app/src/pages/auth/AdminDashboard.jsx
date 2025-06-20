import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const AdminDashboard = () => {
    const [books, setBooks] = useState([]);
    const [newBook, setNewBook] = useState({
        title: "", author: "", price: "", year: ""
    });

    const fetchBooks = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/book/retrive");
            setBooks(response.data);
        } catch (error) {
            toast.error("Failed to fetch books.");
        }
    };

    const handleChange = (e) => {
        setNewBook({ ...newBook, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            await axios.post("http://localhost:8080/api/book/add", newBook);
            toast.success("Book added successfully!");
            setNewBook({ title: "", author: "", price: "", year: "" });
            fetchBooks();
        } catch (error) {
            toast.error("Error adding book.");
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/book/delete/${id}`);
            toast.success("Book deleted.");
            fetchBooks();
        } catch (error) {
            toast.error("Delete failed.");
        }
    };

    useEffect(() => {
        fetchBooks();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">📚 Admin Dashboard</h1>
                <button className="bg-red-500 text-white px-4 py-2 rounded">Logout</button>
            </div>

            {/* Add Book Form */}
            <div className="bg-white p-6 rounded shadow mb-8">
                <h2 className="text-xl font-semibold mb-4">Add / Edit Book</h2>
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <input name="title" placeholder="Title" value={newBook.title} onChange={handleChange}
                        className="border rounded px-3 py-2" />
                    <input name="author" placeholder="Author" value={newBook.author} onChange={handleChange}
                        className="border rounded px-3 py-2" />
                    <input name="price" type="number" placeholder="Price" value={newBook.price} onChange={handleChange}
                        className="border rounded px-3 py-2" />
                    <input name="year" type="number" placeholder="Publish Year" value={newBook.year} onChange={handleChange}
                        className="border rounded px-3 py-2" />
                    <button onClick={handleSubmit} className="bg-green-500 text-white px-4 py-2 rounded">Add</button>
                </div>
            </div>

            {/* Book List Table */}
            <div className="bg-white p-6 rounded shadow">
                <h2 className="text-xl font-semibold mb-4">Books List</h2>
                <table className="w-full table-auto text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100 text-gray-700">
                            <th className="p-3">Name</th>
                            <th className="p-3">Author</th>
                            <th className="p-3">Price</th>
                            <th className="p-3">Year</th>
                            <th className="p-3">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4">No books added yet.</td>
                            </tr>
                        ) : (
                            books.map((book) => (
                                <tr key={book.id} className="border-t hover:bg-gray-50">
                                    <td className="p-3">{book.title}</td>
                                    <td className="p-3">{book.author}</td>
                                    <td className="p-3">₹{book.price}</td>
                                    <td className="p-3">{book.year}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => handleDelete(book.id)}
                                            className="bg-red-500 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <ToastContainer position="top-right" autoClose={2500} />
        </div>
    );
};

export default AdminDashboard;
