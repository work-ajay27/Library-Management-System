import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBook = () => {
    const [book, setBook] = useState({
        title: '',
        author: '',
        price: '',
        year: ''
    });

    const handleChange = (e) => {
        setBook({ ...book, [e.target.name]: e.target.value });
    };

    const addBook = async () => {
        // Basic validation
        if (!book.title || !book.author || !book.price || !book.year) {
            toast.warning("Please fill in all fields.");
            return;
        }


        try {
            const response = await axios.post("http://localhost:8080/api/books", book); // <-- Update your backend URL if needed

            if (response.status === 200 || response.status === 201) {
                toast.success("Book added successfully!");
                setBook({ title: '', author: '', price: '', year: '' }); // Reset form
            } else {
                toast.error("Unexpected server response. Book may not have been added.");
            }
        } catch (error) {
            console.error("Error adding book:", error);
            toast.error("Failed to add book. Please check the server or input data.");
        }
    };

    return (
        <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
            <h2>Add Book</h2>
            <input
                name="title"
                placeholder="Title"
                value={book.title}
                onChange={handleChange}
                style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />
            <input
                name="author"
                placeholder="Author"
                value={book.author}
                onChange={handleChange}
                style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />
            <input
                name="price"
                type="number"
                placeholder="Price"
                value={book.price}
                onChange={handleChange}
                style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />
            <input
                name="year"
                type="number"
                placeholder="Year"
                value={book.year}
                onChange={handleChange}
                style={{ display: "block", marginBottom: "10px", width: "100%" }}
            />
            <button onClick={addBook} style={{ padding: "10px 20px" }}>
                Add Book
            </button>

            {/* Toast Container */}
            <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
        </div>
    );
};

export default AddBook;
