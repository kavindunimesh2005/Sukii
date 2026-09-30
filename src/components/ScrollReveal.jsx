import React, { useEffect, useRef } from 'react';

export default function ScrollReveal({ children, className = '', delay = 0 }) {
  const domRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            if (domRef.current) {
              domRef.current.classList.add('revealed');
            }
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -10px 0px' });

    const current = domRef.current;
    if (current) observer.observe(current);

    return () => {
      if (current) observer.unobserve(current);
    };
  }, [delay]);

  return (
    <div ref={domRef} className={`reveal-fade ${className}`}>
      {children}
    </div>
  );
}
