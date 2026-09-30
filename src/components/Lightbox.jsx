import React, { useEffect } from 'react';

export default function Lightbox({ items, activeIndex, onClose, onNext, onPrev }) {
  const currentItem = items[activeIndex];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  if (!currentItem) return null;

  return (
    <div
      className="editorial-lightbox active"
      onClick={(e) => {
        if (e.target.classList.contains('editorial-lightbox')) {
          onClose();
        }
      }}
    >
      <div className="lightbox-content-box">
        <button
          className="lightbox-btn lightbox-close"
          onClick={onClose}
          title="Close (Esc)"
        >
          <i className="bi bi-x-lg" />
        </button>
        <button
          className="lightbox-btn lightbox-prev"
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          title="Previous (Left Arrow)"
        >
          <i className="bi bi-chevron-left" />
        </button>
        <img
          src={currentItem.src}
          alt={currentItem.title}
          className="lightbox-img"
        />
        <button
          className="lightbox-btn lightbox-next"
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          title="Next (Right Arrow)"
        >
          <i className="bi bi-chevron-right" />
        </button>
        <div className="lightbox-caption">
          <h3 className="lightbox-caption-title">{currentItem.title}</h3>
          <p className="lightbox-caption-sub">
            {currentItem.cat} — {currentItem.dim}
          </p>
        </div>
      </div>
    </div>
  );
}
