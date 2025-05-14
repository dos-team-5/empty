'use client';

import Loading from '@/app/loading';
import { useEffect, useState } from 'react';

const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup on unmount
  }, []);

  return <div>{isLoading ? <Loading /> : children}</div>;
};

export default LoadingProvider;
