import React, { useEffect, useRef, useState } from 'react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const DIAGNOSTIC_MESSAGES = [
  'INITIALIZING ATELIER ARCHIVE...',
  'CALIBRATING 24K FOIL DEBOSSING DIE...',
  'CURATING MONOCHROME ARCHIVAL PALETTES...',
  'COMPUTING GOLDEN RATIO Φ = 1.618 MARGINS...',
  'ALIGNING 0.05MM SPINE REGISTRATION...',
  'SYNTHESIZING BESPOKE LETTERFORMS...',
  'FINALIZING MUSEUM-GRADE MONOGRAPH...',
  'ATELIER READY // ENTERING § 𝐔 𝐊 𝐈 𝐈'
];

const WORDS_CYCLE = [
  'TYPOGRAPHY',
  'MATERIALITY',
  'ARCHITECTURE',
  'SILENCE',
  'PERMANENCE',
  '§ 𝐔 𝐊 𝐈 𝐈'
];

export default function LoadingScreen({ onFinish, isStandalone = false }) {
  const [progress, setProgress] = useState(0);
  const [isExiting, setIsExiting] = useState(false);
  const [diagIndex, setDiagIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const canvasRef = useRef(null);
  const { playFoilChime, playTactileClick } = useAudioFeedback();

  // Canvas Constellation Nebula Animation
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

    const particles = [];
    const count = Math.min(120, Math.floor((width * height) / 12000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 2 + 0.8,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        alpha: Math.random() * 0.6 + 0.3,
        pulse: Math.random() * 0.05 + 0.02
      });
    }

    let animId;
    let angle = 0;

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Rotating celestial dust ring
      angle += 0.003;
      const centerX = width / 2;
      const centerY = height / 2;
      const ringRadius = Math.min(width, height) * 0.28;

      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(angle);
      ctx.beginPath();
      ctx.arc(0, 0, ringRadius, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(0, 229, 255, 0.12)';
      ctx.lineWidth = 1;
      ctx.setLineDash([8, 14]);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(0, 0, ringRadius * 1.35, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.04)';
      ctx.lineWidth = 1;
      ctx.setLineDash([4, 20]);
      ctx.stroke();
      ctx.restore();

      // Draw & Connect Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();

        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(0, 229, 255, ${0.1 * (1 - dist / 110)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      if (!isExiting) {
        animId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
    };
  }, [isExiting]);

  // Word Cycler
  useEffect(() => {
    const wordTimer = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS_CYCLE.length);
    }, 450);
    return () => clearInterval(wordTimer);
  }, []);

  // Progress Ticker
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        const increment = Math.floor(Math.random() * 6) + 3;
        const next = prev + increment;

        const msgIdx = Math.min(
          DIAGNOSTIC_MESSAGES.length - 1,
          Math.floor((next / 100) * DIAGNOSTIC_MESSAGES.length)
        );
        setDiagIndex(msgIdx);

        if (next >= 100) {
          clearInterval(timer);
          try {
            playFoilChime();
          } catch (e) {}

          if (!isStandalone) {
            setTimeout(() => {
              setIsExiting(true);
              setTimeout(() => {
                if (onFinish) onFinish();
              }, 850);
            }, 400);
          }
          return 100;
        }
        return next;
      });
    }, 45);

    return () => clearInterval(timer);
  }, [onFinish, isStandalone, playFoilChime]);

  const handleSkip = () => {
    playTactileClick();
    setIsExiting(true);
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 400);
  };

  return (
    <div className={`preloader-overlay ${isExiting ? 'preloader-exit' : ''}`}>
      <canvas ref={canvasRef} className="preloader-canvas" />

      {/* Laser Scanner Light Sweep */}
      <div className="preloader-laser-sweep" />

      {/* Top Status Header */}
      <div className="preloader-top-bar">
        <div className="preloader-brand-label">
          <span className="preloader-dot-pulse" />
          <span>§ 𝐔 𝐊 𝐈 𝐈 • ATELIER ÉDITORIAL</span>
        </div>
        <div className="preloader-top-actions">
          <span className="preloader-sys-info">CYCLE 2026 // TOKYO — ZURICH</span>
          {!isStandalone && (
            <button onClick={handleSkip} className="preloader-skip-btn">
              <span>SKIP INTRO</span>
              <i className="bi bi-arrow-right" />
            </button>
          )}
        </div>
      </div>

      {/* Center Animated Stage */}
      <div className="preloader-center-stage">
        <div className="preloader-geometry-core">
          {/* Animated SVG Concentric Orbital Rings */}
          <svg className="preloader-svg-rings" viewBox="0 0 240 240">
            <circle
              className="ring-orbital ring-1"
              cx="120"
              cy="120"
              r="105"
              fill="none"
              stroke="rgba(0, 229, 255, 0.25)"
              strokeWidth="1"
              strokeDasharray="4 8"
            />
            <circle
              className="ring-orbital ring-2"
              cx="120"
              cy="120"
              r="85"
              fill="none"
              stroke="rgba(255,255,255,0.4)"
              strokeWidth="1.5"
              strokeDasharray="14 12 4 12"
            />
            <circle
              className="ring-orbital ring-3"
              cx="120"
              cy="120"
              r="65"
              fill="none"
              stroke="rgba(0, 229, 255, 0.2)"
              strokeWidth="1"
              strokeDasharray="30 20"
            />
            <circle
              className="ring-orbital ring-4"
              cx="120"
              cy="120"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.5)"
              strokeWidth="1"
              strokeDasharray="6 6"
            />
          </svg>

          {/* Glowing Center Brand Emblem */}
          <div className="preloader-emblem-container">
            <img
              src="/assets/logo/logo-white-lines.png"
              alt="§ 𝐔 𝐊 𝐈 𝐈 Emblem"
              className="preloader-emblem-graphic"
            />
            <div className="preloader-glow-aura" />
          </div>
        </div>

        {/* Dynamic Typography Word Glitch */}
        <div className="preloader-word-cycler">
          <span className="preloader-word-active">
            {WORDS_CYCLE[wordIndex]}
          </span>
        </div>

        <h1 className="preloader-brand-main">§ 𝐔 𝐊 𝐈 𝐈</h1>
        <p className="preloader-tagline-sub">Haute-Couture Book Architecture & Materiality</p>
      </div>

      {/* Bottom Loading Progress & Diagnostic Log */}
      <div className="preloader-bottom-bar">
        <div className="preloader-progress-info">
          <div className="preloader-diag-log">
            <span className="diag-prefix">[ATELIER-BOOT]</span>
            <span className="diag-text">{DIAGNOSTIC_MESSAGES[diagIndex]}</span>
          </div>
          <div className="preloader-counter-display">
            <span className="counter-num">{String(progress).padStart(2, '0')}</span>
            <span className="counter-percent">%</span>
          </div>
        </div>

        <div className="preloader-progress-track">
          <div
            className="preloader-progress-fill"
            style={{ width: `${progress}%` }}
          />
          <div
            className="preloader-progress-glow"
            style={{ left: `${progress}%` }}
          />
        </div>

        <div className="preloader-micro-grid">
          <span>PRESS SPEC: ISO-12647-2</span>
          <span>SUBSTRATE: 180GSM POP'SET NOIR</span>
          <span>KERNING: BESPOKE SWISS MODULE</span>
        </div>
      </div>

      {/* Dual Curtain Split Wipe Panels */}
      <div className="preloader-curtain curtain-top" />
      <div className="preloader-curtain curtain-bottom" />
    </div>
  );
}
