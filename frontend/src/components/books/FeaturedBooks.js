import React, { useEffect, useState } from 'react';
import { getBooks } from '../../services/api';
import BookCard from './bookCard.js'
import '../../style/BookDetails.css'; 

const FeaturedBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetchFeaturedBooks();
    }, []);

    const fetchFeaturedBooks = async () => {
        try {
            const response = await getBooks();
            const data = response.data
            setBooks(data);
        } catch (error) {
            console.error('Failed to fetch books', error);
        }
    };

    return (
        <div className="book-grid">
            {books.map((book) => (
                <BookCard book={book} key={book.ID} />
            ))}
        </div>
    );
};

export default FeaturedBooks;
