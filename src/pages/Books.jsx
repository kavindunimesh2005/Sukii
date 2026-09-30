import React, { useState, useMemo, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import BookGrid from '../components/BookGrid';
import { BOOKS_DATA } from '../data/books';

export default function Books() {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    document.title = 'Book Designs & Archive — § 𝐔 𝐊 𝐈 𝐈';
  }, []);

  const categories = useMemo(() => {
    const cats = ['All'];
    BOOKS_DATA.forEach((book) => {
      if (book.category && !cats.includes(book.category)) {
        cats.push(book.category);
      }
    });
    return cats;
  }, []);

  const filteredBooks = useMemo(() => {
    if (activeCategory === 'All') return BOOKS_DATA;
    return BOOKS_DATA.filter((b) => b.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="books-page">
      {/* --- PAGE HEADER --- */}
      <section className="page-header-editorial">
        <div className="container">
          <ScrollReveal>
            <span className="editorial-meta-tag">ARCHIVE & PORTFOLIO</span>
            <h1 className="page-title-editorial">
              BOOK <span className="font-editorial">Designs</span>
            </h1>
            <p className="page-subtitle-editorial">
              A curated selection of bespoke covers, clothbound bindings, and interior editorial systems.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* --- FILTER CONTROLS --- */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-tabs">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? BOOKS_DATA.length
                    : BOOKS_DATA.filter((b) => b.category === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`filter-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    <span>{cat.toUpperCase()}</span>
                    <span className="tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="filter-summary">
              <span>SHOWING {filteredBooks.length} OF {BOOKS_DATA.length} EDITIONS</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- BOOKS GRID --- */}
      <section className="books-grid-section section-pad">
        <div className="container">
          {filteredBooks.length > 0 ? (
            <BookGrid books={filteredBooks} />
          ) : (
            <div className="empty-results-box">
              <p>No books currently categorized under "{activeCategory}".</p>
              <button
                onClick={() => setActiveCategory('All')}
                className="btn-atelier btn-outline-atelier"
              >
                RESET FILTERS
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
