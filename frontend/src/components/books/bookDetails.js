import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getBookById } from '../../services/api';

const BookDetails = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = async () => {
            try {
                const response = await getBookById(id);
                setBook(response.data);
            } catch (error) {
                console.error('Failed to fetch book details', error);
            }
        };

        fetchBookDetails();
    }, [id]);

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
          <div className="centered-card">
            <div className="book-card" style={{ marginTop: '2px' }}>
                <h2>{book.name}</h2>
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Published by:</strong> {book.publication}</p>
                <p><strong>Price:</strong> ₹{book.price}</p>
            </div>
         </div>
         <div>
         <p><strong>Description:</strong> {book.description}</p>
         </div>
      </div>
    );
};

export default BookDetails;
