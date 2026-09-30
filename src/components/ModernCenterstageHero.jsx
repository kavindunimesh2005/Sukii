import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import BlueprintOverlay from './BlueprintOverlay';
import { BOOKS_DATA } from '../data/books';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const LIGHTING_MODES = [
  {
    id: 'diffuse',
    name: 'STUDIO DIFFUSE',
    glare: 'radial-gradient(circle at center, rgba(255,255,255,0.45) 0%, rgba(255,255,255,0) 65%)',
    backdropGlow: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.08) 0%, rgba(0, 229, 255, 0.03) 40%, transparent 70%)',
    shadow: 'rgba(0, 0, 0, 0.95)'
  },
  {
    id: 'chiaroscuro',
    name: 'CHIAROSCURO NOIR',
    glare: 'linear-gradient(135deg, rgba(255,255,255,0.7) 0%, rgba(0,0,0,0.8) 50%, rgba(255,255,255,0.2) 100%)',
    backdropGlow: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 0.4) 0%, transparent 70%)',
    shadow: 'rgba(0, 0, 0, 0.98)'
  },
  {
    id: 'gold',
    name: '24K GOLDEN HOUR',
    glare: 'radial-gradient(circle at center, rgba(255,220,120,0.6) 0%, rgba(207,181,59,0.2) 40%, transparent 70%)',
    backdropGlow: 'radial-gradient(ellipse at center, rgba(207, 181, 59, 0.15) 0%, transparent 70%)',
    shadow: 'rgba(50, 40, 10, 0.9)'
  },
  {
    id: 'cyan',
    name: 'HOLOGRAPHIC CYAN',
    glare: 'radial-gradient(circle at center, rgba(0,229,255,0.6) 0%, rgba(0,136,163,0.2) 40%, transparent 70%)',
    backdropGlow: 'radial-gradient(ellipse at center, rgba(0, 229, 255, 0.18) 0%, transparent 70%)',
    shadow: 'rgba(0, 30, 40, 0.9)'
  }
];

