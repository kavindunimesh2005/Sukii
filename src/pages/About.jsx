import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';

export default function About() {
  useEffect(() => {
    document.title = 'About the Designer — § 𝐔 𝐊 𝐈 𝐈';
  }, []);

  const processSteps = [
    {
      num: "01",
      name: "DISCOVER",
      desc: "Deep reading of the manuscript, thematic deconstruction, and mapping the emotional undertones and core audience."
    },
    {
      num: "02",
      name: "RESEARCH",
      desc: "Historical typographic exploration, paper stock sampling, binding methods, and cultural iconography curation."
    },
    {
      num: "03",
      name: "CONCEPT",
      desc: "Developing 2–3 divergent visual philosophies and jacket architectures with distinct typographic hierarchy."
    },
    {
      num: "04",
      name: "DESIGN",
      desc: "Precision layout drafting, spine thickness calculation, custom letterform chiseling, and foil stamp mask creation."
    },
    {
      num: "05",
      name: "REFINE",
      desc: "Typesetting proofing, kerning micro-adjustments, color calibration under standard viewing lights, and 3D proofing."
    },
    {
      num: "06",
      name: "DELIVER",
      desc: "Certified print-ready PDF/X files, spot UV / foil separation layers, ebook conversions, and printer liaison."
    }
  ];

  return (
    <div className="about-page">
      {/* --- PAGE HEADER --- */}
      <section className="page-header-editorial">
        <div className="container">
          <ScrollReveal>
            <span className="editorial-meta-tag">BIOGRAPHY & ATELIER</span>
            <h1 className="page-title-editorial">
              ABOUT THE <span className="font-editorial">Designer</span>
            </h1>
            <p className="page-subtitle-editorial">
              Dedicated to the craft of physical book design, bespoke typography, and sensory reading experiences.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* --- HERO BIO & PORTRAIT --- */}
      <section className="about-hero-section">
        <div className="container">
          <div className="about-hero-grid">
            <div className="about-portrait-col">
              <ScrollReveal>
                <div className="portrait-frame">
                  <img
                    src="/assets/images/designer-portrait.jpg"
                    alt="§ 𝐔 𝐊 𝐈 𝐈 — Atelier Master & Book Designer"
                    className="portrait-img"
                    loading="lazy"
                  />
                  <div className="portrait-badge">
                    <span>§ 𝐔 𝐊 𝐈 𝐈</span>
                    <span className="portrait-sub">CREATIVE DIRECTOR</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="about-bio-col">
              <ScrollReveal delay={100}>
                <span className="editorial-meta-tag">DESIGN PHILOSOPHY</span>
                <h2 className="about-bio-heading">
                  "A BOOK COVER IS NOT A POSTER. IT IS THE <span className="font-editorial">Sacred Threshold</span> TO ANOTHER REALM."
                </h2>

                <div className="bio-paragraphs">
                  <p>
                    § 𝐔 𝐊 𝐈 𝐈 is an independent book designer and editorial director whose work
                    bridges the tactile heritage of classical Swiss typography with avant-garde contemporary minimalism.
                    Over the past decade, the atelier has specialized in crafting definitive book jackets, collector editions,
                    and complete typographic systems for world-class literary authors, architecture monographs, and poetry presses.
                  </p>
                  <p>
                    Every volume is treated as a three-dimensional sculpture. From calculating spine curvature to specifying
                    micro-textured buckram bookcloth and hot-stamped pigment foils, our obsession is creating books that command
                    reverence both on the library shelf and in the reader's hands.
                  </p>
                </div>

                <div className="about-attributes-grid">
                  <div className="attr-item">
                    <span className="attr-label">SPECIALIZATION</span>
                    <span className="attr-val">Monographs, Fiction, Poetry</span>
                  </div>
                  <div className="attr-item">
                    <span className="attr-label">FOUNDED</span>
                    <span className="attr-val">2026 Atelier Cycle</span>
                  </div>
                  <div className="attr-item">
                    <span className="attr-label">LOCATION</span>
                    <span className="attr-val">Global Atelier Services</span>
                  </div>
                  <div className="attr-item">
                    <span className="attr-label">PRINT METHODOLOGY</span>
                    <span className="attr-val">Foil Debossing & Thread Binding</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* --- CRAFT METHODOLOGY & ATELIER PROCESS --- */}
      <section className="process-section section-pad">
        <div className="container">
          <div className="section-header-editorial">
            <ScrollReveal>
              <span className="editorial-meta-tag">DISCIPLINED CREATIVE WORKFLOW</span>
              <h2 className="section-title-editorial">
                THE 01–06 <span className="font-editorial">Process</span>
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={100}>
              <p className="process-intro">
                A rigorous, collaborative trajectory ensuring intellectual depth and flawless industrial execution.
              </p>
            </ScrollReveal>
          </div>

          <div className="process-steps-grid">
            {processSteps.map((step, idx) => (
              <ScrollReveal key={step.num} delay={idx * 70}>
                <div className="process-card">
                  <div className="process-card-header">
                    <span className="process-step-num">{step.num}</span>
                    <span className="process-line"></span>
                  </div>
                  <h3 className="process-step-title">{step.name}</h3>
                  <p className="process-step-desc">{step.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- ATELIER ENVIRONMENT & VALUES --- */}
      <section className="atelier-values-section section-pad">
        <div className="container">
          <div className="values-grid">
            <div className="values-imagery">
              <ScrollReveal>
                <div className="values-img-box">
                  <img
                    src="/assets/images/book-binding-craft.jpg"
                    alt="Physical Book Binding Craft"
                    className="values-photo"
                    loading="lazy"
                  />
                  <div className="values-caption">
                    <span>Archival Thread Stitching & Raw Spine Finishing</span>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="values-text-col">
              <ScrollReveal delay={150}>
                <span className="editorial-meta-tag">STANDARDS OF EXCELLENCE</span>
                <h2 className="values-title">
                  NO COMPROMISE ON <span className="font-editorial">Materiality</span>
                </h2>
                <div className="values-list">
                  <div className="value-row">
                    <span className="val-icon">❖</span>
                    <div>
                      <h4>Custom Typographic Treatments</h4>
                      <p>We do not settle for stock font files. We draw, chisel, and refine bespoke letterforms to ensure your title is unrepeatable.</p>
                    </div>
                  </div>
                  <div className="value-row">
                    <span className="val-icon">❖</span>
                    <div>
                      <h4>Precision Spine Calculations</h4>
                      <p>Spine width is mathematically calibrated against actual paper bulk weight (GSM) to prevent cracking or shifting.</p>
                    </div>
                  </div>
                  <div className="value-row">
                    <span className="val-icon">❖</span>
                    <div>
                      <h4>Direct Publisher & Printer Liaison</h4>
                      <p>We communicate directly with European and American press houses to review color drawdowns and foil embossing proofs.</p>
                    </div>
                  </div>
                </div>

                <div className="about-cta-box">
                  <Link to="/contact" className="btn-atelier btn-primary-atelier">
                    <span>START A CONVERSATION</span>
                    <i className="bi bi-arrow-right"></i>
                  </Link>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
