import React, { useState, useMemo, useEffect } from 'react';
import ScrollReveal from '../components/ScrollReveal';
import GalleryGrid from '../components/GalleryGrid';
import Lightbox from '../components/Lightbox';
import { GALLERY_ITEMS } from '../data/gallery';

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState(null);

  useEffect(() => {
    document.title = 'Artistic Gallery & Craftsmanship — § 𝐔 𝐊 𝐈 𝐈';
  }, []);

  const categories = useMemo(() => {
    const cats = ['All'];
    GALLERY_ITEMS.forEach((item) => {
      if (item.cat && !cats.includes(item.cat)) {
        cats.push(item.cat);
      }
    });
    return cats;
  }, []);

  const filteredItems = useMemo(() => {
    if (activeCategory === 'All') return GALLERY_ITEMS;
    return GALLERY_ITEMS.filter((item) => item.cat === activeCategory);
  }, [activeCategory]);

  const handleOpenLightbox = (index) => {
    setLightboxIndex(index);
  };

  const handleCloseLightbox = () => {
    setLightboxIndex(null);
  };

  const handlePrevLightbox = () => {
    setLightboxIndex((prev) => (prev > 0 ? prev - 1 : filteredItems.length - 1));
  };

  const handleNextLightbox = () => {
    setLightboxIndex((prev) => (prev < filteredItems.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="gallery-page">
      {/* --- PAGE HEADER --- */}
      <section className="page-header-editorial">
        <div className="container">
          <ScrollReveal>
            <span className="editorial-meta-tag">MATERIALITY & CRAFT</span>
            <h1 className="page-title-editorial">
              VISUAL <span className="font-editorial">Gallery</span>
            </h1>
            <p className="page-subtitle-editorial">
              An intimate look at hot-stamped foils, Japanese linen bindings, typographic spreads, and print details.
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* --- CATEGORY TABS --- */}
      <section className="filter-section">
        <div className="container">
          <div className="filter-bar">
            <div className="filter-tabs">
              {categories.map((cat) => {
                const count =
                  cat === 'All'
                    ? GALLERY_ITEMS.length
                    : GALLERY_ITEMS.filter((i) => i.cat === cat).length;
                const isActive = activeCategory === cat;

                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`filter-tab-btn ${isActive ? 'active' : ''}`}
                  >
                    <span>{cat.toUpperCase()}</span>
                    <span className="tab-count">{count}</span>
                  </button>
                );
              })}
            </div>

            <div className="filter-summary">
              <span>{filteredItems.length} ARTIFACTS</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- GALLERY GRID --- */}
      <section className="gallery-grid-section section-pad">
        <div className="container">
          <GalleryGrid items={filteredItems} onOpenLightbox={handleOpenLightbox} />
        </div>
      </section>

      {/* --- LIGHTBOX MODAL --- */}
      {lightboxIndex !== null && (
        <Lightbox
          items={filteredItems}
          currentIndex={lightboxIndex}
          onClose={handleCloseLightbox}
          onPrev={handlePrevLightbox}
          onNext={handleNextLightbox}
        />
      )}
    </div>
  );
}
