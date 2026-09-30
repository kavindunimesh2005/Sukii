import React, { useEffect, useRef } from 'react';

export default function PageTransition({ children }) {
  const containerRef = useRef(null);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.classList.remove('page-transition-enter-active');
      void containerRef.current.offsetWidth; // Trigger reflow
      containerRef.current.classList.add('page-transition-enter-active');
    }
  }, [children]);

  return (
    <div ref={containerRef} className="page-transition-wrapper">
      {children}
    </div>
  );
}
