'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'motion/react';

interface SpinWheelProps {
  isSpinning: boolean;
  onSpinComplete: () => void;
}

export default function SpinWheel({
  isSpinning,
  onSpinComplete,
}: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [prizes, setPrizes] = useState([
    // 'Free Coffee',
    // '10% Off',
    // 'Free Pastry',
    // 'Try Again',
    // 'Free Drink',
    // 'Better Luck',
    // '20% Off',
    // 'Free Meal',
    // 'Free Milk',
    // 'Free Milk',
    // 'Free Milk',
    // 'Free Milk',
    // 'Free Milk',
    // 'Free Milk',
    // 'Free Milk',
    // 'Free Milk',
    // 'Free Milk',
  ]);

  const fetchPrizes = useCallback(async () => {
    try {
      const response = await fetch('/api/get-prizes');
      const data = await response.json();
      setPrizes(data.map((prize: any) => prize.name));
    } catch (error) {
      console.error('Failed to fetch prizes:', error);
    }
  }, []);

  useEffect(() => {
    fetchPrizes();
  }, [fetchPrizes]);

  useEffect(() => {
    if (isSpinning) {
      const finalRotation = rotation + 1440 + Math.random() * 360; // 4 full rotations + random
      setRotation(finalRotation);

      const timer = setTimeout(() => {
        onSpinComplete();
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [isSpinning]);

  const segmentAngle = 360 / prizes.length;

  return (
    <div className="relative">
      {/* Wheel */}
      <motion.div
        className="relative flex h-80 w-80 2xl:mt-48 items-center justify-center"
        animate={{ rotate: rotation }}
        transition={{ duration: 3, ease: 'easeOut' }}
      >
        <svg
          width="320"
          height="320"
          className="absolute inset-0 md:scale-[1.2] xl:scale-[1.5] 2xl:scale-[2]"
        >
            {/* Outer ring with dots and glow effect */}
            <circle
            cx="160"
            cy="160"
            r="150"
            fill="#FF6FDF"
            stroke="#F200B9"
            strokeWidth="4"
            filter="url(#glow)"
            />
            {/* SVG filter for glow */}
            <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
              <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
            </defs>

          {/* Dots around the border */}
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = i * 18 * (Math.PI / 180);
            const x = 160 + 135 * Math.cos(angle);
            const y = 160 + 135 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="8" fill="white" />;
          })}

          {/* Wheel segments */}
          {prizes.map((prize, index) => {
            const startAngle = index * segmentAngle - 90;
            const endAngle = (index + 1) * segmentAngle - 90;
            const startAngleRad = (startAngle * Math.PI) / 180;
            const endAngleRad = (endAngle * Math.PI) / 180;

            const x1 = 160 + 120 * Math.cos(startAngleRad);
            const y1 = 160 + 120 * Math.sin(startAngleRad);
            const x2 = 160 + 120 * Math.cos(endAngleRad);
            const y2 = 160 + 120 * Math.sin(endAngleRad);

            const largeArcFlag = segmentAngle > 180 ? 1 : 0;

            const pathData = [
              `M 160 160`,
              `L ${x1} ${y1}`,
              `A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2}`,
              'Z',
            ].join(' ');

            return (
              <g key={index}>
                <path
                  d={pathData}
                  fill={index % 2 === 0 ? '#FF6FDF' : 'white'}
                  stroke="#F200B9"
                  strokeWidth="2"
                />
                <text
                  x={160 + 80 * Math.cos((startAngleRad + endAngleRad) / 2)}
                  y={160 + 80 * Math.sin((startAngleRad + endAngleRad) / 2)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={index % 2 === 0 ? 'white' : '#FF6FDF'}
                  fontSize="12"
                  fontWeight="bold"
                  transform={`rotate(${(startAngle + endAngle) / 2 + 0}, ${
                    160 + 80 * Math.cos((startAngleRad + endAngleRad) / 2)
                  }, ${
                    160 + 80 * Math.sin((startAngleRad + endAngleRad) / 2)
                  })`}
                >
                  {prize}
                </text>
              </g>
            );
          })}

          {/* Center circle */}
          <circle
            cx="160"
            cy="160"
            r="20"
            fill="#F200B9"
            stroke="white"
            strokeWidth="4"
          />
        </svg>
      </motion.div>
      {/* <Image
        src={'/Spinner-stand.png'}
        alt=""
        width={1000}
        height={1000}
        className="w-[310px] mt-16"
      /> */}

      {/* Pointer */}
      {/* <div className="absolute top-0 left-1/2 mt-14 2xl:mt-32 2xl:scale-[3.5] xl:mt-0 md:mt-8 scale-[2.4] -translate-x-1/2 -translate-y-2 transform ">
        <div className="h-0 w-0 border-r-4 border-b-8 border-l-4 border-r-transparent border-b-black border-l-transparent"></div>
      </div> */}

      {/* Base */}
      {/* <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-32 h-8 bg-gradient-to-b from-pink-400 to-pink-600 rounded-b-full"></div>
      </div> */}
    </div>
  );
}
