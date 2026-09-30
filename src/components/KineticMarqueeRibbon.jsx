import React, { useState } from 'react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const TRACK_1_ITEMS = [
  { text: 'TYPOGRAPHIC ARCHITECTURE', tag: 'CANON', highlight: true },
  { text: 'TACTILE MATERIALITY', tag: '320 GSM', highlight: false },
  { text: 'EDITORIAL PURITY', tag: 'ZERO NOISE', highlight: false },
  { text: 'BOUND FOR ETERNITY', tag: 'ARCHIVAL', highlight: true },
  { text: 'HAUTE-COUTURE BOOK DESIGN', tag: 'BESPOKE', highlight: false },
  { text: 'GOLDEN RATIO PROPORTIONS', tag: 'Φ 1.618', highlight: true },
  { text: '0.05MM REGISTRATION PRECISION', tag: 'TOLERANCE', highlight: false },
  { text: 'JAPANESE BUCKRAM BOOKCLOTH', tag: 'OSAKA', highlight: false }
];

const TRACK_2_ITEMS = [
  { text: 'OBJECTS OF PERMANENCE', tag: 'ETERNAL' },
  { text: 'SCANDINAVIAN MILLBOARD', tag: 'DURABILITY' },
  { text: '24K METALLIC FOIL STAMPING', tag: 'MICRO-DEBOSS' },
  { text: 'ARCHIVAL FRENCH COTTON VELLUM', tag: 'RAG 100%' },
  { text: 'SMYTH-SEWN MONOGRAPH SUITE', tag: 'LAY-FLAT' },
  { text: 'CHIAROSCURO NOIR AESTHETICS', tag: 'ATELIER' },
  { text: 'COLLECTOR SLIPCASE EDITIONS', tag: 'LIMITED' }
];

export default function KineticMarqueeRibbon() {
  const [isHovered, setIsHovered] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState(null);
  const { playTactileClick, playFoilChime } = useAudioFeedback();

  return (
    <div
      className={`kinetic-marquee-container ${isHovered ? 'is-paused' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setActiveTooltip(null);
      }}
    >
      {/* Top Ambient Glow Line */}
      <div className="marquee-ambient-line marquee-line-top" />

      {/* --- TRACK 1: SOLID EDITORIAL MONUMENTAL (LEFT TO RIGHT) --- */}
      <div className="kinetic-track-wrapper track-row-primary">
        <div className="kinetic-track track-move-left">
          {[...TRACK_1_ITEMS, ...TRACK_1_ITEMS, ...TRACK_1_ITEMS].map((item, idx) => (
            <div
              key={`t1-${idx}`}
              className={`kinetic-item ${item.highlight ? 'item-highlight' : ''}`}
              onMouseEnter={() => {
                playTactileClick();
                setActiveTooltip(item);
              }}
            >
              <span className="kinetic-glyph">❖</span>
              <span className="kinetic-text">{item.text}</span>
              <span className="kinetic-tag-badge">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* --- TRACK 2: HOLLOW STROKE WIREFRAME (RIGHT TO LEFT) --- */}
      <div className="kinetic-track-wrapper track-row-secondary">
        <div className="kinetic-track track-move-right">
          {[...TRACK_2_ITEMS, ...TRACK_2_ITEMS, ...TRACK_2_ITEMS].map((item, idx) => (
            <div
              key={`t2-${idx}`}
              className="kinetic-item item-outline"
              onMouseEnter={() => {
                playFoilChime();
                setActiveTooltip(item);
              }}
            >
              <span className="kinetic-glyph-cyan">◆</span>
              <span className="kinetic-text-outline">{item.text}</span>
              <span className="kinetic-sub-pill">{item.tag}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Ambient Glow Line */}
      <div className="marquee-ambient-line marquee-line-bottom" />

      {/* Subtle Live Holographic HUD Indicator */}
      <div className="marquee-floating-hud">
        <span className="hud-pulse-radar" />
        <span className="hud-text">
          {activeTooltip ? `INSPECTING: ${activeTooltip.text} // [${activeTooltip.tag}]` : 'LIVE KINETIC ATELIER RIBBON // HOVER TO CALIBRATE VELOCITY'}
        </span>
      </div>
    </div>
  );
}
