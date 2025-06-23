'use client';

import { useEffect } from 'react';
import { AdBlockerNotice } from './components/Ads';
import { useAdBlockDetection } from '@/hooks/useAdBlockDetection';
import { useDisclosure } from '@mantine/hooks';

export default function ScanSpinLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { isAdBlocked, isLoading } = useAdBlockDetection();
  const [opened, { open, close }] = useDisclosure(false);

  useEffect(() => {
    if (!isLoading && isAdBlocked) {
      open();
    }
  }, [isAdBlocked, isLoading, open]);

  // 🔒 Prevent rendering anything until detection is complete
  if (isLoading) return null;

  return (
    <div className="flex h-screen max-h-screen items-center justify-center overflow-hidden bg-[url(/spinner-bg.png)] bg-cover bg-center bg-no-repeat p-4">
      {!isAdBlocked && children}
      {isAdBlocked && <AdBlockerNotice opened={opened} onClose={close} />}
    </div>
  );
}
