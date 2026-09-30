import React, { useState } from 'react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

export default function TypographicAnatomyPlayground() {
  const [tracking, setTracking] = useState(0.24);
  const [leading, setLeading] = useState(1.1);
  const [goldenRatio, setGoldenRatio] = useState(1.618);
  const [gridOverlay, setGridOverlay] = useState(true);
  const { playTactileClick } = useAudioFeedback();

  return (
    <section className="typo-playground-section section-pad">
      <div className="container">
        <div className="section-header-editorial">
          <span className="editorial-meta-tag">SWISS EDITORIAL ARCHITECTURE</span>
          <h2 className="section-title-editorial">
            TYPOGRAPHIC <span className="font-editorial">Caliper Lab</span>
          </h2>
          <p className="lab-intro-text">
            Precision micro-typographic calibration. Adjust letter tracking, leading rhythms, and Fibonacci golden proportions in real time.
          </p>
        </div>

        <div className="typo-lab-grid">
          {/* Left Caliper Slider Controls */}
          <div className="typo-controls-col">
            <div className="caliper-slider-box">
              <div className="slider-header">
                <span className="slider-label">01. TRACKING / LETTER-SPACING:</span>
                <span className="slider-val">{(tracking * 100).toFixed(0)}% EM</span>
              </div>
              <input
                type="range"
                min="0.02"
                max="0.6"
                step="0.02"
                value={tracking}
                onChange={(e) => {
                  playTactileClick();
                  setTracking(parseFloat(e.target.value));
                }}
                className="caliper-range-input"
              />
            </div>

            <div className="caliper-slider-box">
              <div className="slider-header">
                <span className="slider-label">02. LEADING / LINE HEIGHT RHYTHM:</span>
                <span className="slider-val">{leading.toFixed(2)}×</span>
              </div>
              <input
                type="range"
                min="0.85"
                max="1.75"
                step="0.05"
                value={leading}
                onChange={(e) => {
                  playTactileClick();
                  setLeading(parseFloat(e.target.value));
                }}
                className="caliper-range-input"
              />
            </div>

            <div className="caliper-slider-box">
              <div className="slider-header">
                <span className="slider-label">03. GOLDEN RATIO PROPORTION ($\Phi$):</span>
                <span className="slider-val">{goldenRatio.toFixed(3)}</span>
              </div>
              <input
                type="range"
                min="1.2"
                max="2.0"
                step="0.02"
                value={goldenRatio}
                onChange={(e) => {
                  playTactileClick();
                  setGoldenRatio(parseFloat(e.target.value));
                }}
                className="caliper-range-input"
              />
            </div>

            <div className="grid-toggle-row">
              <button
                onClick={() => setGridOverlay(!gridOverlay)}
                className={`btn-atelier btn-sm-atelier ${gridOverlay ? 'btn-primary-atelier' : 'btn-outline-atelier'}`}
              >
                <i className="bi bi-grid-3x3" />
                <span>{gridOverlay ? 'HIDE BASELINE GRID' : 'SHOW BASELINE GRID'}</span>
              </button>
            </div>
          </div>

          {/* Right Live Calibrated Specimen Poster */}
          <div className="typo-specimen-col">
            <div className={`specimen-poster-frame ${gridOverlay ? 'has-grid' : ''}`}>
              {gridOverlay && <div className="baseline-grid-lines" />}

              <div className="specimen-header-meta">
                <span className="spec-typeface">TYPEFACE: VEGAWANTY & NEUE HAAS</span>
                <span className="spec-optics">OPTICAL KERNING: ACTIVE</span>
              </div>

              <div className="specimen-main-zone">
                <h1
                  className="specimen-display-title"
                  style={{
                    letterSpacing: `${tracking}em`,
                    lineHeight: leading
                  }}
                >
                  ARCHITECTING <br />
                  <span className="font-editorial" style={{ fontStyle: 'italic' }}>Silent</span> <br />
                  PROPORTIONS
                </h1>

                <p
                  className="specimen-body-lead"
                  style={{
                    lineHeight: leading * 1.5,
                    fontSize: `${1 / goldenRatio + 0.4}rem`
                  }}
                >
                  Every letterform chiseled onto a book jacket commands physical gravity. By calibrating negative space to the golden ratio ($\Phi = 1.618$), typography ceases to be mere information and transforms into spatial architecture.
                </p>
              </div>

              <div className="specimen-footer-calipers">
                <span>MARGIN BASE: 28MM</span>
                <span>KERNING: PAIR-ADJUSTED</span>
                <span>STEM WEIGHT: 1.2PT</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
