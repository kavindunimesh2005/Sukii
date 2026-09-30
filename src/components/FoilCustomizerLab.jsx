import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const CLOTH_COLORS = [
  { id: 'obsidian', name: 'Obsidian Jet Cloth', bg: '#0D0D0D', grain: 'rgba(255,255,255,0.06)' },
  { id: 'charcoal', name: 'Japanese Charcoal Linen', bg: '#181818', grain: 'rgba(255,255,255,0.08)' },
  { id: 'midnight', name: 'Midnight Deep Indigo', bg: '#0A0F1A', grain: 'rgba(255,255,255,0.05)' },
  { id: 'chalk', name: 'Museum Chalk White', bg: '#EAEAEA', textColor: '#111111', grain: 'rgba(0,0,0,0.06)' }
];

const FOIL_TYPES = [
  {
    id: 'silver',
    name: 'Mirror Platinum Foil',
    foilStyle: {
      background: 'linear-gradient(135deg, #E0E0E0 0%, #FFFFFF 40%, #A0A0A0 70%, #FFFFFF 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'drop-shadow(0 2px 4px rgba(255,255,255,0.4))'
    },
    code: 'FOIL-PLAT-900'
  },
  {
    id: 'gold',
    name: '24K Champagne Gold Foil',
    foilStyle: {
      background: 'linear-gradient(135deg, #CFB53B 0%, #FFF3A8 40%, #998020 70%, #FFE070 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'drop-shadow(0 2px 4px rgba(207,181,59,0.5))'
    },
    code: 'FOIL-GOLD-24K'
  },
  {
    id: 'copper',
    name: 'Rose Copper Foil Stamp',
    foilStyle: {
      background: 'linear-gradient(135deg, #D9886D 0%, #FFD1C1 40%, #9C4B33 70%, #FFA88F 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      filter: 'drop-shadow(0 2px 4px rgba(217,136,109,0.5))'
    },
    code: 'FOIL-COPR-840'
  },
  {
    id: 'blind',
    name: 'Blind Impression Deboss',
    foilStyle: {
      color: 'rgba(255,255,255,0.25)',
      textShadow: 'inset 0 2px 4px rgba(0,0,0,0.8), 0 1px 1px rgba(255,255,255,0.15)'
    },
    code: 'BLIND-DIE-001'
  }
];

