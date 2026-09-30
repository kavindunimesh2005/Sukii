import React, { useEffect, useRef, useState } from 'react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const SEQUENCE_PHASES = [
  { step: '01', title: 'GENESIS OF FORM', subtitle: 'Mapping Swiss Typographic Coordinates', progressRange: [0, 25] },
  { step: '02', title: 'TACTILE SUBSTRATE', subtitle: 'Calibrating 320 GSM Japanese Linen', progressRange: [26, 55] },
  { step: '03', title: '24K FOIL STAMPING', subtitle: 'Micro-Debossing Brass Die at 140°C', progressRange: [56, 85] },
  { step: '04', title: 'ATELIER UNVEILING', subtitle: 'Binding Volume § 𝐔 𝐊 𝐈 𝐈 for Eternity', progressRange: [86, 100] }
];

export default function LoadingScreen({ onFinish, isStandalone = false }) {
  const [progress, setProgress] = useState(0);
  const [currentPhase, setCurrentPhase] = useState(SEQUENCE_PHASES[0]);
  const [isExiting, setIsExiting] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isFastForward, setIsFastForward] = useState(false);

  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const { playFoilChime, playTactileClick } = useAudioFeedback();

  // Mouse Move 3D Parallax
  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 30;
    const y = (clientY / innerHeight - 0.5) * -30;
    setMousePos({ x, y });
  };

  // Canvas Grid & Stardust Matrix Background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodes = [];
    const count = Math.min(80, Math.floor((width * height) / 16000));
    for (let i = 0; i < count; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 1.5 + 0.5,
        alpha: Math.random() * 0.5 + 0.2
      });
    }

    let animId;
    let gridOffset = 0;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      // Subtle Moving Precision Blueprint Grid
      gridOffset = (gridOffset + 0.15) % 40;
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.025)';
      ctx.lineWidth = 1;

      for (let x = gridOffset; x < width; x += 40) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      for (let y = gridOffset; y < height; y += 40) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Stardust Particles with Connections
      for (let i = 0; i < nodes.length; i++) {
        const n = nodes[i];
        n.x += n.vx;
        n.y += n.vy;

        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        ctx.fillStyle = `rgba(0, 229, 255, ${n.alpha})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.size, 0, Math.PI * 2);
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const n2 = nodes[j];
          const dist = Math.hypot(n.x - n2.x, n.y - n2.y);
          if (dist < 100) {
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.08 * (1 - dist / 100)})`;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      if (!isExiting) {
        animId = requestAnimationFrame(draw);
      }
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isExiting]);

  // Smooth Accelerated Counter
  useEffect(() => {
    const speed = isFastForward ? 15 : 40;
    const interval = setInterval(() => {
      setProgress((prev) => {
        const increment = isFastForward
          ? Math.floor(Math.random() * 8) + 6
          : Math.floor(Math.random() * 3) + 1;
        const next = Math.min(100, prev + increment);

        // Determine current phase
        const phase = SEQUENCE_PHASES.find(
          (p) => next >= p.progressRange[0] && next <= p.progressRange[1]
        ) || SEQUENCE_PHASES[SEQUENCE_PHASES.length - 1];
        setCurrentPhase(phase);

        if (next >= 100) {
          clearInterval(interval);
          try {
            playFoilChime();
          } catch (e) {}

          if (!isStandalone) {
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(() => {
                if (onFinish) onFinish();
              }, 950);
            }, 500);
          }
          return 100;
        }
        return next;
      });
    }, speed);

    return () => clearInterval(interval);
  }, [isFastForward, onFinish, isStandalone, playFoilChime]);

  // Spacebar Fast-Forward / Skip Handler
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        setIsFastForward(true);
      }
    };
    const handleKeyUp = (e) => {
      if (e.code === 'Space') {
        setIsFastForward(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const handleInstantEnter = () => {
    playTactileClick();
    setIsExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 450);
  };

  // Book 3D dynamic angles based on progress
  const bookRotateY = -28 + (progress / 100) * 56 + mousePos.x;
  const bookRotateX = 12 + (progress / 100) * -16 + mousePos.y;
  const coverOpenAngle = Math.min(160, Math.max(0, (progress - 30) * 2.3));

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className={`cinema-loader-root ${isExiting ? 'is-exit-animation' : ''}`}
    >
      <canvas ref={canvasRef} className="loader-bg-canvas" />

      {/* Atmospheric Vignette & Laser Line */}
      <div className="loader-vignette-overlay" />
      <div className="loader-laser-horizon" />

      {/* Top HUD Bar */}
      <header className="loader-hud-header">
        <div className="hud-atelier-brand">
          <span className="hud-status-beacon" />
          <span className="hud-title-text">§ 𝐔 𝐊 𝐈 𝐈 ATELIER ÉDITORIAL</span>
          <span className="hud-iso-tag">ISO-12647-2</span>
        </div>

        <div className="hud-controls-group">
          <span className="hud-space-hint">
            <kbd className="space-kbd">SPACE</kbd> BOOST
          </span>
          {!isStandalone && (
            <button onClick={handleInstantEnter} className="btn-loader-enter">
              <span>ENTER ATELIER</span>
              <i className="bi bi-arrow-right" />
            </button>
          )}
        </div>
      </header>

      {/* Monumental Giant Watermark Background Number */}
      <div className="loader-giant-watermark">
        <span>{String(progress).padStart(2, '0')}</span>
      </div>

      {/* CENTERSTAGE: 3D VOLUMETRIC BOOK MORPHING SCULPTURE */}
      <main className="loader-centerstage">
        <div
          className="stage-3d-scene"
          style={{
            transform: `perspective(1200px) rotateX(${bookRotateX}deg) rotateY(${bookRotateY}deg)`
          }}
        >
          {/* Ambient Pedestal Glow */}
          <div className="stage-pedestal-glow" />

          {/* 3D Book Object */}
          <div className="volumetric-3d-book">
            {/* Spine */}
            <div className="book-3d-spine">
              <span className="spine-title-emboss">§ 𝐔 𝐊 𝐈 𝐈 // 2026 EDITION</span>
            </div>

            {/* Back Cover */}
            <div className="book-3d-back" />

            {/* Paper Block Depth */}
            <div className="book-3d-pages-block">
              <div className="pages-gilded-edge" />
            </div>

            {/* Front Cover (Unfolds with Progress) */}
            <div
              className="book-3d-front"
              style={{
                transform: `rotateY(-${coverOpenAngle}deg)`
              }}
            >
              <div className="front-cover-foil-wrap">
                <div className="front-gold-foil-crest">
                  <img
                    src="/assets/logo/logo-white-lines.png"
                    alt="Emblem"
                    className="foil-crest-graphic"
                  />
                  <div className="crest-radiant-shimmer" />
                </div>

                <div className="front-cover-typography">
                  <span className="cover-pre-tag">HAUTE-COUTURE</span>
                  <h2 className="cover-title-chiseled">§ 𝐔 𝐊 𝐈 𝐈</h2>
                  <span className="cover-sub-tag">ARCHITECTURAL MONOGRAPH</span>
                </div>

                {/* Laser scan glint line across cover */}
                <div className="cover-laser-glint" />
              </div>
            </div>
          </div>
        </div>

        {/* Dynamic Phase Statement */}
        <div className="loader-phase-indicator">
          <div className="phase-step-pill">
            <span className="step-num">PHASE {currentPhase.step} / 04</span>
            <span className="step-bar-fill" style={{ width: `${(progress % 25) * 4}%` }} />
          </div>
          <h3 className="phase-headline">{currentPhase.title}</h3>
          <p className="phase-sub-desc">{currentPhase.subtitle}</p>
        </div>
      </main>

      {/* BOTTOM HUD CONTROLLER BAR */}
      <footer className="loader-hud-footer">
        <div className="footer-hud-grid">
          {/* Left: Live Technical Diagnostic Terminal */}
          <div className="hud-terminal-col">
            <div className="terminal-line">
              <span className="term-prompt">SYS //</span>
              <span className="term-code">LAT 48.8566° N • LON 2.3522° E</span>
            </div>
            <div className="terminal-line">
              <span className="term-prompt">RAW //</span>
              <span className="term-highlight">ARCHIVAL LINEN • 0.05MM BINDING</span>
            </div>
          </div>

          {/* Center: Monumental Progress Ticker */}
          <div className="hud-progress-center">
            <div className="progress-number-row">
              <span className="num-digits">{String(progress).padStart(3, '0')}</span>
              <span className="num-pct">%</span>
            </div>
            <div className="kinetic-progress-bar-wrap">
              <div
                className="kinetic-progress-bar-fill"
                style={{ width: `${progress}%` }}
              />
              <div
                className="kinetic-progress-spark"
                style={{ left: `${progress}%` }}
              />
            </div>
          </div>

          {/* Right: Sound & Calibration State */}
          <div className="hud-specs-col">
            <span className="spec-item">AUDIO: SPATIAL 432Hz</span>
            <span className="spec-item">RESOLUTION: 4K CALIBRATED</span>
          </div>
        </div>
      </footer>

      {/* Cinematic Aperture Shutter Curtain Wipe Exit */}
      <div className="cinema-curtain-top" />
      <div className="cinema-curtain-bottom" />
      <div className="cinema-curtain-left" />
      <div className="cinema-curtain-right" />
    </div>
  );
}
