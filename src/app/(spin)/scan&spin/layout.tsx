'use client';

import { Box } from '@mantine/core';
import { Ads } from './components/Ads';
import { AdblockDetector } from 'adblock-detector';

export default function SpinLayout({
  children,
}: {
  readonly children: React.ReactNode;
}) {
  const adbDetector = new AdblockDetector();
  const userHasAdblock = adbDetector.detect();

  console.log('detected add block ====>', adbDetector);

  return (
    <Box className="relative">
      {children}
      {userHasAdblock && <Ads />}
    </Box>
  );
}
