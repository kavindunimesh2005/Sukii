import React, { useState } from 'react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const LAYERS = [
  {
    id: 'jacket',
    name: '01. FRENCH FLAP DUST JACKET',
    spec: '200 GSM Tintoretto Gesso with Spot Holographic Foil & Soft-Touch Velvet Lamination',
    depth: 180,
    color: 'rgba(255, 255, 255, 0.12)',
    img: '/assets/books/architecture-of-silence.jpg'
  },
  {
    id: 'board',
    name: '02. 3.5MM SCANDINAVIAN MILLBOARD',
    spec: 'High-density unyielding greyboard wrapped in charcoal Japanese buckram bookcloth',
    depth: 120,
    color: 'rgba(30, 30, 30, 0.9)',
    img: '/assets/images/book-binding-craft.jpg'
  },
  {
    id: 'endpapers',
    name: '03. MARBLED ENDPAPERS (GARDE-FEUILLE)',
    spec: '160 GSM hand-marbled archival paper protecting the front & back hinge joints',
    depth: 60,
    color: 'rgba(50, 50, 50, 0.85)',
    img: '/assets/images/editorial-spread-1.jpg'
  },
  {
    id: 'block',
    name: '04. SMYTH-SEWN BOOK BLOCK',
    spec: '384 pages of 140 GSM Munken Pure, sewn with unbleached linen thread in 16-page signatures',
    depth: 0,
    color: 'rgba(230, 226, 220, 0.95)',
    img: '/assets/images/editorial-spread-2.jpg'
  },
  {
    id: 'spine',
    name: '05. CRASH MESH & SILK HEADBAND',
    spec: 'Reinforced mull muslin mesh with hand-woven dual-tone silk head/tail bands for longevity',
    depth: -60,
    color: 'rgba(20, 20, 20, 0.9)',
    img: '/assets/images/book-binding-craft.jpg'
  }
];

export default function ExplodedBookAnatomy() {
  const [isExploded, setIsExploded] = useState(true);
  const [activeLayer, setActiveLayer] = useState(LAYERS[0]);
  const [tilt, setTilt] = useState({ x: -14, y: 25 });
  const { playFoilChime, playTactileClick } = useAudioFeedback();

  const toggleExplode = () => {
    playFoilChime();
    setIsExploded((prev) => !prev);
  };

  const handleLayerClick = (layer) => {
    playTactileClick();
    setActiveLayer(layer);
  };

  return (
    <section className="exploded-anatomy-section section-pad">
      <div className="container">
        <div className="section-header-editorial">
          <span className="editorial-meta-tag">STRUCTURAL VOLUMETRICS // 3D DISSECTION</span>
          <h2 className="section-title-editorial">
            EXPLODED <span className="font-editorial">Book Anatomy</span>
          </h2>
          <p className="lab-intro-text">
            Dissect the physical anatomy of a museum-grade volume. Click to separate jacket, millboard, endpapers, and thread-sewn signatures in 3D space.
          </p>
        </div>

        <div className="exploded-stage-container">
          {/* Top Control HUD */}
          <div className="exploded-hud-bar">
            <div className="exploded-status-tag">
              <span className="hud-pulse" />
              <span>SPATIAL MULTI-LAYER DISSECTION</span>
            </div>

            <button
              onClick={toggleExplode}
              className={`btn-atelier btn-sm-atelier ${isExploded ? 'btn-primary-atelier' : 'btn-outline-atelier'}`}
            >
              <i className={isExploded ? 'bi bi-fullscreen-exit' : 'bi bi-arrows-fullscreen'} />
              <span>{isExploded ? 'COLLAPSE VOLUME' : 'EXPLODE 3D LAYERS'}</span>
            </button>
          </div>

          <div className="exploded-viewport-grid">
            {/* 3D Exploded Interactive Stage */}
            <div className="exploded-3d-stage">
              <div
                className="exploded-chassis"
                style={{
                  transform: `perspective(1600px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
                }}
              >
                {LAYERS.map((layer, idx) => {
                  const zTranslate = isExploded ? layer.depth * 1.5 : idx * 6;
                  const isSelected = activeLayer.id === layer.id;

                  return (
                    <div
                      key={layer.id}
                      onClick={() => handleLayerClick(layer)}
                      className={`exploded-plane ${isSelected ? 'selected' : ''}`}
                      style={{
                        transform: `translateZ(${zTranslate}px)`,
                        zIndex: 10 - idx
                      }}
                    >
                      <img src={layer.img} alt={layer.name} className="plane-artwork" />
                      <div className="plane-edge-highlight" />
                      <div className="plane-index-tag">
                        <span>0{idx + 1}</span>
                      </div>
                      {isExploded && (
                        <div className="plane-connector-line">
                          <span className="connector-dot" />
                          <span className="connector-label">{layer.name.split('.')[1]}</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Stage Shadow Reflection */}
              <div className="exploded-stage-shadow" />
            </div>

            {/* Right Technical Specification Sidebar */}
            <div className="exploded-spec-sidebar">
              <div className="spec-layer-card">
                <div className="spec-card-top-tag">
                  <span>LAYER SPECIFICATION</span>
                  <span className="spec-status-code">ISO-9706 ARCHIVAL</span>
                </div>

                <h3 className="active-layer-title">{activeLayer.name}</h3>
                <p className="active-layer-desc">{activeLayer.spec}</p>

                <div className="layer-metrics-grid">
                  <div className="layer-m-item">
                    <span className="m-k">THICKNESS / BULK:</span>
                    <span className="m-v">Calibrated to 0.05mm</span>
                  </div>
                  <div className="layer-m-item">
                    <span className="m-k">ADHESIVE TYPE:</span>
                    <span className="m-v">pH Neutral EVA Polymer</span>
                  </div>
                  <div className="layer-m-item">
                    <span className="m-k">DURABILITY:</span>
                    <span className="m-v">200+ Year Shelf Life</span>
                  </div>
                  <div className="layer-m-item">
                    <span className="m-k">ORIGIN:</span>
                    <span className="m-v">Fabriano / Arjowiggins</span>
                  </div>
                </div>

                {/* Layer Selector List */}
                <div className="layer-selector-list">
                  <span className="sel-title">QUICK INSPECT LAYER:</span>
                  {LAYERS.map((l, idx) => (
                    <button
                      key={l.id}
                      onClick={() => handleLayerClick(l)}
                      className={`layer-btn-row ${activeLayer.id === l.id ? 'active' : ''}`}
                    >
                      <span className="l-num">0{idx + 1}</span>
                      <span className="l-name">{l.name}</span>
                      <i className="bi bi-chevron-right" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
