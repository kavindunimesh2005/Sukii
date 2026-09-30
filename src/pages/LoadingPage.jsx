import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import LoadingScreen from '../components/LoadingScreen';

export default function LoadingPage() {
  const [replayKey, setReplayKey] = useState(0);
  const [completed, setCompleted] = useState(false);

  const handleReplay = () => {
    setCompleted(false);
    setReplayKey((prev) => prev + 1);
  };

  return (
    <div className="loading-showcase-page">
      <LoadingScreen
        key={replayKey}
        isStandalone={true}
        onFinish={() => setCompleted(true)}
      />

      {/* Floating Control Toolbar for Testing */}
      <div className="loading-preview-toolbar">
        <button onClick={handleReplay} className="toolbar-replay-btn">
          <i className="bi bi-arrow-repeat" />
          <span>REPLAY PRELOADER</span>
        </button>
        <Link to="/" className="toolbar-home-btn">
          <span>ENTER ATELIER HOME</span>
          <i className="bi bi-arrow-right" />
        </Link>
      </div>
    </div>
  );
}
