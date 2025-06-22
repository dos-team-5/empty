'use client';

import { useRouter } from 'next/navigation';

export const Ads = () => {
  const router = useRouter();

  return (
    <div
      id="adblock-message"
      style={{
        display: 'block',
        marginBottom: '30px',
        padding: '20px 10px',
        background: '#D30000',
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#fff',
        borderRadius: '5px',
      }}
    >
      <p>
        Our website relies on ad revenue to provide free content to our
        visitors. Please consider supporting us by disabling your ad blocker.
      </p>
      <button
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: '5px',
          fontSize: '14px',
          fontWeight: 'medium',
          padding: '10px 20px',
          color: '#fff',
          background: '#0070f3',
          border: 'none',
          cursor: 'pointer',
          margin: '10px',
        }}
        onClick={() => router.refresh()}
      >
        Refresh Page
      </button>
    </div>
  );
};
