import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LoadingScreen from './components/LoadingScreen';
import ScrollProgress from './components/ScrollProgress';
import CustomCursor from './components/CustomCursor';
import ScrollToTop from './components/ScrollToTop';

import { useTheme } from './hooks/useTheme';
import { useAudioFeedback } from './hooks/useAudioFeedback';

import Home from './pages/Home';
import About from './pages/About';
import Books from './pages/Books';
import BookDetails from './pages/BookDetails';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Contact from './pages/Contact';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { soundEnabled, toggleSound } = useAudioFeedback();

  return (
    <BrowserRouter>
      {/* Reset Scroll position on route transition */}
      <ScrollToTop />

      {/* Initial Animated Preloader */}
      {isLoading && <LoadingScreen onFinish={() => setIsLoading(false)} />}

      {/* Luxury Custom Cursor on Desktop */}
      <CustomCursor />

      {/* Scroll Progress Bar */}
      <ScrollProgress />

      {/* Global Application Frame */}
      <div className="app-layout-wrapper">
        {/* Editorial Navigation Bar */}
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
        />

        {/* Main Content Router */}
        <main id="main-content" className="main-content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/books" element={<Books />} />
            <Route path="/books/:id" element={<BookDetails />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>

        {/* Minimalist Editorial Footer */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}
