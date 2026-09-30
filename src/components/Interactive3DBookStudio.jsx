import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BOOKS_DATA } from '../data/books';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

export default function Interactive3DBookStudio() {
  const [selectedBookIdx, setSelectedBookIdx] = useState(0);
  const [viewMode, setViewMode] = useState('front'); // 'front', 'spine', 'back', 'unfold', 'orbit'
  const [mouseRot, setMouseRot] = useState({ x: -8, y: 15 });
  const [isOrbiting, setIsOrbiting] = useState(false);
  const [orbitAngle, setOrbitAngle] = useState(0);
  const stageRef = useRef(null);
  const navigate = useNavigate();
  const { playTactileClick, playFoilChime, playPaperRustle } = useAudioFeedback();

  const currentBook = BOOKS_DATA[selectedBookIdx];

  // Continuous Orbit Loop
  useEffect(() => {
    let animId;
    if (viewMode === 'orbit') {
      setIsOrbiting(true);
      const loop = () => {
        setOrbitAngle((prev) => (prev + 0.75) % 360);
        animId = requestAnimationFrame(loop);
      };
      animId = requestAnimationFrame(loop);
    } else {
      setIsOrbiting(false);
    }
    return () => cancelAnimationFrame(animId);
  }, [viewMode]);

  const handleMouseMove = (e) => {
    if (viewMode === 'orbit' || viewMode === 'unfold') return;
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotX = ((y - centerY) / centerY) * -18;
    const rotY = ((x - centerX) / centerX) * 24;

    setMouseRot({ x: rotX, y: rotY });
  };

  const handleMouseLeave = () => {
    if (viewMode === 'front') {
      setMouseRot({ x: -6, y: 12 });
    } else if (viewMode === 'spine') {
      setMouseRot({ x: 0, y: 88 });
    } else if (viewMode === 'back') {
      setMouseRot({ x: -4, y: 175 });
    }
  };

  const changeView = (mode) => {
    playTactileClick();
    setViewMode(mode);
    if (mode === 'front') {
      setMouseRot({ x: -6, y: 12 });
    } else if (mode === 'spine') {
      playFoilChime();
      setMouseRot({ x: 0, y: 88 });
    } else if (mode === 'back') {
      playPaperRustle();
      setMouseRot({ x: -4, y: 175 });
    } else if (mode === 'unfold') {
      playPaperRustle();
    } else if (mode === 'orbit') {
      playFoilChime();
    }
  };

  const selectBook = (idx) => {
    playFoilChime();
    setSelectedBookIdx(idx);
  };

  // Compute 3D Transform
  let transform3D = '';
  if (viewMode === 'orbit') {
    transform3D = `perspective(1600px) rotateY(${orbitAngle}deg) rotateX(-5deg)`;
  } else if (viewMode === 'unfold') {
    transform3D = 'none';
  } else {
    transform3D = `perspective(1600px) rotateX(${mouseRot.x}deg) rotateY(${mouseRot.y}deg)`;
  }

  return (
    <div className="book-3d-studio-container" ref={stageRef} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {/* Studio Header Control Bar */}
      <div className="studio-top-controls">
        <div className="studio-brand-badge">
          <span className="studio-dot" />
          <span>3D COVER ATELIER STUDIO</span>
        </div>

        {/* View Angle Selector Buttons */}
        <div className="studio-angle-pills">
          <button
            className={`angle-btn ${viewMode === 'front' ? 'active' : ''}`}
            onClick={() => changeView('front')}
          >
            <i className="bi bi-box" /> FRONT 3D
          </button>
          <button
            className={`angle-btn ${viewMode === 'spine' ? 'active' : ''}`}
            onClick={() => changeView('spine')}
          >
            <i className="bi bi-layout-sidebar-inset" /> SPINE MACRO
          </button>
          <button
            className={`angle-btn ${viewMode === 'back' ? 'active' : ''}`}
            onClick={() => changeView('back')}
          >
            <i className="bi bi-arrow-repeat" /> BACK JACKET
          </button>
          <button
            className={`angle-btn ${viewMode === 'unfold' ? 'active' : ''}`}
            onClick={() => changeView('unfold')}
          >
            <i className="bi bi-layout-three-columns" /> UNFOLD WRAPAROUND
          </button>
          <button
            className={`angle-btn orbit-btn ${viewMode === 'orbit' ? 'active' : ''}`}
            onClick={() => changeView('orbit')}
          >
            <i className="bi bi-arrow-clockwise" /> 360° ORBIT
          </button>
        </div>
      </div>

      {/* Main 3D Stage / Unfold Viewport */}
      {viewMode === 'unfold' ? (
        /* --- FLAT MECHANICAL JACKET UNFOLD VIEW --- */
        <div className="unfold-jacket-stage">
          <div className="jacket-printer-marks">
            <span className="mark-crop top-left" />
            <span className="mark-crop top-right" />
            <span className="mark-crop bottom-left" />
            <span className="mark-crop bottom-right" />
            <div className="cmyk-calibration-strip">
              <span className="cmyk-c" />
              <span className="cmyk-m" />
              <span className="cmyk-y" />
              <span className="cmyk-k" />
              <span className="cmyk-silver" />
            </div>
            <div className="jacket-specs-header">
              <span>MECHANICAL JACKET SPREAD • BLEED: 5.0MM • TOTAL TRIM: 540 × 310MM</span>
              <span>TYPEFACE: VEGAWANTY & NEUE HAAS GROTESK • § 𝐔 𝐊 𝐈 𝐈</span>
            </div>
          </div>

          <div className="unfolded-dust-jacket">
            {/* Back Flap */}
            <div className="jacket-panel back-flap">
              <span className="panel-tag">BACK FLAP</span>
              <div className="flap-content">
                <h5 className="flap-title">ABOUT THE AUTHOR</h5>
                <p className="flap-text">
                  {currentBook.author} is an acclaimed literary voice whose works investigate contemporary spatial silence and poetic memory.
                </p>
                <div className="flap-colophon">
                  <span>Jacket Design: § 𝐔 𝐊 𝐈 𝐈</span>
                  <span>Zurich / Paris Atelier</span>
                </div>
              </div>
            </div>

            {/* Back Cover */}
            <div className="jacket-panel back-cover">
              <span className="panel-tag">BACK COVER</span>
              <div className="back-cover-body">
                <p className="back-quote">
                  "{currentBook.tagline || currentBook.description}"
                </p>
                <div className="back-barcode-box">
                  <div className="barcode-graphic" />
                  <span className="isbn-number">ISBN 978-0-262-51763-8</span>
                </div>
              </div>
            </div>

            {/* Spine */}
            <div className="jacket-panel spine-panel">
              <span className="panel-tag">SPINE</span>
              <div className="spine-vertical-text">
                <span className="spine-title">{currentBook.title}</span>
                <span className="spine-sep">—</span>
                <span className="spine-author">{currentBook.author}</span>
                <span className="spine-logo">§ 𝐔 𝐊 𝐈 𝐈</span>
              </div>
            </div>

            {/* Front Cover */}
            <div className="jacket-panel front-cover">
              <span className="panel-tag">FRONT COVER</span>
              <img src={currentBook.coverImage} alt={currentBook.title} className="front-cover-artwork" />
              <div className="foil-die-overlay" />
            </div>

            {/* Front Flap */}
            <div className="jacket-panel front-flap">
              <span className="panel-tag">FRONT FLAP</span>
              <div className="flap-content">
                <span className="flap-category">{currentBook.categoryLabel}</span>
                <h4 className="flap-book-title">{currentBook.title}</h4>
                <p className="flap-synopsis">{currentBook.description}</p>
                <div className="flap-price-tag">
                  <span>USA $45.00 / EUR €40.00</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* --- 3D INTERACTIVE VOLUMETRIC BOOK SCULPTURE --- */
        <div className="volumetric-book-stage">
          {/* Lighting Flare and Pedestal */}
          <div className="stage-ambient-glow" />
          <div className="pedestal-mirror-reflection" />

          <div className="book-3d-chassis" style={{ transform: transform3D }}>
            {/* FRONT FACE */}
            <div className="book-face face-front">
              <img src={currentBook.coverImage} alt={currentBook.title} className="face-img" />
              <div className="holographic-glint" />
              <div className="emboss-depth-shadow" />
            </div>

            {/* BACK FACE */}
            <div className="book-face face-back">
              <div className="back-face-inner">
                <div className="back-face-quote font-editorial">
                  "{currentBook.tagline || currentBook.description}"
                </div>
                <div className="back-face-barcode">
                  <div className="barcode-bars" />
                  <span className="barcode-digits">ISBN 978-1-947440-02-9</span>
                </div>
              </div>
            </div>

            {/* LEFT SPINE FACE */}
            <div className="book-face face-spine">
              <div className="spine-emboss-track">
                <span className="spine-text-deboss">
                  {currentBook.spineText || `${currentBook.title} — ${currentBook.author} — § 𝐔 𝐊 𝐈 𝐈`}
                </span>
              </div>
            </div>

            {/* RIGHT PAGE BLOCK (Gilded Edge Paper Layers) */}
            <div className="book-face face-right-pages">
              <div className="paper-layers-striation" />
            </div>

            {/* TOP PAGE BLOCK */}
            <div className="book-face face-top-pages">
              <div className="paper-layers-striation" />
            </div>

            {/* BOTTOM PAGE BLOCK */}
            <div className="book-face face-bottom-pages">
              <div className="paper-layers-striation" />
            </div>

            {/* SILK RIBBON BOOKMARK */}
            <div className="silk-ribbon-bookmark">
              <div className="ribbon-tail" />
            </div>
          </div>

          {/* Floating Dynamic Inspect Widget */}
          <div className="studio-floating-inspector">
            <span className="inspector-cat">{currentBook.categoryLabel}</span>
            <h3 className="inspector-title">{currentBook.title}</h3>
            <p className="inspector-author">By {currentBook.author} • {currentBook.year}</p>
            <div className="inspector-specs-row">
              <span>{currentBook.format}</span>
              <span>•</span>
              <span>{currentBook.pages}</span>
            </div>
            <button
              onClick={() => navigate(`/books/${currentBook.id}`)}
              className="btn-atelier btn-primary-atelier btn-sm-atelier mt-3 w-100"
            >
              <span>INSPECT FULL CASE STUDY</span>
              <i className="bi bi-arrow-right" />
            </button>
          </div>
        </div>
      )}

      {/* Quick Edition Carousel Drawer */}
      <div className="studio-bottom-editions">
        <span className="bottom-editions-label">SWITCH ARCHIVE EDITION (01—0{BOOKS_DATA.length}):</span>
        <div className="bottom-editions-track">
          {BOOKS_DATA.map((book, idx) => (
            <button
              key={book.id}
              onClick={() => selectBook(idx)}
              className={`edition-thumb-card ${idx === selectedBookIdx ? 'selected' : ''}`}
            >
              <img src={book.coverImage} alt={book.title} className="thumb-cover-img" />
              <div className="thumb-card-meta">
                <span className="t-idx">0{idx + 1}</span>
                <span className="t-title">{book.title}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
