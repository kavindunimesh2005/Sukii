import React, { useState, useRef, useEffect } from 'react';
import { useAudioFeedback } from '../hooks/useAudioFeedback';

const CHAPTERS = [
  {
    id: 'c1',
    time: '00:01',
    title: '01 // THE BRASS DIE & LETTERPRESS',
    desc: 'Precision chiseled 0.4mm brass dies heated to 140°C for foil debossing.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-hands-holding-and-leafing-through-a-book-42416-large.mp4',
    poster: '/assets/images/editorial-spread-1.jpg'
  },
  {
    id: 'c2',
    time: '00:02',
    title: '02 // JAPANESE BUCKRAM BINDING',
    desc: 'Raw woven buckram cloth stretched over 3.5mm Scandinavian millboard.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-turning-the-pages-of-a-book-in-the-dark-42417-large.mp4',
    poster: '/assets/images/book-binding-craft.jpg'
  },
  {
    id: 'c3',
    time: '00:03',
    title: '03 // SMYTH SEWN THREAD FINISHING',
    desc: 'Archival unbleached cotton threads bound through 16-page signatures for flat opening.',
    videoSrc: 'https://assets.mixkit.co/videos/preview/mixkit-leafing-through-a-vintage-book-42418-large.mp4',
    poster: '/assets/images/editorial-spread-2.jpg'
  }
];

export default function CinematicFilmReel() {
  const [activeChapter, setActiveChapter] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [timecode, setTimecode] = useState('00:01:24:08');
  const videoRef = useRef(null);
  const { playTactileClick, playFoilChime } = useAudioFeedback();

  const chapter = CHAPTERS[activeChapter];

  // Dynamic Timecode Generator
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const m = String(now.getMinutes()).padStart(2, '0');
      const s = String(now.getSeconds()).padStart(2, '0');
      const ms = String(Math.floor(now.getMilliseconds() / 10)).padStart(2, '0');
      setTimecode(`00:${m}:${s}:${ms}`);
    }, 40);
    return () => clearInterval(timer);
  }, []);

  const togglePlay = () => {
    playTactileClick();
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    playTactileClick();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  const selectChapter = (idx) => {
    playFoilChime();
    setActiveChapter(idx);
    if (videoRef.current) {
      videoRef.current.src = CHAPTERS[idx].videoSrc;
      videoRef.current.play();
      setIsPlaying(true);
    }
  };

  return (
    <section className="cinematic-showreel-section section-pad">
      <div className="container">
        <div className="section-header-editorial">
          <span className="editorial-meta-tag">ATELIER MOTION ARCHIVE // 4K REEL</span>
          <h2 className="section-title-editorial">
            CINEMATIC <span className="font-editorial">Craft Film</span>
          </h2>
          <p className="lab-intro-text">
            Experience the tactile manufacturing ritual: heat-stamped foil dies, buckram folding, and archival smyth sewing in motion.
          </p>
        </div>

        {/* 21:9 Widescreen Film Reel Viewport */}
        <div className="cinematic-film-container">
          {/* Top Cinema HUD Bar */}
          <div className="film-top-hud">
            <div className="hud-rec-indicator">
              <span className="rec-dot" />
              <span>ATELIER REEL // 24 FPS</span>
            </div>
            <div className="hud-timecode">
              <span>TC: {timecode}</span>
            </div>
            <div className="hud-aspect-tag">
              <span>ASPECT: 2.39:1 CINEMASCOPE</span>
            </div>
          </div>

          {/* Video Player */}
          <div className="film-video-wrapper">
            <video
              ref={videoRef}
              src={chapter.videoSrc}
              poster={chapter.poster}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="film-video-element"
            />
            {/* Film Grain & Scratches Texture Overlay */}
            <div className="film-grain-overlay" />
            <div className="film-vignette-overlay" />

            {/* Center Play/Pause Trigger */}
            <button
              onClick={togglePlay}
              className={`film-play-trigger-btn ${!isPlaying ? 'show-always' : ''}`}
              aria-label={isPlaying ? 'Pause Showreel' : 'Play Showreel'}
            >
              <i className={isPlaying ? 'bi bi-pause-fill' : 'bi bi-play-fill'} />
            </button>
          </div>

          {/* Bottom Interactive HUD & Chapter Markers */}
          <div className="film-bottom-hud">
            <div className="film-info-col">
              <h3 className="film-chapter-title">{chapter.title}</h3>
              <p className="film-chapter-desc">{chapter.desc}</p>
            </div>

            <div className="film-controls-col">
              {/* Audio & Playback Toggles */}
              <div className="film-action-btns">
                <button onClick={toggleMute} className="film-icon-btn" title={isMuted ? 'Unmute Audio' : 'Mute Audio'}>
                  <i className={isMuted ? 'bi bi-volume-mute' : 'bi bi-volume-up'} />
                </button>
                <button onClick={togglePlay} className="film-icon-btn" title={isPlaying ? 'Pause' : 'Play'}>
                  <i className={isPlaying ? 'bi bi-pause' : 'bi bi-play'} />
                </button>
              </div>

              {/* Animated Equalizer Waveform */}
              <div className={`audio-waveform-bars ${!isMuted && isPlaying ? 'active' : ''}`}>
                <span className="bar b1" />
                <span className="bar b2" />
                <span className="bar b3" />
                <span className="bar b4" />
                <span className="bar b5" />
              </div>
            </div>
          </div>

          {/* Chapter Selector Timeline Strip */}
          <div className="film-timeline-chapters">
            {CHAPTERS.map((ch, idx) => (
              <button
                key={ch.id}
                onClick={() => selectChapter(idx)}
                className={`timeline-chapter-btn ${idx === activeChapter ? 'active' : ''}`}
              >
                <div className="timeline-prog-bar" />
                <div className="timeline-btn-text">
                  <span className="ch-time">{ch.time}</span>
                  <span className="ch-title">{ch.title.split('//')[1]}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
