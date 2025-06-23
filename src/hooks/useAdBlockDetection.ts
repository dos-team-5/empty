/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { useVisitorData } from '@fingerprintjs/fingerprintjs-pro-react';

interface AdBlockResult {
  isAdBlocked: boolean;
  signals: {
    baitBlocked: boolean;
    networkBlocked: boolean;
    domApisMissing: boolean;
    botSignals: boolean;
  };
  visitorId: string | null;
  isLoading: boolean;
}

export const useAdBlockDetection = (): AdBlockResult => {
  const { data, isLoading } = useVisitorData({ extendedResult: true });
  const [signals, setSignals] = useState<AdBlockResult['signals']>({
    baitBlocked: false,
    networkBlocked: false,
    domApisMissing: false,
    botSignals: false,
  });

  // 1. Bait Element Test
  const baitTest = () =>
    new Promise<boolean>((resolve) => {
      const bait = document.createElement('div');
      bait.className = 'adsbox';
      bait.style.cssText =
        'width:1px;height:1px;position:absolute;left:-9999px;top:-9999px;';
      document.body.appendChild(bait);
      setTimeout(() => {
        const blocked = !bait.offsetParent || bait.offsetHeight === 0;
        document.body.removeChild(bait);
        resolve(blocked);
      }, 100);
    });

  // 2. Network Block Test
  const networkTest = () =>
    new Promise<boolean>((resolve) => {
      const url =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      fetch(url, { method: 'HEAD', mode: 'no-cors' })
        .then(() => resolve(false)) // Not blocked
        .catch(() => resolve(true)); // Blocked
    });

  // 3. DOM API Missing Check
  const domApiTest = () => {
    return (
      typeof (window as any).adsbygoogle === 'undefined' ||
      typeof (window as any).googletag === 'undefined'
    );
  };

  useEffect(() => {
    const evaluateSignals = async () => {
      const baitBlocked = await baitTest();
      const networkBlocked = await networkTest();
      const domApisMissing = domApiTest();
      // Deprecated bot detection removed
      const botSignals = false;

      setSignals({
        baitBlocked,
        networkBlocked,
        domApisMissing,
        botSignals,
      });
    };

    evaluateSignals();
  }, [data]);

  const isAdBlocked = Object.values(signals).filter(Boolean).length >= 2;

  return {
    isAdBlocked,
    signals,
    visitorId: data?.visitorId ?? null,
    isLoading: isLoading ?? false,
  };
};
