import React, { useState } from 'react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const SPREADS = [
  {
    spreadNum: '01 / 03',
    title: 'Architectural Monograph Grid',
    leftPage: {
      type: 'image',
      src: '/assets/images/editorial-spread-1.jpg',
      caption: 'Plate 14 — Light incidence on brutalist concrete cast'
    },
    rightPage: {
      type: 'text',
      chapter: 'CHAPTER 01',
      heading: 'The Geometry of Stillness',
      body: 'In architectural publishing, the white margin does not represent emptiness; it represents the atmospheric air in which typographic structures breathe. We construct grids derived from Le Corbusier’s Modular and Renaissance proportions, allowing negative space to amplify physical materiality.',
      specColophon: [
        { label: 'Typeface', val: 'Vegawanty Display 72pt / Neue Haas Grotesk' },
        { label: 'Grid System', val: '12-Column Asymmetric Swiss Module' },
        { label: 'Stock Weight', val: '150 GSM Arctic Volume High-White' }
      ]
    }
  },
  {
    spreadNum: '02 / 03',
    title: 'Celestial Typographic Poetry',
    leftPage: {
      type: 'text',
      chapter: 'CANTO IV',
      heading: 'Nocturne & The Void',
      body: 'Night dissolves the horizon into an undifferentiated plane of pure black. Words chiseled into silver foil capture stray photons, acting as celestial navigation beacons on the bound page.',
      specColophon: [
        { label: 'Treatment', val: 'Hot Stamped Mirror Foil #900' },
        { label: 'Binding', val: 'Ota-Bound Layflat Flex-Hinge' },
        { label: 'Stock Weight', val: '180 GSM Pop’Set Ultra Black' }
      ]
    },
    rightPage: {
      type: 'image',
      src: '/assets/images/editorial-spread-2.jpg',
      caption: 'Plate 28 — Double-page bleed with silver foil deboss'
    }
  },
  {
    spreadNum: '03 / 03',
    title: 'Archival Binding Craft & Colophon',
    leftPage: {
      type: 'image',
      src: '/assets/images/book-binding-craft.jpg',
      caption: 'Plate 33 — Japanese thread stitching with exposed spine mesh'
    },
    rightPage: {
      type: 'text',
      chapter: 'ATELIER ESSENTIALS',
      heading: 'Physical Materiality',
      body: 'True luxury lives in the tactile resistance of cloth against skin, the faint scent of linseed ink, and the weight of archival board resting upon a mahogany desk.',
      specColophon: [
        { label: 'Spine Structure', val: 'Open Raw Smyth Sewn Spine' },
        { label: 'Thread Gauge', val: 'Heavyweight Waxed Linen Cord' },
        { label: 'Edition Run', val: '300 Hand-Numbered Copies' }
      ]
    }
  }
];

