'use client';

import { useState } from 'react';
import { Text, Paper } from '@mantine/core';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface PrizePopupProps {
  readonly isWinner: boolean;
  readonly coupon?: string | null;
  readonly onClose?: () => void;
}

// --- SVG Icons for better visuals ---
const IconClipboard = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1"></rect>
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
  </svg>
);
const IconCheck = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

// --- THE COMPONENT ---
export default function PrizePopup({
  isWinner,
  coupon,
  onClose,
}: PrizePopupProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (coupon) {
      // Use the Clipboard API for modern browsers
      navigator.clipboard.writeText(coupon).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
      });
    }
  };

  const popupTitle = isWinner ? 'Congratulations!' : 'Better Luck Next Time!';
  const popupMessage = isWinner
    ? "You've won! Here is your exclusive coupon code. Use it at checkout to claim your prize."
    : "While you didn't win this time, another chance is just around the corner. Stay tuned for our next event!";
  const imageSrc = isWinner ? '/Emoji1.png' : '/Emoji2.png';

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="bg-opacity-70 inset-0 z-50 flex items-center justify-center"
      >
        <motion.div
          initial={{ y: 20, scale: 0.95, opacity: 0 }}
          animate={{ y: 0, scale: 1, opacity: 1 }}
          exit={{ y: 20, scale: 0.95, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="relative w-full max-w-sm"
          onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside the modal
        >
          <Paper
            bg={'transparent'}
            p="xl"
            radius="lg"
            className="overflow-hidden text-center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1], rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Image
                src={imageSrc}
                alt={isWinner ? 'Happy Emoji' : 'Sad Emoji'}
                width={120}
                height={120}
                priority
                className="mx-auto mb-4"
              />
            </motion.div>

            <h2 className="text-2xl font-bold text-gray-800">{popupTitle}</h2>
            <Text c="dimmed" size="sm" my="md">
              {popupMessage}
            </Text>

            {isWinner && coupon && (
              <div className="mt-4">
                <Text size="xs" c="dimmed" tt="uppercase" fw={700}>
                  Your Coupon Code
                </Text>
                <div
                  className="mt-2 flex cursor-pointer items-center justify-between gap-2 rounded-lg border-2 border-dashed border-gray-300 bg-gray-100 p-3"
                  onClick={handleCopy}
                >
                  <Text ff="monospace" fw={700} fz="lg" c="blue.6">
                    {coupon}
                  </Text>
                  <AnimatePresence mode="wait">
                    {copied ? (
                      <motion.div
                        key="check"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="text-green-500"
                      >
                        <IconCheck />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="clipboard"
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        className="text-gray-500"
                      >
                        <IconClipboard />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`mt-6 w-full rounded-lg px-4 py-2 font-bold text-white transition-colors ${
                isWinner
                  ? 'bg-primary-500 hover:bg-bg-primary-700'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`}
              onClick={onClose}
            >
              {isWinner ? 'Awesome!' : 'Try Again With New Email'}
            </motion.button>
          </Paper>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
