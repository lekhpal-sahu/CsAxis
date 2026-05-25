import React, { useState } from 'react';
import { Star } from 'lucide-react';
import './FeedbackPopup.css';

const FeedbackPopup = ({ url, onClose }) => {
  const [rating, setRating] = useState(0);

  const handleRate = (value) => {
    setRating(value);
    // UI-only: no backend. Redirect to resource in new tab.
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    if (onClose) onClose();
  };

  const handleSkip = () => {
    if (url) window.open(url, '_blank', 'noopener,noreferrer');
    if (onClose) onClose();
  };

  return (
    <div className="fp-overlay">
      <div className="fp-popup glass-panel">
        <div className="fp-header">
          <h3>Quick Feedback</h3>
          <button className="fp-skip" onClick={handleSkip}>Skip</button>
        </div>

        <div className="fp-body">
          <p className="fp-question">Was this resource helpful?</p>
          <div className="fp-stars">
            {[1,2,3,4,5].map((i) => (
              <button key={i} className={`fp-star ${i <= rating ? 'filled' : ''}`} onClick={() => handleRate(i)} aria-label={`Rate ${i}`}>
                <Star size={28} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeedbackPopup;
