import React from 'react';
import { Link } from 'react-router-dom';

export default function BookCard({ book }) {
  return (
    <div className="book-card-editorial h-100">
      <div className="book-card-img-wrap">
        <img
          src={book.coverImage}
          alt={book.title}
          className="book-card-img"
          loading="lazy"
        />
        <div className="book-card-overlay">
          <Link
            to={`/books/${book.id}`}
            className="btn-editorial btn-editorial-sm btn-editorial-solid w-100"
          >
            View Project Details <i className="bi bi-arrow-right ms-1" />
          </Link>
        </div>
      </div>
      <div className="book-card-body">
        <div>
          <div className="book-card-meta">
            <span className="editorial-badge">{book.category}</span>
            <span className="text-meta">{book.year}</span>
          </div>
          <h3 className="book-card-title">{book.title}</h3>
          <p className="book-card-author">{book.author}</p>
          <p className="book-card-desc">
            {book.description.substring(0, 115)}...
          </p>
        </div>
        <div className="pt-3 border-top border-dark-subtle d-flex justify-content-between align-items-center">
          <span className="text-meta">{book.dimensions}</span>
          <Link
            to={`/books/${book.id}`}
            className="text-meta text-decoration-none hover-underline"
          >
            Explore Edition →
          </Link>
        </div>
      </div>
    </div>
  );
}
