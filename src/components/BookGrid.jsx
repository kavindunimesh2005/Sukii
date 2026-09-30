import React from 'react';
import BookCard from './BookCard';

export default function BookGrid({ books }) {
  return (
    <div className="row g-4">
      {books.map((book, index) => (
        <div
          key={book.id}
          className="col-lg-4 col-md-6 mb-4 reveal-fade revealed"
          style={{ transitionDelay: `${index * 0.08}s` }}
        >
          <BookCard book={book} />
        </div>
      ))}
    </div>
  );
}
