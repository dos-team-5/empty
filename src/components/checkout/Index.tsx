import { Modal, ScrollArea } from '@mantine/core';
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from '@stripe/react-stripe-js';
import { Stripe } from '@stripe/stripe-js/dist';
import { useState, useEffect } from 'react';

interface CheckoutModalProps {
  opened: boolean;
  close: () => void;
  options: {
    fetchClientSecret: () => Promise<string>;
    [key: string]: any;
  };
  stripePromise: Promise<Stripe | null>;
}

const CheckoutModal = ({
  opened,
  close,
  options,
  stripePromise,
}: CheckoutModalProps) => {
  const [stripe, setStripe] = useState<Stripe | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    stripePromise.then((resolvedStripe) => {
      setStripe(resolvedStripe);
    });
  }, [stripePromise]);

  const wrappedFetchClientSecret = async () => {
    try {
      return await options.fetchClientSecret();
    } catch (err) {
      setError('Failed to load checkout. Please try again.');
      throw err;
    }
  };

  return (
    <div>
      <Modal
        radius={15}
        opened={opened}
        onClose={close}
        title="Checkout"
        centered
        scrollAreaComponent={ScrollArea.Autosize}
        size={'xl'}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        closeOnClickOutside={false}
      >
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : stripe ? (
          <EmbeddedCheckoutProvider
            stripe={stripe}
            options={{
              ...options,
              fetchClientSecret: wrappedFetchClientSecret,
            }}
          >
            <EmbeddedCheckout />
          </EmbeddedCheckoutProvider>
        ) : (
          <div>Loading checkout...</div>
        )}
      </Modal>
    </div>
  );
};

export default CheckoutModal;
