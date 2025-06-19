'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import SpinWheel from './components/SpinWheel';
import UserForm from './components/UserForm';
import ConfettiEffect from './components/ConfettiEffect';

import Image from 'next/image';
import { UnstyledButton } from '@mantine/core';

export interface UserData {
  name: string;
  phoneNumber: string;
  email: string;
}

export interface Prize {
  id: string;
  name: string;
  couponCode: string;
  isWinning: boolean;
}

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [hasSpun, setHasSpun] = useState(false);
  const [spinResult, setSpinResult] = useState<Prize | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  // Generate device ID for tracking
  useEffect(() => {
    const generateDeviceId = () => {
      const deviceId =
        localStorage.getItem('deviceId') ||
        'device_' + Math.random().toString(36).substr(2, 9) + '_' + Date.now();
      localStorage.setItem('deviceId', deviceId);
      return deviceId;
    };

    const deviceId = generateDeviceId();

    // Send device ID to backend for tracking
    fetch('/api/track-visit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ deviceId, timestamp: new Date().toISOString() }),
    }).catch(console.error);
  }, []);

  const handleFormSubmit = async (data: UserData) => {
    setUserData(data);
    setShowForm(false);

    // Store user data in backend
    try {
      await fetch('/api/store-user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          deviceId: localStorage.getItem('deviceId'),
          timestamp: new Date().toISOString(),
        }),
      });

      // Send winning email after form submission
      if (spinResult && spinResult.isWinning) {
        try {
          const emailResponse = await fetch('/api/send-coupon-email', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              userData: data,
              prize: spinResult,
            }),
          });

          if (emailResponse.ok) {
            setEmailSent(true);
            const emailData = await emailResponse.json();
            console.log('Email sent successfully:', emailData);
          }
        } catch (error) {
          console.error('Failed to send email:', error);
        }
      }
    } catch (error) {
      console.error('Failed to store user data:', error);
    }
  };

  const handleSpin = async () => {
    if (hasSpun || isSpinning) return;

    setIsSpinning(true);

    try {
      // Get prizes from backend
      const response = await fetch('/api/get-prizes');
      const prizes = await response.json();

      // Simulate spin delay
      setTimeout(async () => {
        // Determine result (you can implement your own logic here)
        const randomIndex = Math.floor(Math.random() * prizes.length);
        const result = prizes[randomIndex];

        setSpinResult(result);
        setHasSpun(true);
        setIsSpinning(false);

        if (result.isWinning) {
          setShowConfetti(true);
          // Play winning sound (optional - remove if no audio file)
          try {
            const audio = new Audio('/win-sound.mp3');
            audio.play().catch(() => {
              // Silently handle audio errors
              console.log('Audio playback not available');
            });
          } catch (error) {
            // Audio not supported or file not found
            console.log('Audio not supported');
          }

          // Show form for winners only
          // setTimeout(() => {
          //   setShowForm(true);
          // }, 2000); // Show form 2 seconds after winning
        }
        setTimeout(() => {
          setShowForm(true);
        }, 2000); // Show form 2 seconds after winning

        // Hide confetti after 3 seconds
        setTimeout(() => setShowConfetti(false), 3000);
      }, 3000);
    } catch (error) {
      console.error('Spin failed:', error);
      setIsSpinning(false);
    }
  };

  return (
    <div className="flex h-screen max-h-screen items-center justify-center overflow-hidden bg-[url(/Spiner-background.jpg)] bg-cover bg-center bg-no-repeat p-4">
      {/* Background blur when form is shown */}
      <div
        className={`mx-auto flex w-full flex-col items-center justify-center gap-8 transition-all duration-300 md:gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-0 ${
          showForm ? 'blur-sm' : ''
        }`}
      >
        <div className="mx-auto flex w-full flex-col items-center justify-center text-center lg:w-[40%]">
          <Image
            src={'/EMPTY.png'}
            alt="empty-logo"
            width={1000}
            height={1000}
            className="w-56 md:w-96 2xl:w-120"
          />
          <Image
            src={'/Scan-and-Spin.png'}
            alt="title"
            width={1000}
            height={1000}
            className="w-48 md:w-88 2xl:w-112"
          />
          <p className="text-sm text-white md:text-2xl 2xl:text-3xl">
            Try your luck and <br /> win amazing prizes!
          </p>
        </div>

        <div className="flex w-full flex-col items-center lg:w-[55%]">
          <SpinWheel isSpinning={isSpinning} onSpinComplete={() => {}} />

          {!hasSpun && (
            <UnstyledButton
              onClick={handleSpin}
              disabled={isSpinning}
              // className="transform rounded-full bg-gradient-to-r from-pink-500 to-purple-600 px-8 py-4 md:mt-8 text-xl font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-pink-600 hover:to-purple-700 disabled:cursor-not-allowed disabled:opacity-50"
              className="!bg-primary relative w-[150px] rounded border-none !p-4 !text-center !font-bold tracking-wider !text-white uppercase opacity-90 shadow-[0_7px_2px_#FF70DF,0_8px_5px_#fff] transition duration-200 hover:opacity-100 active:top-1 active:shadow-[0_3px_2px_#FF70DF,0_3px_5px_#fff] md:mt-12 xl:mt-24 2xl:mt-48"
            >
              SPIN
            </UnstyledButton>
          )}

          {spinResult && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="max-w-md rounded-lg bg-white p-6 text-center shadow-xl md:mt-8 xl:mt-20 2xl:mt-40"
            >
              {spinResult.isWinning ? (
                <div>
                  <div className="flex items-center justify-center">
                    <Image
                      src={'/Emoji1.png'}
                      alt="happy"
                      width={1000}
                      height={1000}
                      priority
                      className="w-32"
                    />
                    <h2 className="mt-8 mb-2 text-2xl font-bold text-green-600">
                      Congratulations!
                    </h2>
                  </div>
                  <p className="mb-4 text-lg text-gray-700">
                    You Won "{spinResult.name}"!
                  </p>
                  {!showForm && !userData && (
                    <p className="animate-pulse text-sm text-blue-600">
                      Please provide your details to receive your coupon...
                    </p>
                  )}
                  {userData && (
                    <div>
                      <div className="mb-4 rounded-lg border border-pink-200 bg-pink-50 p-4">
                        <p className="text-sm font-semibold text-pink-800">
                          Your Coupon Code:
                        </p>
                        <p className="text-xl font-bold text-pink-600">
                          {spinResult.couponCode}
                        </p>
                      </div>
                      {emailSent ? (
                        <p className="text-sm text-green-600">
                          ✅ Coupon sent to your email!
                        </p>
                      ) : (
                        <p className="text-sm text-gray-500">
                          📧 Sending coupon to your email...
                        </p>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-center">
                    <Image
                      src={'/Emoji2.png'}
                      alt="happy"
                      width={1000}
                      height={1000}
                      priority
                      className="w-32"
                    />
                    <h2 className="mt-8 mb-2 text-2xl font-bold text-red-600">
                      Sorry!
                    </h2>{' '}
                  </div>
                  <p className="text-lg text-gray-700">
                    You didn't win this time.
                  </p>
                  <p className="mt-2 text-sm text-gray-500">
                    Better Luck Next Time!...
                  </p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>

      {/* Form Modal - Only shown for winners */}
      <AnimatePresence>
        {showForm && spinResult?.isWinning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-lg bg-white p-6 lg:scale-90 xl:scale-100"
            >
              <div className="mb-6 flex flex-col items-center justify-center text-center">
                <Image
                  src={'/Emoji1.png'}
                  alt="happy"
                  width={1000}
                  height={1000}
                  priority
                  className="w-32"
                />
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    You're a Winner!
                  </h2>
                  <p className="mb-4 text-gray-600">
                    Where should we send your "{spinResult.name}" coupon?
                  </p>
                </div>
              </div>
              <UserForm onSubmit={handleFormSubmit} spinResult={spinResult} />
            </motion.div>
          </motion.div>
        )}
        {showForm && spinResult?.isWinning === false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md rounded-lg bg-white p-6 lg:scale-90 xl:scale-100"
            >
              <div className="mb-6 flex flex-col items-center justify-center text-center">
                <Image
                  src={'/Emoji2.png'}
                  alt="happy"
                  width={1000}
                  height={1000}
                  priority
                  className="w-32"
                />
                <div>
                  <h2 className="mb-2 text-2xl font-bold text-gray-800">
                    Sorry, you didn't win this round.
                  </h2>
                  <p className="mb-4 text-gray-600">
                    Don't Miss Out on Future Chances to Win! <br /> Sorry, you
                    didn't win this round. But that doesn't mean the fun stops
                    here! Get exclusive access to future promotions and special
                    offers by joining our list.
                  </p>
                </div>
              </div>
              <UserForm onSubmit={handleFormSubmit} spinResult={spinResult} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Confetti Effect */}
      {showConfetti && <ConfettiEffect />}
    </div>
  );
}
