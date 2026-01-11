
import React, { useEffect, useRef } from 'react';

interface AntiGravityTextProps {
  isLight: boolean;
}

export const AntiGravityText: React.FC<AntiGravityTextProps> = ({ isLight }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let particles: any[] = [];
    const text = "ADITYA PAWAR";
    const mouse = { x: -1000, y: -1000, radius: 150 };

    const init = () => {
      canvas.width = containerRef.current!.clientWidth;
      canvas.height = containerRef.current!.clientHeight;
      
      ctx.fillStyle = 'white';
      const fontSize = Math.min(canvas.width / 7, 180);
      ctx.font = `900 ${fontSize}px Inter`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, canvas.width / 2, canvas.height / 2);
      
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles = [];
      const step = canvas.width < 768 ? 6 : 4;
      for (let y = 0; y < data.height; y += step) {
        for (let x = 0; x < data.width; x += step) {
          const index = (y * data.width + x) * 4;
          if (data.data[index + 3] > 128) {
            particles.push({
              x: x,
              y: y,
              baseX: x,
              baseY: y,
              size: canvas.width < 768 ? 2 : 2.5,
              density: (Math.random() * 40) + 1,
              vx: 0,
              vy: 0
            });
          }
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const color = isLight ? 'rgba(0, 0, 0, 0.9)' : 'rgba(255, 255, 255, 1)';
      
      for (let i = 0; i < particles.length; i++) {
        let p = particles[i];
        
        let dx = mouse.x - p.x;
        let dy = mouse.y - p.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        let maxDistance = mouse.radius;
        let force = (maxDistance - distance) / maxDistance;
        let directionX = forceDirectionX * force * p.density;
        let directionY = forceDirectionY * force * p.density;

        if (distance < mouse.radius) {
          p.x -= directionX;
          p.y -= directionY;
        } else {
          if (p.x !== p.baseX) {
            let dx = p.x - p.baseX;
            p.x -= dx / 12;
          }
          if (p.y !== p.baseY) {
            let dy = p.y - p.baseY;
            p.y -= dy / 12;
          }
        }

        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }
      requestAnimationFrame(animate);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    init();
    animate();
    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', init);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', init);
    };
  }, [isLight]);

  return (
    <div ref={containerRef} className="w-full h-64 md:h-[450px] relative flex items-center justify-center pointer-events-auto overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full" />
    </div>
  );
};
