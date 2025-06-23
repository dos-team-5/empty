'use client';
import { useState, useEffect } from 'react';
import SpinWheel, { SpinnerPrize } from './components/SpinWheel';
import ConfettiEffect from './components/ConfettiEffect';

import { ActionIcon, Group, UnstyledButton } from '@mantine/core';
import { modals } from '@mantine/modals';
import { winCheck } from './actions/winCheck';
import PrizePopup from './components/PrizePopup';
import ParticipationForm from './components/ParticipationForm';
import { makeParticipation } from './actions/makeParticipation';
import { notifications } from '@mantine/notifications';
import { claimPrize } from './actions/claimPrize';
import { sendCouponEmail } from './actions/sendCouponMail';
import { Icon } from '@iconify/react/dist/iconify.js';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';
import { useAdBlockDetection } from '@/hooks/useAdBlockDetection';
import { useDisclosure } from '@mantine/hooks';
import { AdBlockerNotice } from './components/Ads';
import Image from 'next/image';

export default function Home() {
  const { isAdBlocked, isLoading } = useAdBlockDetection();
  const { data } = useVisitorData(
    { extendedResult: true },
    { immediate: true }
  );
  const [opened, { open, close }] = useDisclosure(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [participationFormData, setParticipationFormData] = useState({
    name: '',
    phone: '',
    email: '',
    agreeToEmails: false,
  });

  // Generate device ID for tracking
  useEffect(() => {
    const generateDeviceId = () => {
      const deviceId =
        localStorage.getItem('deviceId') ??
        'device_' +
          Math.random().toString(36).substring(2, 9) +
          '_' +
          Date.now();
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

  const handleSpinStart = async () => {
    if (isSpinning) return;
    handleParticipate();
  };

  const handleModalClose = () => {
    modals.closeAll();
  };

  const handleParticipate = async () => {
    modals.open({
      centered: true,
      withCloseButton: false,
      children: (
        <>
          <Group justify="right">
            <ActionIcon onClick={handleModalClose} variant="subtle">
              <Icon icon={'material-symbols:close'} />
            </ActionIcon>
          </Group>
          <ParticipationForm
            onSubmit={async (formVal) => {
              try {
                const res = await makeParticipation({
                  id: 1,
                  formData: {
                    ...formVal,
                    agreeToEmails: formVal.agreeToEmails ?? false,
                    ipAddress: data?.ip ?? '', // ✅ inject IP on submit
                  },
                });
                if (!res.success) {
                  throw new Error(res.message);
                }

                setParticipationFormData({
                  ...formVal,
                  agreeToEmails: formVal.agreeToEmails ?? false,
                });

                setIsSpinning(true);
                setShowConfetti(false);
                modals.closeAll();
              } catch (error) {
                notifications.show({
                  title: 'Error',
                  message:
                    error instanceof Error
                      ? error.message
                      : 'An unexpected error occurred.',
                  color: 'red',
                });
              }
            }}
          />
        </>
      ),
    });
  };

  const handleSpinComplete = async (prize: SpinnerPrize) => {
    setIsSpinning(false);

    const { isWinner } = await winCheck({
      id: 1, // Assuming campaign ID is 1
      prizeId: prize.id,
    });

    if (isWinner) {
      setShowConfetti(true);
    }
    // claim prize
    const claimResult = await claimPrize({
      id: 1, // Assuming campaign ID is 1
      payload: {
        email: participationFormData.email,
        prizeId: prize.id,
      },
    });

    if (!claimResult.success) {
      notifications.show({
        title: 'Error',
        message: claimResult.message,
        color: 'red',
      });
      return;
    }

    // show prize popup and handle participation form
    modals.open({
      withCloseButton: false,
      centered: true,
      classNames: {
        content: 'bg-transparent  border-none',
        body: 'bg-white border-none',
      },
      children: (
        <PrizePopup
          isWinner={isWinner}
          coupon={isWinner ? claimResult.coupon : ''}
          onClose={() => {
            setShowConfetti(false);
            modals.closeAll();
          }}
        />
      ),
    });

    // send email
    if (claimResult.coupon) {
      const res = await sendCouponEmail(
        {
          email: participationFormData.email,
          prizeId: prize.id,
        },
        claimResult.coupon
      );
      console.log('coupon response', res);
    } else {
      console.error('No coupon available');
    }
  };

  useEffect(() => {
    if (!isLoading && isAdBlocked) {
      open();
    }
  }, [isAdBlocked, isLoading, open]);

  console.log('isAdBlocked', isAdBlocked);

  return (
    <div className="flex h-screen max-h-screen items-center justify-center overflow-hidden bg-[url(/spinner-bg.png)] bg-cover bg-center bg-no-repeat p-4">
      {/* Background blur when form is shown */}
      {isAdBlocked && <AdBlockerNotice opened={opened} onClose={close} />}
      {!isAdBlocked && (
        <div
          className={`mx-auto flex w-full flex-col items-center justify-center gap-8 transition-all duration-300 md:gap-16 lg:flex-row lg:items-center lg:justify-between lg:gap-0`}
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
            <SpinWheel
              campaignId={1}
              isSpinning={isSpinning}
              onSpinComplete={handleSpinComplete}
            />

            <UnstyledButton
              onClick={handleSpinStart}
              disabled={isSpinning}
              className="!bg-primary relative w-[150px] rounded border-none !p-4 !text-center !font-bold tracking-wider !text-white uppercase opacity-90 shadow-[0_7px_2px_#FF70DF,0_8px_5px_#fff] transition duration-200 hover:opacity-100 active:top-1 active:shadow-[0_3px_2px_#FF70DF,0_3px_5px_#fff] md:mt-12 xl:mt-24 2xl:mt-48"
            >
              SPIN
            </UnstyledButton>
          </div>
        </div>
      )}

      {/* Confetti Effect */}
      {showConfetti && <ConfettiEffect />}
    </div>
  );
}
