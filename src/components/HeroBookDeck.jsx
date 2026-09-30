import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const HERO_BOOKS = [
  {
    id: 'architecture-of-silence',
    title: 'The Architecture of Silence',
    author: 'Owens & Chen — 2026',
    category: 'Featured Monograph',
    image: '/assets/books/architecture-of-silence.jpg'
  },
  {
    id: 'chronicles-nocturne',
    title: 'Chronicles of the Nocturne',
    author: 'Eliza Vance — 2025',
    category: 'Celestial Novel',
    image: '/assets/books/chronicles-nocturne.jpg'
  },
  {
    id: 'ephemeral-form-void',
    title: 'Ephemeral Form & Void',
    author: 'Museum Zurich — 2025',
    category: 'Sculptural Catalogue',
    image: '/assets/books/ephemeral-form-void.jpg'
  }
];

export default function HeroBookDeck() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [glareStyle, setGlareStyle] = useState({});
  const stageRef = useRef(null);
  const bookRef = useRef(null);
  const navigate = useNavigate();

  const currentBook = HERO_BOOKS[activeIndex];

  const handleMouseMove = (e) => {
    if (!stageRef.current || !bookRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -14;
    const rotateY = ((x - centerX) / centerX) * 18;

    bookRef.current.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.03, 1.03, 1.03)`;

    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;
    setGlareStyle({
      background: `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 60%)`,
      opacity: 0.9
    });
  };

  const handleMouseLeave = () => {
    if (!bookRef.current) return;
    bookRef.current.style.transform = 'rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    setGlareStyle({ opacity: 0.75 });
  };

  const switchDeck = (idx) => {
    if (idx === activeIndex || isFlipping) return;
    setIsFlipping(true);

    if (bookRef.current) {
      bookRef.current.style.transform = 'rotateY(90deg) scale(0.95)';
      bookRef.current.style.opacity = '0.5';
    }

    setTimeout(() => {
      setActiveIndex(idx);
      if (bookRef.current) {
        bookRef.current.style.transform = 'rotateY(0deg) scale(1)';
        bookRef.current.style.opacity = '1';
      }
      setIsFlipping(false);
    }, 300);
  };

  return (
    <div
      ref={stageRef}
      className="hero-book-stage"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={bookRef}
        className="hero-book-3d"
        onClick={() => navigate(`/books/${currentBook.id}`)}
        title={`Click to view case study: ${currentBook.title}`}
      >
        <div className="hero-book-spine" />
        <img
          src={currentBook.image}
          alt={currentBook.title}
          className="hero-book-cover-img"
        />
        <div className="hero-book-glare" style={glareStyle} />
      </div>

      <div className="hero-floating-badge d-none d-sm-block">
        <div className="text-meta text-dim mb-1">{currentBook.category}</div>
        <div className="font-display fw-bold" style={{ fontSize: '0.95rem' }}>
          {currentBook.title}
        </div>
        <div className="font-editorial text-secondary" style={{ fontSize: '0.85rem' }}>
          {currentBook.author}
        </div>
      </div>

      {/* Interactive Deck Navigation */}
      <div className="hero-deck-nav">
        {HERO_BOOKS.map((b, idx) => (
          <button
            key={b.id}
            className={`hero-deck-btn ${idx === activeIndex ? 'active' : ''}`}
            onClick={() => switchDeck(idx)}
          >
            0{idx + 1}. {b.title.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
