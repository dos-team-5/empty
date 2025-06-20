'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getCampaign } from '../actions/getCampaign';
import { SpinnerCampaign } from '@/schema';
// The import for getCampaign is removed to make this component self-contained for demonstration.
// In a real application, you would replace the mocked data with your actual data fetching logic.

// --- TYPE DEFINITIONS ---
export interface SpinnerPrize {
  id: string;
  label: string;
  ratio: number;
}

interface SpinWheelProps {
  campaignId: number; // Pass the ID of the campaign to fetch
  isSpinning: boolean;
  onSpinComplete: (prize: SpinnerPrize) => void; // Callback now returns the winning prize
}

export default function SpinWheel({
  campaignId,
  isSpinning,
  onSpinComplete,
}: SpinWheelProps) {
  const [rotation, setRotation] = useState(0);
  const [prizes, setPrizes] = useState<SpinnerPrize[]>([]);

  // --- MOCKED DATA FETCHING ---
  // In a real app, you would fetch this from your server action.
  const fetchPrizes = useCallback(async () => {
    const campaign = await getCampaign(campaignId);
    if (!campaign.success) {
      console.error('Failed to fetch campaign:', campaign.message);
      return;
    }
    const { options } = campaign.data as SpinnerCampaign;
    setPrizes(options);
  }, [campaignId]);

  useEffect(() => {
    fetchPrizes();
  }, []);

  // --- SPINNING LOGIC WITH WEIGHTED SELECTION ---
  useEffect(() => {
    // This effect should only run when isSpinning becomes true.
    if (isSpinning && prizes.length > 0) {
      // 1. Determine winning prize using a weighted algorithm
      const totalRatio = prizes.reduce(
        (sum, prize) => sum + (prize.ratio || 0),
        0
      );
      let randomValue = Math.random() * totalRatio;
      let winningPrize: SpinnerPrize | null = null;
      let winningIndex = -1;

      for (let i = 0; i < prizes.length; i++) {
        randomValue -= prizes[i].ratio || 0;
        if (randomValue <= 0) {
          winningPrize = prizes[i];
          winningIndex = i;
          break;
        }
      }

      // Fallback in case of floating point inaccuracies
      if (!winningPrize) {
        winningPrize = prizes[prizes.length - 1];
        winningIndex = prizes.length - 1;
      }

      // 2. Calculate rotation to land on the winning segment
      const segmentAngle = 360 / prizes.length;
      const targetSegmentCenter =
        winningIndex * segmentAngle + segmentAngle / 2;

      const jitter = (Math.random() - 0.5) * (segmentAngle * 0.8);
      const targetAngle = targetSegmentCenter + jitter;

      const baseSpins = 4; // Number of full rotations
      const finalRotation = baseSpins * 360 + (360 - targetAngle);

      // Make the rotation cumulative to ensure it always spins forward
      const newRotation = rotation - (rotation % 360) + finalRotation;
      setRotation(newRotation);

      // 3. Trigger the onSpinComplete callback after animation
      const animationDuration = 3000; // Must match the transition duration
      const timer = setTimeout(() => {
        if (winningPrize) {
          onSpinComplete(winningPrize);
        }
      }, animationDuration);

      return () => clearTimeout(timer);
    }
    // By removing 'rotation' and 'onSpinComplete' from the dependency array, we ensure this effect
    // only runs when 'isSpinning' changes to true, preventing the infinite loop.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSpinning, prizes]);

  if (prizes.length === 0) {
    return (
      <div className="text-xl font-bold text-white capitalize">
        Loading prizes...
      </div>
    );
  }

  const segmentAngle = 360 / prizes.length;

  return (
    <div className="relative">
      <motion.div
        className="relative flex h-80 w-80 items-center justify-center 2xl:mt-48"
        animate={{ rotate: rotation }}
        transition={{ duration: 3, ease: 'easeOut' }} // Duration is 3 seconds
      >
        <svg
          width="320"
          height="320"
          className="absolute inset-0 md:scale-[1.2] xl:scale-[1.5] 2xl:scale-[2]"
        >
          <defs>
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="160"
            cy="160"
            r="150"
            fill="#FF6FDF"
            stroke="#F200B9"
            strokeWidth="4"
            filter="url(#glow)"
          />
          {Array.from({ length: 20 }).map((_, i) => {
            const angle = i * 18 * (Math.PI / 180);
            const x = 160 + 135 * Math.cos(angle);
            const y = 160 + 135 * Math.sin(angle);
            return <circle key={i} cx={x} cy={y} r="8" fill="white" />;
          })}
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
            const pathData = `M 160 160 L ${x1} ${y1} A 120 120 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

            return (
              <g key={prize.id}>
                <path
                  d={pathData}
                  fill={index % 2 === 0 ? '#FF6FDF' : 'white'}
                  stroke="#F200B9"
                  strokeWidth="2"
                />
                <text
                  x={150 + 75 * Math.cos((startAngleRad + endAngleRad) / 2)}
                  y={160 + 80 * Math.sin((startAngleRad + endAngleRad) / 2)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={index % 2 === 0 ? 'white' : '#FF6FDF'}
                  fontSize="10"
                  fontWeight="bold"
                  transform={`rotate(${(startAngle + endAngle) / 2 + 0}, ${
                    160 + 80 * Math.cos((startAngleRad + endAngleRad) / 2)
                  }, ${
                    160 + 80 * Math.sin((startAngleRad + endAngleRad) / 2)
                  })`}
                >
                  {prize.label}
                </text>
              </g>
            );
          })}
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
    </div>
  );
}
