import React, { useState } from 'react';
import axios from 'axios';

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
        try {
            const response = await axios.post("http://localhost:8080/api/book/add", book);
            console.log("Book added:", response.data);
            alert("Book added successfully!");
            setBook({ title: '', author: '', price: '', year: '' });
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };

    return (
        <div>
            <h2>Add Book</h2>
            <input name="title" placeholder="Title" value={book.title} onChange={handleChange} /><br />
            <input name="author" placeholder="Author" value={book.author} onChange={handleChange} /><br />
            <input name="price" type="number" placeholder="Price" value={book.price} onChange={handleChange} /><br />
            <input name="year" type="number" placeholder="Year" value={book.year} onChange={handleChange} /><br />
            <button onClick={addBook}>Add Book</button>
        </div>
    );
};

export default AddBook;