export default function ModernCenterstageHero() {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [activeLightMode, setActiveLightMode] = useState(LIGHTING_MODES[0]);
  const [isRotating, setIsRotating] = useState(false);
  const [tiltStyle, setTiltStyle] = useState({});
  const [glintPos, setGlintPos] = useState({ x: 35, y: 35 });
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

    const rotateX = ((y - centerY) / centerY) * -16;
    const rotateY = ((x - centerX) / centerX) * 22;

    const glintX = (x / rect.width) * 100;
    const glintY = (y / rect.height) * 100;

    setGlintPos({ x: glintX, y: glintY });
    setTiltStyle({
      transform: `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`,
      transition: 'transform 0.08s ease-out'
    });
  };

  const handleMouseLeave = () => {
    setTiltStyle({
      transform: 'perspective(1400px) rotateX(-6deg) rotateY(12deg) scale3d(1, 1, 1)',
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

  const handleLightingChange = (light) => {
    playFoilChime();
    setActiveLightMode(light);
  };

  return (
    <section className="modern-hero-stage-section">
      {/* Dynamic Background Noise & Ambient Glow */}
      <div className="modern-hero-mesh-bg" />
      <div className="modern-hero-glow-core" style={{ background: activeLightMode.backdropGlow }} />

      <div className="container modern-hero-container">
        {/* Top Header Badge */}
        <div className="modern-hero-badge-row">
          <div className="modern-hero-status-pill">
            <span className="live-pulse-dot" />
            <span className="status-pill-text">ATELIER § 𝐔 𝐊 𝐈 𝐈 • HAUTE-COUTURE ÉDITION 2026</span>
          </div>
        </div>

        {/* Monumental Liquid Heading */}
        <div className="modern-hero-headline-wrap">
          <h1 className="modern-hero-main-title">
            <span className="hero-text-row-1">DESIGNING STORIES</span>
            <span className="hero-text-row-2">
              BEYOND THE <span className="hero-serif-accent">Physical Page.</span>
            </span>
          </h1>

          <p className="modern-hero-lead-text">
            Museum-grade book jackets, custom chiseled typography, and tactile editorial architecture
            conceived for visionary authors, monographs, and cultural publishing houses worldwide.
          </p>

          <div className="modern-hero-actions-island">
            <Link to="/books" className="btn-modern-primary">
              <span>EXPLORE ALL EDITIONS ({BOOKS_DATA.length})</span>
              <i className="bi bi-arrow-right" />
            </Link>
            <Link to="/contact" className="btn-modern-glass">
              <span>COMMISSION ATELIER</span>
            </Link>
          </div>
        </div>

        {/* Centerstage 3D Volumetric Book Showcase with Floating Chips */}
        <div className="modern-hero-3d-centerstage">
          {/* Left Floating Feature Chips */}
          <div className="floating-chips-col left-chips">
            <div className="spatial-feature-chip">
              <span className="chip-icon">✦</span>
              <div className="chip-meta">
                <span className="c-label">SUBSTRATE</span>
                <span className="c-val">100% Rag Cotton</span>
              </div>
            </div>
            <div className="spatial-feature-chip">
              <span className="chip-icon">✦</span>
              <div className="chip-meta">
                <span className="c-label">FOIL PIGMENT</span>
                <span className="c-val">24K Mirror Gold</span>
              </div>
            </div>
          </div>

          {/* Center 3D Book on Obsidian Pedestal */}
          <div
            ref={containerRef}
            className={`modern-book-3d-pedestal ${isRotating ? 'rotating' : ''}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            <BlueprintOverlay>
              <div
                className="book-3d-box-modern"
                style={tiltStyle}
                onClick={() => {
                  playTactileClick();
                  navigate(`/books/${activeBook.id}`);
                }}
                title={`Click to inspect case study: ${activeBook.title}`}
              >
                {/* 3D Spine */}
                <div className="book-spine-3d-layer">
                  <span className="spine-title-engraved">{activeBook.spineText || activeBook.title}</span>
                </div>

                {/* 3D Front Cover */}
                <div className="book-front-3d-layer">
                  <img
                    src={activeBook.coverImage}
                    alt={activeBook.title}
                    className="book-cover-hd-img"
                  />
                  {/* Dynamic Directional Foil Glint with Active Lighting Rig */}
                  <div
                    className="book-foil-glint-interactive"
                    style={{
                      background: activeLightMode.glare
                    }}
                  />
                  <div className="book-spine-crease-gradient" />
                </div>

                {/* Pedestal Mirror Floor Shadow */}
                <div
                  className="book-pedestal-mirror-shadow"
                  style={{
                    background: `radial-gradient(ellipse at center, ${activeLightMode.shadow} 0%, transparent 70%)`
                  }}
                />
              </div>
            </BlueprintOverlay>
          </div>

          {/* Right Floating Feature Chips */}
          <div className="floating-chips-col right-chips">
            <div className="spatial-feature-chip">
              <span className="chip-icon">✦</span>
              <div className="chip-meta">
                <span className="c-label">BINDING CRAFT</span>
                <span className="c-val">Smyth Sewn Layflat</span>
              </div>
            </div>
            <div className="spatial-feature-chip">
              <span className="chip-icon">✦</span>
              <div className="chip-meta">
                <span className="c-label">CERTIFICATION</span>
                <span className="c-val">ISO-9706 Archival</span>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Studio 3D Light Rig Controller Bar */}
        <div className="studio-light-rig-bar">
          <span className="rig-label">3D LIGHTING RIG:</span>
          <div className="rig-pills">
            {LIGHTING_MODES.map((lm) => (
              <button
                key={lm.id}
                onClick={() => handleLightingChange(lm)}
                className={`rig-btn ${activeLightMode.id === lm.id ? 'active' : ''}`}
              >
                {lm.name}
              </button>
            ))}
          </div>
        </div>

        {/* Floating Interactive Edition Selector Dock */}
        <div className="modern-edition-dock">
          <div className="dock-header">
            <span className="dock-title">FEATURED ARCHIVE SLATE:</span>
            <span className="dock-counter">EDITION 0{selectedIdx + 1} OF 0{heroBooks.length}</span>
          </div>

          <div className="dock-items-row">
            {heroBooks.map((b, idx) => (
              <button
                key={b.id}
                onClick={() => handleSelectBook(idx)}
                className={`dock-edition-item ${idx === selectedIdx ? 'active' : ''}`}
              >
                <img src={b.coverImage} alt={b.title} className="dock-cover-thumb" />
                <div className="dock-item-text">
                  <span className="dock-idx">0{idx + 1}</span>
                  <span className="dock-name">{b.title}</span>
                </div>
                {idx === selectedIdx && <span className="dock-active-glow" />}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Minimalist Technical Ticker Strip */}
      <div className="modern-hero-footer-strip">
        <div className="container footer-strip-inner">
          <div className="f-stat-item">
            <span className="f-k">PRESS CALIBRATION:</span>
            <span className="f-v">ISO-12647-2 / GRACoL 2026</span>
          </div>
          <div className="f-divider" />
          <div className="f-stat-item">
            <span className="f-k">BINDING METHODOLOGY:</span>
            <span className="f-v">Ota-Bound & Smyth Sewn</span>
          </div>
          <div className="f-divider" />
          <div className="f-stat-item">
            <span className="f-k">COMMISSION SLATE:</span>
            <span className="f-v">2026 SLATE OPEN</span>
          </div>
        </div>
      </div>
    </section>
  );
}
