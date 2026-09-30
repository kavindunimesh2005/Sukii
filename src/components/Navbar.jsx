import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, toggleTheme, soundEnabled, toggleSound }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile drawer on route change
  useEffect(() => {
    setMobileOpen(false);
    document.body.style.overflow = '';
  }, [location.pathname]);

  const handleMobileToggle = () => {
    const nextState = !mobileOpen;
    setMobileOpen(nextState);
    document.body.style.overflow = nextState ? 'hidden' : '';
  };

  return (
    <>
      <header className={`site-header ${scrolled ? 'scrolled' : ''}`}>
        <div className="header-inner">
          {/* Brand Logo */}
          <Link to="/" className="brand-logo-link" aria-label="§ 𝐔 𝐊 𝐈 𝐈 Home">
            <img
              src="/assets/logo/logo-white-lines.png"
              alt="§ 𝐔 𝐊 𝐈 𝐈 Emblem"
              className="brand-emblem-img brand-emblem-dark"
            />
            <img
              src="/assets/logo/logo-dark-lines.png"
              alt="§ 𝐔 𝐊 𝐈 𝐈 Emblem"
              className="brand-emblem-img brand-emblem-light"
            />
            <div>
              <span className="brand-logo-text">§ 𝐔 𝐊 𝐈 𝐈</span>
              <span className="brand-logo-subtitle">Editorial Atelier</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-desktop">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
              end
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              About Designer
            </NavLink>
            <NavLink
              to="/books"
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              Book Designs
            </NavLink>
            <NavLink
              to="/gallery"
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              Gallery
            </NavLink>
            <NavLink
              to="/services"
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              Services
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `nav-link-item ${isActive ? 'active' : ''}`
              }
            >
              Contact
            </NavLink>
          </nav>

          {/* Actions & Theme / Audio Toggles */}
          <div className="nav-actions">
            <button
              className="icon-action-btn"
              onClick={toggleSound}
              aria-label="Toggle Sound FX"
              title={soundEnabled ? 'Mute Sound FX' : 'Enable Sound FX'}
            >
              <i className={soundEnabled ? 'bi bi-volume-up' : 'bi bi-volume-mute'} />
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <Link
              to="/contact"
              className="btn-editorial btn-editorial-sm d-none d-md-inline-flex"
            >
              Commission <i className="bi bi-arrow-right btn-editorial-arrow" />
            </Link>
            <button
              className={`mobile-menu-toggle ${mobileOpen ? 'active' : ''}`}
              onClick={handleMobileToggle}
              aria-label="Open Navigation Menu"
            >
              <span />
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Nav Drawer */}
      <div className={`mobile-nav-drawer ${mobileOpen ? 'open' : ''}`}>
        <div className="mobile-nav-links">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
            end
          >
            01. Home
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
          >
            02. About Designer
          </NavLink>
          <NavLink
            to="/books"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
          >
            03. Book Designs
          </NavLink>
          <NavLink
            to="/gallery"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
          >
            04. Visual Gallery
          </NavLink>
          <NavLink
            to="/services"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
          >
            05. Services & Atelier
          </NavLink>
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `mobile-nav-link ${isActive ? 'active' : ''}`
            }
          >
            06. Start a Project
          </NavLink>
        </div>
        <div className="mobile-drawer-footer">
          <div className="d-flex justify-content-between align-items-center">
            <span className="font-mono">§ 𝐔 𝐊 𝐈 𝐈 © 2026</span>
            <span className="text-meta">Editorial Book Studio</span>
          </div>
        </div>
      </div>
    </>
  );
}
