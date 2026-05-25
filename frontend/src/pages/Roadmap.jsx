import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ResourceList from '../components/ResourceList';

const Roadmap = ({ resources, viewMode, onUpvote, onDownvote }) => {
  const { topic } = useParams(); // e.g. "dsa-heap"

  // Formatting topic display
  const displayTopic = topic ? topic.replace('-', ' ').toUpperCase() : 'General';

  // In a real app we might fetch specialized roadmap content based on the `topic` 
  
  return (
    <div style={{ padding: '2rem 1rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto 2rem' }}>
        <Link to="/" className="btn action-btn" style={{ marginBottom: '1rem', display: 'inline-flex' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <h1 style={{ color: 'var(--text-primary)', fontSize: '2.5rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Roadmap: <span style={{ color: 'var(--accent)' }}>{displayTopic}</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          A curated path and resources to master {displayTopic}. Start following the resources below to level up!
        </p>
      </div>
      
      <ResourceList 
        resources={resources} 
        filter={topic} 
        viewMode={viewMode}
        onUpvote={onUpvote}
        onDownvote={onDownvote}
      />
    </div>
  );
};

export default Roadmap;
