import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScrollReveal from '../components/ScrollReveal';
import ServiceItem from '../components/ServiceItem';
import { SERVICES_DATA } from '../data/services';

export default function Services() {
  const [openServiceNum, setOpenServiceNum] = useState('01');

  useEffect(() => {
    document.title = 'Bespoke Atelier Services — § 𝐔 𝐊 𝐈 𝐈';
  }, []);

  const handleToggleService = (num) => {
    setOpenServiceNum((prev) => (prev === num ? null : num));
  };

  return (
    <div className="services-page">
      {/* --- PAGE HEADER --- */}
      <section className="page-header-editorial">
        <div className="container">
          <ScrollReveal>
            <span className="editorial-meta-tag">ATELIER DISCIPLINES</span>
            <h1 className="page-title-editorial">
              BESPOKE <span className="font-editorial">Services</span>
            </h1>
            <p className="page-subtitle-editorial">
              Comprehensive design, typography, and production direction tailored for high-caliber publications.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* --- SERVICES ACCORDION / LIST --- */}
      <section className="services-list-section section-pad">
        <div className="container">
          <div className="services-editorial-container">
            {SERVICES_DATA.map((srv, idx) => (
              <ScrollReveal key={srv.num} delay={idx * 60}>
                <ServiceItem
                  service={srv}
                  isOpen={openServiceNum === srv.num}
                  onToggle={() => handleToggleService(srv.num)}
                />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* --- COMMISSION ASSURANCE GRID --- */}
      <section className="assurance-section section-pad">
        <div className="container">
          <div className="section-header-editorial">
            <ScrollReveal>
              <span className="editorial-meta-tag">OUR COMMITMENT</span>
              <h2 className="section-title-editorial">
                THE ATELIER <span className="font-editorial">Standard</span>
              </h2>
            </ScrollReveal>
          </div>

          <div className="assurance-grid">
            <ScrollReveal delay={50}>
              <div className="assurance-card">
                <span className="assurance-icon">01</span>
                <h3>Print-Certified Perfection</h3>
                <p>
                  Every delivery includes certified PDF/X-1a or PDF/X-4 files calibrated with appropriate bleed,
                  color profile (ISO Coated / GRACoL), and font embedding to guarantee zero printing errors.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150}>
              <div className="assurance-card">
                <span className="assurance-icon">02</span>
                <h3>Direct Designer Collaboration</h3>
                <p>
                  You work directly with the principal creative director. No account executives, no junior intermediaries,
                  and no outsourced generic templates.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={250}>
              <div className="assurance-card">
                <span className="assurance-icon">03</span>
                <h3>Comprehensive Multi-Format Assets</h3>
                <p>
                  Receive high-res 3D photorealistic mockups, ebook front covers, audiobook squares, and social announcement
                  assets alongside your print case wraps.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* --- INITIATE COMMISSION CTA --- */}
      <section className="final-cta-section">
        <div className="container">
          <ScrollReveal>
            <div className="final-cta-box">
              <span className="editorial-meta-tag">READY TO COMMENCE?</span>
              <h2 className="final-cta-heading">
                DISCUSS YOUR <br />
                <span className="font-editorial">Next Publication.</span>
              </h2>
              <p className="final-cta-sub">
                We accept a limited roster of 12 commissions per calendar year to ensure unhurried dedication to each title.
              </p>
              <div className="final-cta-actions">
                <Link to="/contact" className="btn-atelier btn-primary-atelier">
                  <span>SEND PROJECT BRIEF</span>
                  <i className="bi bi-arrow-right"></i>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
