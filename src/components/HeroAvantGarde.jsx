import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlueprintOverlay from './BlueprintOverlay';
import { BOOKS_DATA } from '../data/books';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

export default function HeroAvantGarde() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isRotating, setIsRotating] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glintPos, setGlintPos] = useState({ x: 30, y: 30 });
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { playTactileClick, playFoilChime } = useAudioFeedback();

  const heroBooks = BOOKS_DATA.slice(0, 4);
  const activeBook = heroBooks[selectedIdx];

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -18;
    const rotateY = ((x - centerX) / centerX) * 22;

    const glintX = (x / rect.width) * 100;
    const glintY = (y / rect.height) * 100;

    setGlintPos({ x: glintX, y: glintY });
    setTiltStyle({
      transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.1s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1400px) rotateX(-8deg) rotateY(15deg) scale3d(1, 1, 1)',
      transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
    });
  };

  const handleSelectBook = (idx) => {
    if (idx === selectedIdx || isRotating) return;
    playFoilChime();
    setIsRotating(true);
    setTimeout(() => {
      setSelectedIdx(idx);
      setIsRotating(false);
    }, 280);
  };

  return (
    <section className="avant-garde-hero-section">
      {/* Background Animated Stardust & Light Mesh */}
      <div className="hero-mesh-background" />
      <div className="hero-radial-spotlight" />

      {/* Monumental Watermark Text */}
      <div className="hero-background-monument">
        <span>§ 𝐔 𝐊 𝐈 𝐈 • ÉDITION 2026</span>
      </div>

      <div className="container hero-container-avant">
        <div className="hero-avant-grid">
          {/* Left Column: Monumental Editorial Typography */}
          <div className="hero-avant-content">
            <div className="hero-atelier-tag">
              <span className="live-status-dot" />
              <span className="atelier-tag-text">ATELIER § 𝐔 𝐊 𝐈 𝐈 // HAUTE-COUTURE 2026</span>
            </div>

            <h1 className="hero-monument-title">
              <span className="title-row-1">SHAPING</span>
              <span className="title-row-2">
                <span className="hero-serif-italic">The Void</span>
              </span>
              <span className="title-row-3">INTO BOOKS.</span>
            </h1>

            <p className="hero-avant-lead">
              Museum-grade physical editions, chiseled bespoke typography, and tactile reading architectures conceived for world-class literary authors, architecture monographs, and cultural institutions.
            </p>

            <div className="hero-actions-row">
              <Link to="/books" className="btn-atelier btn-primary-atelier">
                <span>EXPLORE ARCHIVE ({BOOKS_DATA.length})</span>
                <i className="bi bi-arrow-right" />
              </Link>
              <Link to="/contact" className="btn-atelier btn-outline-atelier">
                <span>COMMISSION ATELIER</span>
              </Link>
            </div>

            {/* Curated Edition Selector Strip with Mini Cover Thumbs */}
            <div className="hero-edition-selector-strip">
              <div className="strip-header-row">
                <span className="strip-label">CURATED EDITIONS:</span>
                <span className="strip-active-index">0{selectedIdx + 1} / 0{heroBooks.length}</span>
              </div>
              <div className="edition-chips-row">
                {heroBooks.map((b, idx) => (
                  <button
                    key={b.id}
                    onClick={() => handleSelectBook(idx)}
                    className={`edition-chip-btn ${idx === selectedIdx ? 'active' : ''}`}
                    title={b.title}
                  >
                    <img src={b.coverImage} alt={b.title} className="chip-thumb" />
                    <div className="chip-text">
                      <span className="chip-num">0{idx + 1}</span>
                      <span className="chip-title">{b.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Monumental Book Sculpture with Light Glint */}
          <div className="hero-avant-visual">
            <div
              ref={containerRef}
              className={`hero-book-monument-stage ${isRotating ? 'rotating' : ''}`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <BlueprintOverlay>
                <div
                  className="book-3d-sculpture-hero"
                  style={tiltStyle}
                  onClick={() => {
                    playTactileClick();
                    navigate(`/books/${activeBook.id}`);
                  }}
                  title={`Inspect case study: ${activeBook.title}`}
                >
                  {/* Spine Geometry */}
                  <div className="hero-spine-box">
                    <span className="hero-spine-text">{activeBook.spineText || activeBook.title}</span>
                  </div>

                  {/* Front Cover Plate */}
                  <div className="hero-front-box">
                    <img
                      src={activeBook.coverImage}
                      alt={activeBook.title}
                      className="hero-book-cover-img"
                    />
                    {/* Directional Foil Glint following mouse */}
                    <div
                      className="hero-interactive-glint"
                      style={{
                        background: `radial-gradient(circle at ${glintPos.x}% ${glintPos.y}%, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)`
                      }}
                    />
                    <div className="hero-spine-crease-shadow" />
                  </div>

                  {/* Reflected Shadow Floor */}
                  <div className="hero-pedestal-shadow-reflection" />
                </div>
              </BlueprintOverlay>

              {/* Floating Glassmorphism Specification Card */}
              <div className="hero-floating-spec-card">
                <div className="spec-card-badge">{activeBook.categoryLabel || activeBook.category}</div>
                <h4 className="spec-card-book-title">{activeBook.title}</h4>
                <div className="spec-card-author-line">By {activeBook.author} • {activeBook.year}</div>
                <div className="spec-card-format-pill">{activeBook.format}</div>
                <Link to={`/books/${activeBook.id}`} className="spec-card-inspect-link">
                  <span>INSPECT EDITION</span>
                  <i className="bi bi-arrow-up-right" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Technical Status Strip */}
      <div className="hero-bottom-status-strip">
        <div className="container status-strip-inner">
          <div className="status-col">
            <span className="status-k">PRINT CERTIFICATION:</span>
            <span className="status-v">ISO-12647-2 / GRACoL 2026</span>
          </div>
          <div className="status-col">
            <span className="status-k">BINDING METHODOLOGY:</span>
            <span className="status-v">Ota-Bound & Smyth Sewn</span>
          </div>
          <div className="status-col">
            <span className="status-k">COMMISSION SLATE:</span>
            <span className="status-v">2026 CYCLE NOW OPEN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
