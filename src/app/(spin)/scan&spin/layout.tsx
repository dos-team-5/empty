'use client';

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
    <>
      {children}
      {userHasAdblock && (
        <div>
          <Ads />
        </div>
      )}
    </>
  );
}
