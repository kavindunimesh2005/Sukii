import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import { BOOKS_DATA } from '../data/books';

export default function BookDetails() {
  const { id } = useParams();
  const bookIndex = BOOKS_DATA.findIndex((b) => b.id === id);
  const book = BOOKS_DATA[bookIndex];

  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    if (book) {
      document.title = `${book.title} — § 𝐔 𝐊 𝐈 𝐈 Case Study`;
      setActiveImage(book.coverImage);
      window.scrollTo(0, 0);
    } else {
      document.title = 'Edition Not Found — § 𝐔 𝐊 𝐈 𝐈';
    }
  }, [id, book]);

  if (!book) {
    return (
      <div className="not-found-page section-pad">
        <div className="container text-center">
          <span className="editorial-meta-tag">ARCHIVE REFERENCE ERROR</span>
          <h1 className="page-title-editorial">EDITION NOT FOUND</h1>
          <p className="page-subtitle-editorial">
            The requested book design catalogue entry could not be located.
          </p>
          <div className="mt-4">
            <Link to="/books" className="btn-atelier btn-primary-atelier">
              <i className="bi bi-arrow-left"></i> RETURN TO BOOK ARCHIVE
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Calculate prev and next editions
  const prevBook = bookIndex > 0 ? BOOKS_DATA[bookIndex - 1] : BOOKS_DATA[BOOKS_DATA.length - 1];
  const nextBook = bookIndex < BOOKS_DATA.length - 1 ? BOOKS_DATA[bookIndex + 1] : BOOKS_DATA[0];

  const allImages = [
    { label: 'Front Cover', src: book.coverImage },
    ...(book.backCoverImage ? [{ label: 'Back Jacket', src: book.backCoverImage }] : []),
    ...(book.interiorSpreads ? book.interiorSpreads.map((s, i) => ({ label: `Interior Spread 0${i + 1}`, src: s })) : [])
  ];

  return (
    <div className="book-details-page">
      {/* --- BREADCRUMB & TOP NAV --- */}
      <div className="container details-top-bar">
        <Link to="/books" className="back-link">
          <i className="bi bi-arrow-left"></i> BACK TO ARCHIVE
        </Link>
        <div className="edition-nav-pill">
          <span>EDITION {bookIndex + 1} OF {BOOKS_DATA.length}</span>
        </div>
      </div>

      {/* --- HERO SHOWCASE --- */}
      <section className="details-hero-section">
        <div className="container">
          <div className="details-grid">
            {/* Visual Column */}
            <div className="details-visual-col">
              <ScrollReveal>
                <div className="main-display-frame">
                  <img
                    src={activeImage || book.coverImage}
                    alt={book.title}
                    className="main-display-image"
                  />
                  <div className="display-tag">
                    <span>{book.format}</span>
                  </div>
                </div>

                {/* Thumbnails */}
                <div className="thumbnail-gallery-row">
                  {allImages.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img.src)}
                      className={`thumb-btn ${activeImage === img.src ? 'active-thumb' : ''}`}
                      title={img.label}
                    >
                      <img src={img.src} alt={img.label} />
                      <span className="thumb-label">{img.label}</span>
                    </button>
                  ))}
                </div>
              </ScrollReveal>
            </div>

            {/* Info Column */}
            <div className="details-info-col">
              <ScrollReveal delay={100}>
                <div className="details-meta-header">
                  <span className="info-cat-badge">{book.categoryLabel || book.category}</span>
                  <span className="info-year-badge">{book.year}</span>
                </div>

                <h1 className="details-title">{book.title}</h1>
                <p className="details-author">By {book.author}</p>

                {book.tagline && (
                  <p className="details-tagline font-editorial">"{book.tagline}"</p>
                )}

                <div className="details-section-block">
                  <h3 className="details-subhead">OVERVIEW</h3>
                  <p className="details-text">{book.description}</p>
                </div>

                <div className="details-section-block">
                  <h3 className="details-subhead">DESIGN CONCEPT</h3>
                  <p className="details-text">{book.concept}</p>
                </div>

                {/* Spine Lettering Showcase */}
                {book.spineText && (
                  <div className="spine-preview-strip">
                    <span className="spine-preview-label">SPINE LETTERING ENGRAVING:</span>
                    <div className="spine-preview-box">
                      <span className="spine-text-content">{book.spineText}</span>
                    </div>
                  </div>
                )}

                {/* Technical Specifications Table */}
                <div className="tech-specs-table">
                  <h3 className="details-subhead">PHYSICAL SPECIFICATIONS</h3>
                  <div className="specs-list">
                    <div className="spec-row">
                      <span className="spec-k">Format & Binding:</span>
                      <span className="spec-v">{book.format}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-k">Trim Dimensions:</span>
                      <span className="spec-v">{book.dimensions}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-k">Page Count:</span>
                      <span className="spec-v">{book.pages}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-k">Primary Typeface:</span>
                      <span className="spec-v">{book.typeface}</span>
                    </div>
                    <div className="spec-row">
                      <span className="spec-k">Publisher / Imprint:</span>
                      <span className="spec-v">{book.publisher}</span>
                    </div>
                  </div>
                </div>

                <div className="details-cta-box">
                  <Link
                    to={`/contact?subject=${encodeURIComponent(`Inquiry regarding ${book.title} design style`)}`}
                    className="btn-atelier btn-primary-atelier w-100 text-center"
                  >
                    <span>COMMISSION SIMILAR EDITION</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- PREV / NEXT NAVIGATION FOOTER --- */}
      <section className="edition-pagination-section">
        <div className="container">
          <div className="pagination-grid">
            <Link to={`/books/${prevBook.id}`} className="pag-card pag-prev">
              <span className="pag-dir"><i className="bi bi-arrow-left"></i> PREVIOUS EDITION</span>
              <h4 className="pag-title">{prevBook.title}</h4>
              <span className="pag-author">By {prevBook.author}</span>
            </Link>

            <div className="pag-center-divider">
              <Link to="/books" className="btn-atelier btn-outline-atelier btn-sm-atelier">
                ALL EDITIONS
              </Link>
            </div>

            <Link to={`/books/${nextBook.id}`} className="pag-card pag-next">
              <span className="pag-dir">NEXT EDITION <i className="bi bi-arrow-right"></i></span>
              <h4 className="pag-title">{nextBook.title}</h4>
              <span className="pag-author">By {nextBook.author}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
