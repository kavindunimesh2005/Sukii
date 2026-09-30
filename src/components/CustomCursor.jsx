import React, { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let outlineX = mouseX;
    let outlineY = mouseY;
    let animationId;

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
      }
    };

    const animate = () => {
      outlineX += (mouseX - outlineX) * 0.15;
      outlineY += (mouseY - outlineY) * 0.15;
      if (outlineRef.current) {
        outlineRef.current.style.transform = `translate(${outlineX}px, ${outlineY}px)`;
      }
      animationId = requestAnimationFrame(animate);
    };

    const addHover = () => document.body.classList.add('cursor-hover');
    const removeHover = () => document.body.classList.remove('cursor-hover');

    window.addEventListener('mousemove', handleMouseMove);
    animationId = requestAnimationFrame(animate);

    const updateHoverListeners = () => {
      document.querySelectorAll('a, button, .gallery-card, .book-card-editorial, .editorial-service-item, .pill-label, .hero-deck-btn, .inspection-pill-btn')
        .forEach(el => {
          el.addEventListener('mouseenter', addHover);
          el.addEventListener('mouseleave', removeHover);
        });
    };
    updateHoverListeners();

    const interval = setInterval(updateHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
      clearInterval(interval);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="custom-cursor-dot" />
      <div ref={outlineRef} className="custom-cursor-outline" />
    </>
  );
}