export default function VirtualBookReader() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipping, setIsFlipping] = useState(false);
  const [zoomOpen, setZoomOpen] = useState(false);
  const { playTactileClick, playFoilChime } = useAudioFeedback();

  const currentSpread = SPREADS[currentIndex];

  const handleNext = () => {
    if (isFlipping) return;
    playTactileClick();
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev < SPREADS.length - 1 ? prev + 1 : 0));
      setIsFlipping(false);
    }, 250);
  };

  const handlePrev = () => {
    if (isFlipping) return;
    playTactileClick();
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex((prev) => (prev > 0 ? prev - 1 : SPREADS.length - 1));
      setIsFlipping(false);
    }, 250);
  };

  const handleSelectSpread = (idx) => {
    if (idx === currentIndex || isFlipping) return;
    playTactileClick();
    setIsFlipping(true);
    setTimeout(() => {
      setCurrentIndex(idx);
      setIsFlipping(false);
    }, 250);
  };

  const renderTextPage = (pageData, folioNum) => (
    <div className="page-text-content">
      <div>
        <span className="page-chapter-label">{pageData.chapter}</span>
        <h3 className="page-heading-serif">{pageData.heading}</h3>
        <p className="page-body-prose">{pageData.body}</p>
      </div>

      <div>
        <div className="page-colophon-box">
          <span className="colophon-title">PRODUCTION COLOPHON</span>
          <div className="colophon-specs-list">
            {pageData.specColophon.map((spec, i) => (
              <div key={i} className="colophon-spec-row">
                <span className="c-label">{spec.label}:</span>
                <span className="c-val">{spec.val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="page-footer-folio">
          <span className="page-folio-num">§ 0{folioNum}</span>
          <span className="folio-brand">§ 𝐔 𝐊 𝐈 𝐈 ATELIER</span>
        </div>
      </div>
    </div>
  );

  const renderImagePage = (pageData) => (
    <div className="page-media-box" onClick={() => {
      playFoilChime();
      setZoomOpen(true);
    }}>
      <img src={pageData.src} alt="Spread Plate" className="page-spread-img" />
      <div className="page-caption-strip">
        <span>{pageData.caption}</span>
        <span className="caption-zoom-hint">
          <i className="bi bi-arrows-fullscreen" /> CLICK TO EXPAND
        </span>
      </div>
    </div>
  );

  return (
    <div className="virtual-book-experience">
      {/* Top Navigation Bar */}
      <div className="book-reader-top-bar">
        <div className="reader-badge">
          <span className="reader-live-dot" />
          <span>VIRTUAL 3D SPREAD INSPECTOR</span>
        </div>
        <div className="reader-spread-counter">
          <span>{currentSpread.spreadNum}</span>
          <span className="spread-name-tag">— {currentSpread.title}</span>
        </div>
        <div className="reader-nav-arrows">
          <button onClick={handlePrev} className="reader-arrow-btn" aria-label="Previous Spread">
            <i className="bi bi-chevron-left" />
          </button>
          <button onClick={handleNext} className="reader-arrow-btn" aria-label="Next Spread">
            <i className="bi bi-chevron-right" />
          </button>
        </div>
      </div>

      {/* 3D Open Book Spread Physical Container */}
      <div className={`open-book-3d-stage ${isFlipping ? 'flipping' : ''}`}>
        <div className="open-book-spine-gutter" />

        {/* Left Page */}
        <div className="open-book-page page-left">
          {currentSpread.leftPage.type === 'image'
            ? renderImagePage(currentSpread.leftPage)
            : renderTextPage(currentSpread.leftPage, currentIndex * 2 + 14)}
        </div>

        {/* Right Page */}
        <div className="open-book-page page-right">
          {currentSpread.rightPage.type === 'image'
            ? renderImagePage(currentSpread.rightPage)
            : renderTextPage(currentSpread.rightPage, currentIndex * 2 + 15)}
        </div>
      </div>

      {/* Quick Jump Thumbnail Selector */}
      <div className="reader-thumbnail-strip">
        {SPREADS.map((sp, idx) => (
          <button
            key={idx}
            onClick={() => handleSelectSpread(idx)}
            className={`spread-thumb-btn ${idx === currentIndex ? 'active' : ''}`}
          >
            <div className="thumb-top-row">
              <span className="thumb-idx">SPREAD 0{idx + 1}</span>
              <span className="thumb-status-dot" />
            </div>
            <span className="thumb-title">{sp.title}</span>
          </button>
        ))}
      </div>

      {/* Zoom Modal */}
      {zoomOpen && (
        <div className="spread-zoom-modal" onClick={() => setZoomOpen(false)}>
          <div className="zoom-content-box" onClick={(e) => e.stopPropagation()}>
            <button className="zoom-close-btn" onClick={() => setZoomOpen(false)} aria-label="Close Zoom">
              <i className="bi bi-x-lg" />
            </button>
            <img
              src={
                currentSpread.leftPage.type === 'image'
                  ? currentSpread.leftPage.src
                  : currentSpread.rightPage.src
              }
              alt="Zoom Spread"
              className="zoom-large-img"
            />
          </div>
        </div>
      )}
    </div>
  );
}
