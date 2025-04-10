import { useEffect, useRef, useState } from 'react';

const DarkSpotEffect = () => {
  const [position, setPosition] = useState({ x: -100, y: -100 }); // начальное положение за экраном
  const size = 50; // размер пятна

  useEffect(() => {
    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        top: position.y - size / 2,
        left: position.x - size / 2,
        width: size,
        height: size,
        backgroundColor: 'rgba(19, 47, 73, 0.1',
        borderRadius: '50%',
        filter: 'blur(20px)',
        pointerEvents: 'none',
        zIndex: 9999,
        transition: 'top 0.02s, left 0.02s',
      }}
    />
  );
};

export default DarkSpotEffect;