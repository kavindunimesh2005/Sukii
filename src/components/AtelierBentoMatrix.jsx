import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

export default function AtelierBentoMatrix() {
  const [activeTab, setActiveTab] = useState('paper');
  const { playTactileClick, playFoilChime } = useAudioFeedback();

  return (
    <section className="bento-matrix-section section-pad">
      <div className="container">
        <div className="section-header-editorial">
          <span className="editorial-meta-tag">ATELIER ARCHITECTURE // 2026 BENTO MATRIX</span>
          <h2 className="section-title-editorial">
            THE CRAFT <span className="font-editorial">Ecosystem</span>
          </h2>
          <p className="lab-intro-text">
            A multi-dimensional look into our production benchmarks, material repositories, and commission availability.
          </p>
        </div>

        {/* 2026 Bento Grid */}
        <div className="modern-bento-grid">
          {/* Bento Item 1: Large Featured Substrate Vault (Span 2 Cols) */}
          <div className="bento-card bento-span-2 bento-card-vault">
            <div className="bento-card-header">
              <span className="bento-tag">SUBSTRATE REPOSITORY</span>
              <span className="bento-chip">48 ARCHIVAL STOCKS</span>
            </div>

            <div className="bento-vault-content">
              <h3 className="bento-vault-title">Tactile Materiality & French Cotton Stocks</h3>
              <p className="bento-vault-desc">
                We reject mass-market paper. Every book block is specified with FSC-certified mouldmade cottons,
                acid-free vellums, and Japanese linen bookcloths calibrated to absorb ambient light.
              </p>

              <div className="bento-tabs-row">
                <button
                  onClick={() => {
                    playTactileClick();
                    setActiveTab('paper');
                  }}
                  className={`bento-tab-pill ${activeTab === 'paper' ? 'active' : ''}`}
                >
                  01. Munken Pure 140GSM
                </button>
                <button
                  onClick={() => {
                    playTactileClick();
                    setActiveTab('linen');
                  }}
                  className={`bento-tab-pill ${activeTab === 'linen' ? 'active' : ''}`}
                >
                  02. Charcoal Buckram
                </button>
                <button
                  onClick={() => {
                    playFoilChime();
                    setActiveTab('foil');
                  }}
                  className={`bento-tab-pill ${activeTab === 'foil' ? 'active' : ''}`}
                >
                  03. 24K Hot Stamped Foil
                </button>
              </div>

              <div className="bento-tab-preview-box">
                {activeTab === 'paper' && (
                  <div className="tab-spec-details">
                    <span className="spec-lead">Munken Pure Uncoated High-Bulk Stock</span>
                    <span className="spec-sub">Origin: Arctic Paper Munkedals • 1.3 Volume Bulk • ISO 9706 Permanent</span>
                  </div>
                )}
                {activeTab === 'linen' && (
                  <div className="tab-spec-details">
                    <span className="spec-lead">Natural Slub Japanese Buckram Bookcloth</span>
                    <span className="spec-sub">Origin: Osaka Atelier • Acrylic Impregnated Weave • Crack-Resistant Hinge</span>
                  </div>
                )}
                {activeTab === 'foil' && (
                  <div className="tab-spec-details">
                    <span className="spec-lead">Curz Precision Metallic Mirror Foil Die</span>
                    <span className="spec-sub">Micro-Debossed at 140°C • Zero Flake Precision • 0.4mm Brass CNC Die</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bento Item 2: Live Commission Slate Counter */}
          <div className="bento-card bento-card-slate">
            <div className="bento-card-header">
              <span className="bento-tag">COMMISSION STATUS</span>
              <span className="bento-pulse-dot" />
            </div>

            <div className="slate-content">
              <div className="slate-num-display">
                <span className="slate-big-num">04</span>
                <span className="slate-total">/ 12</span>
              </div>
              <h4 className="slate-title">Commissions Remaining for 2026 Slate</h4>
              <p className="slate-desc">
                We accept strictly 12 author and publisher commissions per calendar year to ensure unhurried dedication.
              </p>

              <Link to="/contact" className="btn-atelier btn-primary-atelier btn-sm-atelier w-100 mt-3 text-center">
                <span>RESERVE COMMISSION</span>
                <i className="bi bi-arrow-right" />
              </Link>
            </div>
          </div>

          {/* Bento Item 3: Typographic Kerning & Golden Ratio */}
          <div className="bento-card bento-card-typo">
            <div className="bento-card-header">
              <span className="bento-tag">GOLDEN PROPORTIONS</span>
              <span className="bento-chip">$\Phi = 1.618$</span>
            </div>

            <div className="typo-bento-content">
              <h4 className="typo-bento-title">Mathematical Editorial Geometry</h4>
              <p className="typo-bento-desc">
                Page margins, column widths, and line-height rhythms calibrated against the Fibonacci sequence for effortless optical reading rhythm.
              </p>

              <div className="golden-ratio-visual-box">
                <div className="spiral-curve-graphic" />
                <span className="ratio-label">CANON DE DIVISION HARMONIQUE</span>
              </div>
            </div>
          </div>

          {/* Bento Item 4: Certified Print Benchmarks (Span 2 Cols) */}
          <div className="bento-card bento-span-2 bento-card-metrics">
            <div className="bento-card-header">
              <span className="bento-tag">INDUSTRIAL STANDARDS</span>
              <span className="bento-chip">ISO-12647-2</span>
            </div>

            <div className="metrics-bento-grid">
              <div className="m-metric-box">
                <span className="m-num">48+</span>
                <span className="m-title">COLLECTOR EDITIONS BOUND</span>
                <span className="m-sub">Hardcovers & Slipcases</span>
              </div>
              <div className="m-metric-box">
                <span className="m-num">100%</span>
                <span className="m-title">BESPOKE LETTERFORMS</span>
                <span className="m-sub">Zero stock typography</span>
              </div>
              <div className="m-metric-box">
                <span className="m-num">0.05MM</span>
                <span className="m-title">SPINE REGISTRATION TOLERANCE</span>
                <span className="m-sub">Industrial perfection</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
