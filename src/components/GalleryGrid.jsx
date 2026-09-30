import React from 'react';

export default function GalleryGrid({ items, onSelect }) {
  return (
    <div className="gallery-grid">
      {items.map((item, index) => (
        <div
          key={item.id}
          className={`gallery-card ${item.aspect || ''} reveal-fade revealed`}
          style={{ transitionDelay: `${(index % 6) * 0.08}s` }}
          onClick={() => onSelect(index)}
        >
          <img
            src={item.src}
            alt={item.title}
            className="gallery-card-img"
            loading="lazy"
          />
          <div className="gallery-card-overlay">
            <span className="gallery-card-tag">{item.cat}</span>
            <h4 className="gallery-card-title">{item.title}</h4>
            <p className="font-mono text-muted mb-0" style={{ fontSize: '0.72rem' }}>
              {item.dim}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
