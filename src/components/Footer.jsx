import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="row g-5">
          <div className="col-lg-5">
            <div className="footer-brand-title">§ 𝐔 𝐊 𝐈 𝐈</div>
            <p className="footer-brand-desc">
              Independent editorial and book design atelier. Crafting tactile
              publications, iconic book jackets, and typography-driven literary
              identities.
            </p>
            <div className="text-meta mt-4">
              <span>Studio Hours: Mon — Fri (CET)</span>
            </div>
          </div>

          <div className="col-6 col-lg-2 offset-lg-1 footer-nav-col">
            <h5>Navigation</h5>
            <ul className="footer-nav-list">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/about">About Designer</Link></li>
              <li><Link to="/books">Book Designs</Link></li>
              <li><Link to="/gallery">Visual Gallery</Link></li>
              <li><Link to="/services">Services</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/loading">Loading Experience ✦</Link></li>
            </ul>

          </div>

          <div className="col-6 col-lg-2 footer-nav-col">
            <h5>Disciplines</h5>
            <ul className="footer-nav-list">
              <li><Link to="/services">Cover Design</Link></li>
              <li><Link to="/services">Interior Layout</Link></li>
              <li><Link to="/services">Art Monographs</Link></li>
              <li><Link to="/services">Typography</Link></li>
              <li><Link to="/services">Publishing Imprints</Link></li>
            </ul>
          </div>

          <div className="col-lg-2 footer-nav-col">
            <h5>Connect</h5>
            <ul className="footer-nav-list">
              <li><Link to="/contact">Inquiries</Link></li>
              <li><a href="https://instagram.com" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://behance.net" target="_blank" rel="noopener noreferrer">Behance</a></li>
              <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>© 2026 § 𝐔 𝐊 𝐈 𝐈. All rights reserved.</div>
          <div>Minimalism, Typography &amp; Tactile Book Architecture.</div>
        </div>
      </div>
    </footer>
  );
}
