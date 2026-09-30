import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const VIEWS = {
  front: {
    src: '/assets/books/architecture-of-silence.jpg',
    title: 'Hardbound Blind Debossed Case',
    desc: 'Quarter-bound archival charcoal cloth with deep precision blind debossed titling on 3.5mm eska board.',
    substrate: 'Munken Pure 150 GSM',
    foil: 'Matte Silver Kurz Hot Stamping',
    spine: 'Flat Back Layflat Section'
  },
  spread: {
    src: '/assets/images/editorial-spread-1.jpg',
    title: 'Architectural Monograph Spreads',
    desc: 'Pure 12-column Swiss grid architecture with calibrated whitespace and asymmetric folio rhythms.',
    substrate: 'Fedrigoni Arena Natural 120 GSM',
    foil: 'CMYK + Custom Spot Metallic Black',
    spine: 'Sewn Sections with White Endpapers'
  },
  craft: {
    src: '/assets/images/book-binding-craft.jpg',
    title: 'Archival Thread Stitching & Raw Edge',
    desc: 'Section-sewn binding with exposed spine threads allowing the volume to lay completely flat at 180 degrees.',
    substrate: '100% Cotton Unbleached Thread',
    foil: 'Hand-Gilded Charcoal Edging',
    spine: 'Reinforced Open Spine Gauze'
  },
  back: {
    src: '/assets/images/editorial-spread-2.jpg',
    title: 'Bilingual Folio & Colophon',
    desc: 'Translucent vellum overlays and micro-typeset colophon specifications.',
    substrate: 'Curious Collection Translucent Vellum',
    foil: 'Precision Blind Letterpress Impression',
    spine: 'French Flap Dust Jacket'
  }
};

export default function InspectionLounge() {
  const [activeKey, setActiveKey] = useState('front');
  const currentView = VIEWS[activeKey];

  return (
    <div className="inspection-stage-card">
      <div className="row g-4 align-items-center">
        <div className="col-lg-7">
          <div className="inspection-nav-pills">
            <button
              className={`inspection-pill-btn ${activeKey === 'front' ? 'active' : ''}`}
              onClick={() => setActiveKey('front')}
            >
              01. Hardbound Case
            </button>
            <button
              className={`inspection-pill-btn ${activeKey === 'spread' ? 'active' : ''}`}
              onClick={() => setActiveKey('spread')}
            >
              02. Interior Spread
            </button>
            <button
              className={`inspection-pill-btn ${activeKey === 'craft' ? 'active' : ''}`}
              onClick={() => setActiveKey('craft')}
            >
              03. Thread Binding
            </button>
            <button
              className={`inspection-pill-btn ${activeKey === 'back' ? 'active' : ''}`}
              onClick={() => setActiveKey('back')}
            >
              04. Bilingual Folio
            </button>
          </div>

          <div className="inspection-view-canvas">
            <img
              src={currentView.src}
              alt={currentView.title}
              className="inspection-main-media"
            />
          </div>
        </div>

        <div className="col-lg-5">
          <div className="ps-lg-3">
            <span className="text-meta d-block mb-2">Detailed Craft Analysis</span>
            <h3 className="display-6 font-display mb-3">{currentView.title}</h3>
            <p className="text-secondary mb-4" style={{ lineHeight: '1.85' }}>
              {currentView.desc}
            </p>

            <div className="p-3 bg-secondary border border-subtle mb-4">
              <div className="d-flex justify-content-between mb-2">
                <span className="text-meta">Paper Substrate</span>
                <span className="font-mono text-white small">{currentView.substrate}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span className="text-meta">Foil Technique</span>
                <span className="font-mono text-white small">{currentView.foil}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span className="text-meta">Spine Engineering</span>
                <span className="font-mono text-white small">{currentView.spine}</span>
              </div>
            </div>

            <Link
              to="/books/architecture-of-silence"
              className="btn-editorial btn-editorial-solid btn-editorial-sm"
            >
              Read Full Technical Rationale <i className="bi bi-arrow-right btn-editorial-arrow" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
