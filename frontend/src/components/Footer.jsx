import React from 'react';
import { Hexagon, } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  const navigate = useNavigate();

  const handleSubmissionClick = (e) => {
    if (!localStorage.getItem('token')) {
      e.preventDefault();
      alert("Please login first to submit a resource.");
      navigate('/login');
    }
  };

  return (
    <footer className="footer-container glass-panel" style={{ padding: '0.5rem 0' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', padding: '0 1.5rem', margin: '0 auto', flexWrap: 'wrap', gap: '1rem' }}>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          &copy; {new Date().getFullYear()} CS Axis. All rights reserved.
        </p>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: 0 }}>
          For submissions email us at : <a href="https://mail.google.com/mail/?view=cm&fs=1&to=csaxis7@gmail.com&su=Resource%20Submission" target="_blank" rel="noopener noreferrer" onClick={handleSubmissionClick} style={{ color: 'var(--accent)', fontWeight: 'bold', textDecoration: 'none' }}>csaxis7@gmail.com</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
