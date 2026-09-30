import React from 'react';

export default function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      className="theme-toggle-btn icon-action-btn"
      onClick={toggleTheme}
      aria-label="Toggle Dark/Light Mode"
      title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
    >
      <i className={theme === 'dark' ? 'bi bi-sun' : 'bi bi-moon-stars'} />
    </button>
  );
}
