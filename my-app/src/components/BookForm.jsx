import React, { useState, useEffect } from "react";

function BookForm({ onSubmit, initialData }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [year, setYear] = useState("");

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setAuthor(initialData.author);
            setPrice(initialData.price);
            setYear(initialData.year);
        } else {
            setTitle("");
            setAuthor("");
            setPrice("");
            setYear("");
        }
    }, [initialData]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !author || !price || !year) {
            alert("Please fill in all fields");
            return;
        }

        const book = { title, author, price, year };
        if (initialData && initialData.id) {
            book.id = initialData.id; // carry ID for editing
        }

        onSubmit(book);
        setTitle("");
        setAuthor("");
        setPrice("");
        setYear("");
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-wrap gap-4 items-center">
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border px-3 py-2 rounded w-1/5"
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border px-3 py-2 rounded w-1/5"
            />
            <input
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border px-3 py-2 rounded w-1/5"
            />
            <input
                type="number"
                placeholder="Publish Year"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className="border px-3 py-2 rounded w-1/5"
            />
            <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
            >
                {initialData ? "Update" : "Add"}
            </button>
        </form>
    );
}

export default BookForm;
