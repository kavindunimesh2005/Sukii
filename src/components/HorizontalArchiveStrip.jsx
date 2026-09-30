import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { BOOKS_DATA } from '../data/books';

export default function HorizontalArchiveStrip() {
  const scrollContainerRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -420, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 420, behavior: 'smooth' });
    }
  };

  return (
    <section className="horizontal-archive-section">
      <div className="container">
        <div className="archive-strip-header">
          <div>
            <span className="editorial-meta-tag">THE BOUND ARCHIVE</span>
            <h2 className="section-title-editorial">
              CATALOGUE <span className="font-editorial">Reel</span>
            </h2>
          </div>
          <div className="reel-controls">
            <button onClick={scrollLeft} className="reel-nav-btn" aria-label="Scroll left">
              <i className="bi bi-arrow-left" />
            </button>
            <button onClick={scrollRight} className="reel-nav-btn" aria-label="Scroll right">
              <i className="bi bi-arrow-right" />
            </button>
            <Link to="/books" className="view-all-pill">
              ALL EDITIONS ({BOOKS_DATA.length})
            </Link>
          </div>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="horizontal-scroll-track" ref={scrollContainerRef}>
        {BOOKS_DATA.map((book, idx) => (
          <div key={book.id} className="archive-reel-card">
            <Link to={`/books/${book.id}`} className="reel-card-inner">
              <div className="reel-card-index">0{idx + 1}</div>
              <div className="reel-card-image-wrap">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="reel-card-img"
                  loading="lazy"
                />
                <div className="reel-card-hover-overlay">
                  <span>INSPECT CASE STUDY <i className="bi bi-arrow-right" /></span>
                </div>
              </div>

              <div className="reel-card-info">
                <span className="reel-cat">{book.categoryLabel || book.category}</span>
                <h3 className="reel-title">{book.title}</h3>
                <p className="reel-author">By {book.author}</p>
                <div className="reel-specs-footer">
                  <span>{book.year}</span>
                  <span>•</span>
                  <span>{book.format.split(' ')[0]}</span>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
