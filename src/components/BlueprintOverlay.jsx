import React, { useState } from 'react';

export default function BlueprintOverlay({ children, title = 'ARCHITECTURAL LAYOUT' }) {
  const [blueprintActive, setBlueprintActive] = useState(false);

  return (
    <div className={`blueprint-wrapper ${blueprintActive ? 'blueprint-on' : ''}`}>
      <div className="blueprint-control-tag">
        <button
          type="button"
          onClick={() => setBlueprintActive((prev) => !prev)}
          className={`blueprint-toggle-pill ${blueprintActive ? 'active' : ''}`}
          title="Toggle Golden Ratio & Typographic Blueprint Grid"
        >
          <i className="bi bi-grid-3x3" />
          <span>{blueprintActive ? 'HIDE BLUEPRINT' : 'INSPECT GOLDEN RATIO'}</span>
        </button>
      </div>

      <div className="blueprint-content-zone">
        {children}

        {/* Blueprint Visual Wireframe Layer */}
        {blueprintActive && (
          <div className="blueprint-canvas-overlay">
            <div className="blueprint-grid-lines" />
            <div className="blueprint-golden-spiral" />
            <div className="blueprint-crosshair top-left" />
            <div className="blueprint-crosshair top-right" />
            <div className="blueprint-crosshair bottom-left" />
            <div className="blueprint-crosshair bottom-right" />

            <div className="blueprint-meta-tag top">
              <span>MARGIN: 34MM • BLEED: 5.0MM • TRIM: 230×310MM</span>
            </div>
            <div className="blueprint-meta-tag bottom">
              <span>GOLDEN RATIO: Φ = 1.618033 • LEADING: 14.5PT</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
