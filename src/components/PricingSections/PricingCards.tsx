'use client';
import {
  Card,
  Text,
  Group,
  Stack,
  List,
  ThemeIcon,
  rem,
  Box,
  Title,
  Slider,
  Button,
} from '@mantine/core';
import { Check } from 'lucide-react';
import { useState, useCallback } from 'react';
import { TextAnimate } from '../TextAnimation';
import getStripe from '@/lib/getStripe';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion'; // Correct import
import { memo } from 'react';

// Separate TitleSection to prevent re-rendering
const TitleSection = memo(() => (
  <div className="mb-12 space-y-6 rounded-3xl text-center">
    <Title order={1} fw={500}>
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        once
        className="text-center text-3xl md:text-4xl lg:text-[40px] 2xl:text-5xl"
      >
        Why rent a wall when you can own the road?
      </TextAnimate>
    </Title>
    <Title order={2} fw={400} mt={'md'}>
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        delay={0.5}
        once
        className="text-lg lg:text-xl 2xl:text-2xl"
      >
        Go live within 7 days
      </TextAnimate>
    </Title>
  </div>
));

// Ensure TitleSection doesn't re-render unnecessarily
TitleSection.displayName = 'TitleSection';

const plans = [
  {
    name: 'Growth Plan',
  },
];

const carOptions = [
  { cars: 1, price: 500 },
  { cars: 5, price: 2300 },
  { cars: 10, price: 4500 },
  { cars: 20, price: 9000 },
  { cars: 50, price: null },
  { cars: 100, price: null },
  { cars: 200, price: null },
];

const PricingCards = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const selectedOption = carOptions[selectedIndex];

  const handleCheckout = useCallback(async () => {
    if (selectedOption.price === null) {
      router.push('/contact');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          price: selectedOption.price,
          cars: selectedOption.cars,
        }),
      });

      const { sessionId } = await response.json();

      if (!response.ok) {
        throw new Error('Failed to create checkout session');
      }

      const stripe = await getStripe();
      if (!stripe) {
        throw new Error('Stripe failed to initialize');
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw new Error(error.message);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to initiate checkout. Please try again.',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  }, [selectedOption, router]);

  return (
    <Box className="relative">
      <Box
        maw={1800}
        mx="auto"
        className="px-4 pt-10 pb-20 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        id="pricingSection"
      >
        <TitleSection /> {/* Render memoized title section */}
        <Box mx="auto" maw={400}>
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ scale: 0.3, opacity: 0 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.7,
                  delay: i * 0.3,
                  ease: 'easeInOut',
                },
              }}
              viewport={{ once: true }}
            >
              <Card
                padding="xl"
                radius={15}
                className="flex h-[440px] justify-between !bg-transparent !pb-16 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]"
              >
                <Box mx="auto" maw={500}>
                  <Text className="text-center !text-[40px] !font-bold text-nowrap">
                    Deploy {selectedOption.cars} Car
                    {selectedOption.cars === 1 ? '' : 's'}
                  </Text>
                </Box>
                <Group>
                  <Box className="flex w-full items-center justify-center gap-1">
                    {selectedOption.price !== null ? (
                      <>
                        <Title order={5}>$</Title>
                        <Text className="!text-primary-400 !text-[40px] !font-bold">
                          {selectedOption.price.toLocaleString()}
                        </Text>
                        <Text className="text-dimmed">/month</Text>
                      </>
                    ) : (
                      <Text className="!text-primary-400 text-center !text-3xl !font-bold">
                        Contact for pricing
                      </Text>
                    )}
                  </Box>
                </Group>
                <Stack mt={20}>
                  <Slider
                    value={selectedIndex}
                    onChange={setSelectedIndex}
                    min={0}
                    max={carOptions.length - 1}
                    step={1}
                    marks={carOptions.map((option, index) => ({
                      value: index,
                      label: option.cars.toString(),
                    }))}
                    color="var(--mantine-primary-color-4)"
                    className="mt-6 !text-3xl"
                  />

                  <List
                    spacing="xl"
                    size="sm"
                    className="mt-6"
                    icon={
                      <ThemeIcon
                        color="var(--mantine-primary-color-4)"
                        size={24}
                        radius={0}
                      >
                        <Check size={rem(14)} />
                      </ThemeIcon>
                    }
                  ></List>

                  <Button
                    className="!bg-primary-400 hover:!bg-primary mt-12 w-fit"
                    size="md"
                    radius={15}
                    onClick={handleCheckout}
                    loading={loading}
                    disabled={loading}
                  >
                    {selectedOption.price !== null ? 'Checkout' : 'Book A Call'}
                  </Button>
                </Stack>
              </Card>
            </motion.div>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default PricingCards;