export default function FoilCustomizerLab() {
  const [bookTitle, setBookTitle] = useState('THE GEOMETRY OF SILENCE');
  const [bookSubtitle, setBookSubtitle] = useState('Essays on Spatial Typographic Void');
  const [authorName, setAuthorName] = useState('ELEANOR VANCE');
  const [selectedCloth, setSelectedCloth] = useState(CLOTH_COLORS[0]);
  const [selectedFoil, setSelectedFoil] = useState(FOIL_TYPES[0]);
  const { playFoilChime, playTactileClick } = useAudioFeedback();

  const handleClothChange = (cloth) => {
    playTactileClick();
    setSelectedCloth(cloth);
  };

  const handleFoilChange = (foil) => {
    playFoilChime();
    setSelectedFoil(foil);
  };

  return (
    <section className="foil-lab-section section-pad">
      <div className="container">
        <div className="section-header-editorial">
          <span className="editorial-meta-tag">INTERACTIVE FOIL SIMULATION LAB</span>
          <h2 className="section-title-editorial">
            LIVE EMBOSSING <span className="font-editorial">Studio</span>
          </h2>
          <p className="lab-intro-text">
            Type your own title below to simulate real-time metallic foil stamping, brass die debossing, and cloth grain texture.
          </p>
        </div>

        <div className="foil-lab-workspace">
          {/* Controls & Inputs Column */}
          <div className="foil-controls-col">
            <div className="foil-input-group">
              <label className="foil-label">BOOK TITLE (UPPERCASE DISPLAY):</label>
              <input
                type="text"
                value={bookTitle}
                onChange={(e) => setBookTitle(e.target.value)}
                placeholder="YOUR BOOK TITLE"
                className="foil-text-input"
                maxLength={45}
              />
            </div>

            <div className="foil-input-group">
              <label className="foil-label">SUBTITLE / MONOGRAPH DESCRIPTOR:</label>
              <input
                type="text"
                value={bookSubtitle}
                onChange={(e) => setBookSubtitle(e.target.value)}
                placeholder="Subtitle or Genre"
                className="foil-text-input"
                maxLength={60}
              />
            </div>

            <div className="foil-input-group">
              <label className="foil-label">AUTHOR / ATELIER IMPRINT:</label>
              <input
                type="text"
                value={authorName}
                onChange={(e) => setAuthorName(e.target.value)}
                placeholder="AUTHOR NAME"
                className="foil-text-input"
                maxLength={35}
              />
            </div>

            {/* Substrate Cloth Picker */}
            <div className="foil-option-block">
              <span className="foil-option-title">01. SELECT BINDING CLOTH SUBSTRATE:</span>
              <div className="cloth-picker-row">
                {CLOTH_COLORS.map((c) => (
                  <button
                    key={c.id}
                    onClick={() => handleClothChange(c)}
                    className={`cloth-btn ${selectedCloth.id === c.id ? 'active' : ''}`}
                    style={{ backgroundColor: c.bg }}
                    title={c.name}
                  >
                    <span className="cloth-active-ring" />
                  </button>
                ))}
              </div>
              <span className="selected-cloth-name">{selectedCloth.name}</span>
            </div>

            {/* Foil Type Picker */}
            <div className="foil-option-block">
              <span className="foil-option-title">02. SELECT FOIL DEBOSSING PIGMENT:</span>
              <div className="foil-type-grid">
                {FOIL_TYPES.map((f) => (
                  <button
                    key={f.id}
                    onClick={() => handleFoilChange(f)}
                    className={`foil-type-pill ${selectedFoil.id === f.id ? 'active' : ''}`}
                  >
                    <span className="f-code">{f.code}</span>
                    <span className="f-name">{f.name}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="foil-action-strip">
              <Link
                to={`/contact?subject=${encodeURIComponent(`Custom Stamped Brief: "${bookTitle}" with ${selectedFoil.name} on ${selectedCloth.name}`)}`}
                className="btn-atelier btn-primary-atelier w-100 text-center"
              >
                <span>COMMISSION THIS BESPOKE SETUP</span>
                <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>

          {/* Real-time 3D Live Stamped Book Preview Stage */}
          <div className="foil-preview-col">
            <div
              className="live-stamped-book-chassis"
              style={{
                backgroundColor: selectedCloth.bg,
                backgroundImage: `radial-gradient(${selectedCloth.grain} 1px, transparent 0)`,
                backgroundSize: '8px 8px'
              }}
            >
              {/* Spine edge line */}
              <div className="stamped-spine-crease" />

              {/* Embossed Typography Zone */}
              <div className="stamped-layout-zone">
                <div className="stamped-header-mark">
                  <span className="stamped-symbol" style={selectedFoil.foilStyle}>§ 𝐔 𝐊 𝐈 𝐈</span>
                  <span className="stamped-edition-mark" style={selectedFoil.foilStyle}>LIMITED ATELIER EDITION</span>
                </div>

                <div className="stamped-title-container">
                  <h2 className="stamped-main-title" style={selectedFoil.foilStyle}>
                    {bookTitle || 'THE UNTITLED MANUSCRIPT'}
                  </h2>
                  {bookSubtitle && (
                    <p className="stamped-sub" style={selectedFoil.foilStyle}>
                      {bookSubtitle}
                    </p>
                  )}
                </div>

                <div className="stamped-author-container">
                  <span className="stamped-by" style={selectedFoil.foilStyle}>BY</span>
                  <h4 className="stamped-author" style={selectedFoil.foilStyle}>
                    {authorName || 'AUTHOR NAME'}
                  </h4>
                  <span className="stamped-colophon-mark" style={selectedFoil.foilStyle}>
                    HAUTE-COUTURE ÉDITION • ZURICH & PARIS • 2026
                  </span>
                </div>
              </div>

              {/* Dynamic Metallic Foil Light Sheen Glint */}
              <div className="stamped-light-glint" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
