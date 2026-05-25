import React from 'react';
import DotDistortion from '../components/DotDistortion';

const Home = ({ resources, filter, viewMode, onUpvote, onDownvote }) => {
  return (
    <>
      <div style={{ position: 'relative', overflow: 'hidden', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <DotDistortion />
        <div style={{ textAlign: 'center', padding: '3rem 1rem', position: 'relative', zIndex: 10, pointerEvents: 'none' }}>
          <h1 style={{ color: 'var(--text-primary)', marginBottom: '1rem', fontSize: '3.5rem', fontWeight: 800, letterSpacing: '-1px' }}>
            CS <span style={{ color: 'var(--accent)' }}>Axis</span>
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto', pointerEvents: 'auto' }}>
            One stop for all quality tech resources. Discover, share, and vote on the best content across DSA, Development, and GATE. Explore the roadmaps to get started.
          </p>
        </div>
      </div>
    </>
  );
};

export default Home;
