import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ModernCenterstageHero from '../components/ModernCenterstageHero';
import Interactive3DBookStudio from '../components/Interactive3DBookStudio';
import FoilCustomizerLab from '../components/FoilCustomizerLab';
import CinematicFilmReel from '../components/CinematicFilmReel';
import ExplodedBookAnatomy from '../components/ExplodedBookAnatomy';
import TypographicAnatomyPlayground from '../components/TypographicAnatomyPlayground';
import VirtualBookReader from '../components/VirtualBookReader';
import HorizontalArchiveStrip from '../components/HorizontalArchiveStrip';
import AtelierBentoMatrix from '../components/AtelierBentoMatrix';
import KineticMarqueeRibbon from '../components/KineticMarqueeRibbon';
import ScrollReveal from '../components/ScrollReveal';
import { useAudioFeedback } from '../hooks/useAudioFeedback';
import { BOOKS_DATA } from '../data/books';
import { SERVICES_DATA } from '../data/services';


const MATERIAL_FINISHES = [
  {
    id: 'linen',
    name: 'Japanese Charcoal Buckram',
    code: 'SPEC-BK-880',
    texture: 'Raw textured linen weave with natural slub finish',
    foil: 'Matte Silver Foil Hot Stamping',
    weight: '320 GSM Heavyweight Canvas',
    bgPreview: 'linear-gradient(135deg, #111111 0%, #1c1c1c 50%, #0d0d0d 100%)',
    img: '/assets/books/architecture-of-silence.jpg'
  },
  {
    id: 'foil',
    name: 'Metallic Platinum Foil Die',
    code: 'SPEC-PL-920',
    texture: 'Precision brass die stamp with 0.4mm micro-deboss',
    foil: 'Mirror Platinum Metallic Reflection',
    weight: 'Reflective Foil Membrane',
    bgPreview: 'linear-gradient(135deg, #2a2a2a 0%, #4f4f4f 50%, #151515 100%)',
    img: '/assets/books/chronicles-nocturne.jpg'
  },
  {
    id: 'cotton',
    name: 'Archival French Cotton Stock',
    code: 'SPEC-CT-410',
    texture: '100% rag cotton with deckled edge tactile porosity',
    foil: 'Blind Impression (No Pigment)',
    weight: '240 GSM Mouldmade Paper',
    bgPreview: 'linear-gradient(135deg, #1a1a1a 0%, #252525 50%, #111111 100%)',
    img: '/assets/books/ephemeral-form-void.jpg'
  },
  {
    id: 'velvet',
    name: 'Soft-Touch Matte Velvet Noir',
    code: 'SPEC-VL-105',
    texture: 'Non-glare sensory lamination with deep light absorption',
    foil: 'Spot Gloss UV Polymeric Varnish',
    weight: '170 GSM Case Wrap Bond',
    bgPreview: 'linear-gradient(135deg, #080808 0%, #131313 50%, #050505 100%)',
    img: '/assets/books/geometry-of-silence.jpg'
  }
];

