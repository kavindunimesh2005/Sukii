import { useEffect, useRef } from 'react';

export function useScrollReveal(options = { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current || document;
    const elements = container.querySelectorAll('.reveal-fade');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
      observer.disconnect();
    };
  }, []);

  return containerRef;
}
