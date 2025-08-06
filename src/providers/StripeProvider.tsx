'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { ReactNode, useMemo } from 'react';

// Move Stripe initialization inside the component to prevent module-level execution

interface StripeProviderProps {
  children: ReactNode;
}

export const StripeProvider = ({ children }: StripeProviderProps) => {
  console.log('StripeProvider rendering');

  const stripePromise = useMemo(() => {
    const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;

    if (!stripePublishableKey) {
      console.error('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not defined');
      return Promise.resolve(null);
    }

    if (!stripePublishableKey.startsWith('pk_')) {
      console.error('Invalid key format:', stripePublishableKey);
      return Promise.resolve(null);
    }

    console.log('Stripe promise created with key:', 'Valid key loaded');
    return loadStripe(stripePublishableKey);
  }, []);

  return <Elements stripe={stripePromise}>{children}</Elements>;
};