export default function Home() {
  const [activeMaterial, setActiveMaterial] = useState(MATERIAL_FINISHES[0]);
  const [calcFormat, setCalcFormat] = useState('Hardcover Linen');
  const [calcFoil, setCalcFoil] = useState('Foil Debossing');
  const [calcInterior, setCalcInterior] = useState('Full Interior Typesetting');
  const { playTactileClick, playFoilChime } = useAudioFeedback();

  useEffect(() => {
    document.title = '§ 𝐔 𝐊 𝐈 𝐈 — Haute-Couture Book Designer & Editorial Studio';
  }, []);


  return (
    <div className="home-page-avant-garde">
      {/* --- 1. 2026 MODERN CENTERSTAGE 3D HERO --- */}
      <ModernCenterstageHero />

      {/* --- 2. 2026 DUAL-DIRECTION KINETIC MARQUEE RIBBON --- */}
      <KineticMarqueeRibbon />


      {/* --- 3. 360° INTERACTIVE 3D BOOK & UNWRAPPED JACKET STUDIO --- */}
      <section className="interactive-studio-section section-pad">
        <div className="container">
          <div className="section-header-editorial">
            <ScrollReveal>
              <span className="editorial-meta-tag">VOLUMETRIC ATELIER PROJECTION</span>
              <h2 className="section-title-editorial">
                3D COVER & <span className="font-editorial">Wraparound Studio</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="lab-intro-text">
                Rotate 360°, inspect macro spine debossing, or unfold the complete mechanical dust jacket spread with printer registration marks.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={150}>
            <Interactive3DBookStudio />
          </ScrollReveal>
        </div>
      </section>

      {/* --- 4. LIVE METALLIC FOIL EMBOSSING CUSTOMIZER LAB --- */}
      <FoilCustomizerLab />

      {/* --- 5. CINEMATIC 4K CRAFT FILM SHOWREEL --- */}
      <CinematicFilmReel />

      {/* --- 6. 3D EXPLODED BOOK ANATOMY DISSECTION --- */}
      <ExplodedBookAnatomy />

      {/* --- 7. SWISS TYPOGRAPHIC ANATOMY CALIPER LAB --- */}
      <TypographicAnatomyPlayground />

      {/* --- 8. VIRTUAL 3D OPEN SPREAD INSPECTION LOUNGE --- */}
      <section className="virtual-spread-section section-pad">
        <div className="container">
          <div className="section-header-editorial">
            <ScrollReveal>
              <span className="editorial-meta-tag">TACTILE READING EXPERIENCE</span>
              <h2 className="section-title-editorial">
                INTERACTIVE <span className="font-editorial">Spread Inspector</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="lab-intro-text">
                Explore real museum-grade typographic column grids, colophons, and archival thread stitching in simulated 3D.
              </p>
            </ScrollReveal>
          </div>

          <ScrollReveal delay={150}>
            <VirtualBookReader />
          </ScrollReveal>
        </div>
      </section>

      {/* --- 6. CONTINUOUS HORIZONTAL CATALOGUE REEL --- */}
      <HorizontalArchiveStrip />

      {/* --- 7. TACTILE FINISH STUDIO --- */}
      <section className="materiality-lab-section section-pad">
        <div className="container">
          <div className="section-header-editorial">
            <ScrollReveal>
              <span className="editorial-meta-tag">MATERIALITY & SUBSTRATES</span>
              <h2 className="section-title-editorial">
                TACTILE FINISH <span className="font-editorial">Studio</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="lab-intro-text">
                Select a bespoke physical specification below to preview lighting response, debossing depth, and substrate textures.
              </p>
            </ScrollReveal>
          </div>

          <div className="materiality-lab-grid">
            {/* Left Selector List */}
            <div className="material-selector-col">
              <ScrollReveal>
                <div className="material-nav-list">
                  {MATERIAL_FINISHES.map((mat, idx) => {
                    const isSelected = activeMaterial.id === mat.id;
                    return (
                      <button
                        key={mat.id}
                        onClick={() => {
                          playTactileClick();
                          setActiveMaterial(mat);
                        }}
                        className={`material-item-btn ${isSelected ? 'active' : ''}`}
                      >

                        <div className="mat-btn-top">
                          <span className="mat-index">0{idx + 1}</span>
                          <span className="mat-code">{mat.code}</span>
                        </div>
                        <h4 className="mat-name">{mat.name}</h4>
                        <p className="mat-texture-preview">{mat.texture}</p>
                      </button>
                    );
                  })}
                </div>
              </ScrollReveal>
            </div>

            {/* Right Interactive Viewport */}
            <div className="material-viewport-col">
              <ScrollReveal delay={150}>
                <div className="material-display-stage">
                  <div className="stage-bg-preview" style={{ background: activeMaterial.bgPreview }}>
                    <div className="stage-lighting-flare" />
                    <img
                      src={activeMaterial.img}
                      alt={activeMaterial.name}
                      className="stage-book-img"
                    />
                    <div className="stage-tactile-shimmer" />
                  </div>

                  <div className="stage-spec-card">
                    <div className="spec-card-header">
                      <span className="spec-badge">PHYSICAL ATELIER SPECIFICATION</span>
                      <span className="spec-code-tag">{activeMaterial.code}</span>
                    </div>
                    <h3 className="spec-mat-title">{activeMaterial.name}</h3>

                    <div className="spec-details-row">
                      <div className="spec-col">
                        <span className="spec-k">FOIL TREATMENT:</span>
                        <span className="spec-v">{activeMaterial.foil}</span>
                      </div>
                      <div className="spec-col">
                        <span className="spec-k">PAPER WEIGHT:</span>
                        <span className="spec-v">{activeMaterial.weight}</span>
                      </div>
                    </div>

                    <div className="spec-card-action">
                      <Link
                        to={`/contact?subject=${encodeURIComponent(`Inquiry regarding ${activeMaterial.name} physical finish`)}`}
                        className="btn-atelier btn-outline-atelier btn-sm-atelier w-100 text-center"
                      >
                        <span>SPECIFY THIS FINISH FOR YOUR BOOK</span>
                        <i className="bi bi-arrow-right"></i>
                      </Link>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- 8. COMMISSION BRIEF CONFIGURATOR WIDGET --- */}
      <section className="configurator-section section-pad">
        <div className="container">
          <div className="configurator-box">
            <div className="config-header">
              <ScrollReveal>
                <span className="editorial-meta-tag">INTERACTIVE COMMISSION ESTIMATOR</span>
                <h2 className="config-title">
                  CONFIGURE YOUR <span className="font-editorial">Edition</span>
                </h2>
                <p className="config-sub">
                  Select your desired format, embellishments, and interior scope to calculate estimated production turnaround.
                </p>
              </ScrollReveal>
            </div>

            <div className="config-interactive-row">
              {/* Option 1: Format */}
              <div className="config-choice-group">
                <span className="choice-label">01. BINDING FORMAT</span>
                <div className="choice-pills">
                  {['Hardcover Linen', 'Paperback Flaps', 'Collector Boxset', 'Monograph Case'].map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        playTactileClick();
                        setCalcFormat(f);
                      }}
                      className={`choice-btn ${calcFormat === f ? 'active' : ''}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 2: Foil & Embellishment */}
              <div className="config-choice-group">
                <span className="choice-label">02. EMBELLISHMENT</span>
                <div className="choice-pills">
                  {['Foil Debossing', 'Blind Letterpress', 'Edge Gilding', 'Silk Screen Print'].map((f) => (
                    <button
                      key={f}
                      onClick={() => {
                        playFoilChime();
                        setCalcFoil(f);
                      }}
                      className={`choice-btn ${calcFoil === f ? 'active' : ''}`}
                    >
                      {f}
                    </button>
                  ))}
                </div>
              </div>

              {/* Option 3: Interior */}
              <div className="config-choice-group">
                <span className="choice-label">03. INTERIOR SCOPE</span>
                <div className="choice-pills">
                  {['Full Interior Typesetting', 'Cover Jacket Only', 'Complete Volume Suite'].map((i) => (
                    <button
                      key={i}
                      onClick={() => {
                        playTactileClick();
                        setCalcInterior(i);
                      }}
                      className={`choice-btn ${calcInterior === i ? 'active' : ''}`}
                    >
                      {i}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            {/* Config Output Summary Card */}
            <div className="config-output-bar">
              <div className="output-specs">
                <span className="output-tag">ESTIMATED ATELIER DURATION:</span>
                <span className="output-val">4–6 Weeks Production Cycle</span>
              </div>
              <Link
                to={`/contact?subject=${encodeURIComponent(`Project Brief: ${calcFormat} with ${calcFoil} and ${calcInterior}`)}`}
                className="btn-atelier btn-primary-atelier"
              >
                <span>INITIATE WITH THIS CONFIGURATION</span>
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* --- 9. 2026 ATELIER BENTO ECOSYSTEM MATRIX --- */}
      <AtelierBentoMatrix />


      {/* --- 10. PHILOSOPHY MANIFESTO MATRIX --- */}
      <section className="philosophy-section section-pad">

        <div className="container">
          <div className="section-header-editorial">
            <ScrollReveal>
              <span className="editorial-meta-tag">MANIFESTO & ETHOS</span>
              <h2 className="section-title-editorial">
                THE § 𝐔 𝐊 𝐈 𝐈 <span className="font-editorial">Philosophy</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="philosophy-grid">
            <ScrollReveal delay={50}>
              <div className="philosophy-card">
                <span className="philosophy-num">01</span>
                <h3 className="philosophy-card-title">Typographic Gravity</h3>
                <p className="philosophy-card-text">
                  Typography is not mere text; it is the physical architecture of thought. Every kerning pair,
                  leading rhythm, and negative margin is calculated to evoke deep emotional resonance.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="philosophy-card">
                <span className="philosophy-num">02</span>
                <h3 className="philosophy-card-title">Tactile Immersion</h3>
                <p className="philosophy-card-text">
                  In a fleeting digital era, the physical book is an enduring art object. We specify Japanese linen,
                  hot-stamped metallic foils, and uncoated cotton stocks that reward touch and age with dignity.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="philosophy-card">
                <span className="philosophy-num">03</span>
                <h3 className="philosophy-card-title">Editorial Restraint</h3>
                <p className="philosophy-card-text">
                  True luxury resides in the confidence to embrace the void. We reject visual clutter, letting stark
                  contrasts and pristine whitespaces magnify the author's voice without distraction.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- 10. BESPOKE SERVICES PREVIEW --- */}
      <section className="services-strip-section section-pad">
        <div className="container">
          <div className="services-strip-header">
            <ScrollReveal>
              <span className="editorial-meta-tag">ATELIER DISCIPLINES</span>
              <h2 className="section-title-editorial">
                BESPOKE <span className="font-editorial">Services</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <Link to="/services" className="view-all-link">
                EXPLORE ALL DISCIPLINES <i className="bi bi-arrow-right"></i>
              </Link>
            </ScrollReveal>
          </div>

          <div className="services-preview-grid">
            {SERVICES_DATA.slice(0, 3).map((srv, idx) => (
              <ScrollReveal key={srv.num} delay={idx * 100}>
                <div className="service-preview-card">
                  <div className="srv-card-top">
                    <span className="srv-card-num">{srv.num}</span>
                    <span className="srv-card-tag">{srv.tag}</span>
                  </div>
                  <h3 className="srv-card-title">{srv.title}</h3>
                  <p className="srv-card-overview">{srv.overview}</p>
                  <Link to="/services" className="srv-card-link">
                    <span>DETAILS</span>
                    <i className="bi bi-arrow-up-right"></i>
                  </Link>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- 11. FINAL MONUMENTAL CALL TO ACTION --- */}
      <section className="final-cta-section">
        <div className="container">
          <ScrollReveal>
            <div className="final-cta-box">
              <span className="editorial-meta-tag">COMMISSIONS OPEN • 2026 CYCLE</span>
              <h2 className="final-cta-heading">
                LET'S DESIGN SOMETHING <br />
                <span className="font-editorial">Worth Remembering.</span>
              </h2>
              <p className="final-cta-sub">
                Accepting select editorial monographs, literary fiction jackets, and complete book systems for discerning authors and publishers.
              </p>
              <div className="final-cta-actions">
                <Link to="/contact" className="btn-atelier btn-primary-atelier">
                  <span>INITIATE COMMISSION</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
                <Link to="/about" className="btn-atelier btn-outline-atelier">
                  <span>MEET THE DESIGNER</span>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
