'use client';

import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function ConfettiEffect() {
  const [confetti, setConfetti] = useState<
    Array<{ id: number; x: number; color: string; delay: number }>
  >([]);

  useEffect(() => {
    const colors = [
      '#ff6b6b',
      '#4ecdc4',
      '#45b7d1',
      '#96ceb4',
      '#ffeaa7',
      '#dda0dd',
      '#98d8c8',
    ];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: colors[Math.floor(Math.random() * colors.length)],
      delay: Math.random() * 2,
    }));
    setConfetti(newConfetti);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-40">
      {confetti.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute h-3 w-3 rounded"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: '-10px',
          }}
          initial={{ y: -10, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            opacity: 0,
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: 'easeOut',
          }}
        />
      ))}
    </div>
  );
}
