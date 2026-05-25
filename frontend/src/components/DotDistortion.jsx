import React, { useRef, useEffect } from 'react';

const DotDistortion = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width, height;
    
    let dots = [];
    const spacing = 25; // Distance between dots
    const radius = 2;   // Size of dot
    
    let mouse = { x: -1000, y: -1000 };
    
    const handleResize = () => {
      width = canvas.parentElement.clientWidth;
      height = canvas.parentElement.clientHeight || 400;
      canvas.width = width;
      canvas.height = height;
      initDots();
    };

    const initDots = () => {
      dots = [];
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);
      for (let i = 0; i <= cols; i++) {
        for (let j = 0; j <= rows; j++) {
          dots.push({
            originX: i * spacing,
            originY: j * spacing,
            x: i * spacing,
            y: j * spacing,
          });
        }
      }
    };

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      const theme = document.body.classList.contains('light-mode') ? 'light' : 'dark';
      ctx.fillStyle = theme === 'light' ? 'rgba(0, 0, 0, 0.2)' : 'rgba(255, 255, 255, 0.15)';
      
      for (let i = 0; i < dots.length; i++) {
        let dot = dots[i];
        
        let dx = mouse.x - dot.originX;
        let dy = mouse.y - dot.originY;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        // Repulsion logic
        let pushRadius = 120;
        let targetX = dot.originX;
        let targetY = dot.originY;
        
        if (distance < pushRadius) {
          let force = (pushRadius - distance) / pushRadius;
          targetX = dot.originX - (dx * force);
          targetY = dot.originY - (dy * force);
        }
        
        // Return to origin easing
        dot.x += (targetX - dot.x) * 0.1;
        dot.y += (targetY - dot.y) * 0.1;
        
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.closePath();
      }
      
      requestAnimationFrame(draw);
    };

    window.addEventListener('resize', handleResize);
    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    
    handleResize();
    let animationId = requestAnimationFrame(draw);

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      style={{ 
        position: 'absolute', 
        top: 0, 
        left: 0, 
        width: '100%', 
        height: '100%', 
        zIndex: 0,
        pointerEvents: 'auto'
      }} 
    />
  );
};

export default DotDistortion;
