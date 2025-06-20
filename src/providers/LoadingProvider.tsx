'use client';

import Loading from '@/app/loading';
import { SessionProvider } from 'next-auth/react';
import { useEffect, useState } from 'react';

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3500);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return (
    <div>
      {isLoading ? <Loading /> : <SessionProvider>{children}</SessionProvider>}
    </div>
  );
};

export default LoadingProvider;
