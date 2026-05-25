import React from 'react';
import ResourceCard from './ResourceCard';

const ResourceList = ({ resources, filter, viewMode, onUpvote, onDownvote }) => {
  // Filter resources based on selected tag/category
  // Simple 'includes' or exact match depending on how complex we want to get
  // For now, let's filter if the resource tag matches the prefix or exact value
  const filteredResources = resources.filter(res => {
    if (!filter) return true;
    
    // Match the exact tag (case-insensitive) to ensure correct filtering according to Navbar links
    return res.tag.toLowerCase() === filter.toLowerCase();
  });

  // Sort by highest votes
  const sortedResources = [...filteredResources].sort((a, b) => b.votes - a.votes);

  return (
    <div style={{ maxWidth: '1200px', margin: '2rem auto', width: '100%', padding: '0 1rem' }}>
      {filter && (
        <h2 style={{ marginBottom: '1.5rem', fontSize: '1.2rem', color: 'var(--text-secondary)' }}>
          Showing results for <span style={{ color: 'var(--accent)' }}>{filter.toUpperCase()}</span>
        </h2>
      )}
      
      <div className={`resource-container ${viewMode === 'grid' ? 'grid-view' : ''}`}>
        {sortedResources.length > 0 ? (
          sortedResources.map(resource => (
            <ResourceCard 
              key={resource.id} 
              resource={resource} 
              viewMode={viewMode}
              onUpvote={onUpvote}
              onDownvote={onDownvote}
            />
          ))
        ) : (
        <div className="glass-panel" style={{ padding: '3rem', textAlign: 'center', color: 'var(--text-secondary)' }}>
          <p>No resources found for this category yet! Be the first to submit one.</p>
        </div>
      )}
      </div>
    </div>
  );
};

export default ResourceList;
