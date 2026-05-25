import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowBigUp, ArrowBigDown, ExternalLink, MessageSquare } from 'lucide-react';
import FeedbackPopup from './FeedbackPopup';
import { getYoutubeThumbnail, fetchPlaylistThumbnail } from '../utils/youtubeViewer';
import './ResourceCard.css';

const ResourceCard = ({ resource, viewMode, onUpvote, onDownvote }) => {
  const [thumbnailUrl, setThumbnailUrl] = useState(resource.thumbnail || null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!resource.thumbnail && resource.url) {
      if (resource.url.includes('playlist?list=')) {
        fetchPlaylistThumbnail(resource.url).then(url => {
          if (url) setThumbnailUrl(url);
        });
      } else {
        const url = getYoutubeThumbnail(resource.url);
        if (url) setThumbnailUrl(url);
      }
    }
  }, [resource.url, resource.thumbnail]);

  // Use a custom aesthetic fallback if the thumbnail is null and it's a known youtube link
  const displayThumbnail = thumbnailUrl || (
      resource.url && resource.url.includes('youtube') 
        ? '/fallback_thumbnail.png' 
        : null
  );

  const handleVote = (e, type) => {
    e.preventDefault();
    if (!localStorage.getItem('token')) {
      alert("Please login first to upvote or downvote resources.");
      navigate('/login');
      return;
    }
    if (type === 'up') onUpvote(resource.id);
    else onDownvote(resource.id);
  };

  const [showFeedback, setShowFeedback] = useState(false);
  const [targetUrl, setTargetUrl] = useState(null);

  const openFeedback = (url) => {
    setTargetUrl(url);
    setShowFeedback(true);
  };

  const closeFeedback = () => {
    setShowFeedback(false);
    setTargetUrl(null);
  };

  return (
    <div className={`resource-card glass-panel ${viewMode === 'grid' ? 'grid-mode' : ''}`}>
      {/* Voting Sidebar */}
      <div className="vote-sidebar">
        <button 
          className={`btn vote-btn ${resource.userVote === 1 ? 'upvoted' : ''}`}
          onClick={(e) => handleVote(e, 'up')}
        >
          <ArrowBigUp size={24} />
        </button>
        <span className={`vote-count ${resource.userVote === 1 ? 'upvoted' : resource.userVote === -1 ? 'downvoted' : ''}`}>
          {resource.votes}
        </span>
        <button 
          className={`btn vote-btn ${resource.userVote === -1 ? 'downvoted' : ''}`}
          onClick={(e) => handleVote(e, 'down')}
        >
          <ArrowBigDown size={24} />
        </button>
      </div>

      {/* Main Content */}
      <div className="resource-content">
        <div className="resource-meta">
          <span className="resource-tag text-accent">{resource.tag}</span>
          <span className="resource-time">• {resource.timeAgo}</span>
        </div>
        
        <h3 className="resource-title">{resource.title}</h3>

        {/* Thumbnail Preview if applicable */}
        {displayThumbnail && (
          <div className="resource-thumbnail">
            <a href={resource.url} target="_blank" rel="noopener noreferrer">
              <img src={displayThumbnail} alt="Resource thumbnail" />
            </a>
          </div>
        )}

        <div className="resource-actions">
          <button onClick={() => openFeedback(resource.url)} className="action-btn">
            <ExternalLink size={16} /> Open Resource
          </button>
          <button className="btn action-btn">
            <MessageSquare size={16} /> {resource.comments} Comments
          </button>
        </div>
      </div>
      {showFeedback && (
        <FeedbackPopup url={targetUrl} onClose={closeFeedback} />
      )}
    </div>
  );
};

export default ResourceCard;
