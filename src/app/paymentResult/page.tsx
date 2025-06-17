'use client';
import { Box, Title, Text, Button } from '@mantine/core';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

export default function PaymentResult() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const session_id = searchParams.get('session_id');

  useEffect(() => {
    if (session_id) {
      // Optionally verify the session with your backend
      console.log('Payment successful, session ID:', session_id);
    }
  }, [session_id]);

  return (
    <Box
      maw={800}
      mx="auto"
      p="xl"
      style={{ textAlign: 'center' }}
      className="flex h-[89dvh] flex-col items-center justify-center"
    >
      <Title order={1} style={{ color: 'var(--color-text)' }}>
        Payment Successful!
      </Title>
      <Text mt="md" style={{ color: 'var(--color-text)' }}>
        Thank you for your purchase. You’ll receive a confirmation email soon.
      </Text>
      <Button
        mt="lg"
        size="lg"
        radius={15}
        className="!bg-primary-400 hover:!bg-primary"
        onClick={() => router.push('/')}
      >
        Back to Home
      </Button>
    </Box>
  );
}
