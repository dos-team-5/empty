'use client';
import {
  Card,
  Text,
  Group,
  Stack,
  Box,
  Title,
  Slider,
  Button,
} from '@mantine/core';
import { useCallback, useState } from 'react';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'framer-motion';
import { memo } from 'react';
import { useRouter } from 'next/navigation';

// Features data
const features = [
  {
    title: '2–5x Better CPM Than Billboards',
    description:
      'Turn one car into 200,000+ impressions a month. Our door-side ads crush billboards on cost, reach, and visibility.',
  },
  {
    title: 'Complete Month-to-Month Flexibility',
    description:
      'Add and remove cars, update creatives, or expand cities at no extra cost.',
  },
  {
    title: 'Go Live in 7 Days',
    description: 'Upload your creativity and go live in just one week.',
  },
  {
    title: 'Full Transparency, No Guesswork',
    description:
      'Weekly reports with impressions, CPM, and photo proof keep you in control.',
  },
  {
    title: 'Mobile Reach, Driven Full-Time',
    description:
      'Your message moves through high-traffic areas all day, every day. Our driving partners are full-time.',
  },
  {
    title: 'Start with a Single Car, Completely Scalable',
    description:
      'Get results with a single car. Not only do we offer better CPM than all competition, we offer no barrier to entry. See the results, then scale as slow or as fast as you want.',
  },
];

// Animation variants for feature cards
const checkItemVariants = {
  hidden: { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0 },
};

// Separate TitleSection to prevent re-rendering
const TitleSection = memo(() => (
  <div className="mb-12 space-y-6 rounded-3xl text-start">
    <Title
      order={1}
      fw={700}
      c="#333333"
      ff={'var(--font-poppins)'}
      className="capitalize"
    >
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        once
        className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
      >
        Why rent a wall when you can own the road?
      </TextAnimate>
    </Title>
  </div>
));

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
  const router = useRouter();

  const selectedOption = carOptions[selectedIndex];

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Stripe publishable key is not defined');
  }

  const fetchClientSecret = useCallback(async () => {
    if (selectedOption.price === null) {
      throw new Error('Price not available for selected option');
    }
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
      const data = await response.json();
      console.log('API response:', data);
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  }, [selectedOption]);

  // Split features into two groups for desktop (left and right)
  const leftFeatures = features.slice(0, Math.ceil(features.length / 2)); // First half
  const rightFeatures = features.slice(Math.ceil(features.length / 2)); // Second half

  return (
    <Box className="relative">
      <Box
        maw={1800}
        mx="auto"
        className="px-4 py-16 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        id="pricingSection"
      >
        <TitleSection />
        <div className="flex flex-col lg:flex-row lg:gap-8 xl:gap-12">
          {/* Left Features (Desktop: Left Column, Mobile: Top) */}
          <div className="mt-4 flex flex-col gap-4 md:mt-6 lg:w-1/3">
            {leftFeatures.map((item, index) => (
              <motion.div
                key={item.title}
                variants={checkItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: (index + 1) * 0.6 }}
                className="flex items-start justify-start gap-x-4 py-2"
              >
                {/* <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" /> */}
                <Title
                  order={2}
                  ff={'var(--font-poppins)'}
                  c="#333333"
                  className="text-start capitalize lg:!max-w-xs xl:!max-w-sm 2xl:!max-w-md"
                >
                  <div className="mb-0.5 text-lg font-medium xl:text-xl 2xl:text-2xl">
                    {item.title}
                  </div>
                  <div className="text-base font-normal text-[#5E5E5E] xl:text-lg 2xl:text-xl">
                    {item.description}
                  </div>
                </Title>
              </motion.div>
            ))}
          </div>

          {/* Pricing Card (Center) */}
          <Box mx="auto" maw={400} className="my-8 lg:my-0 lg:w-1/3">
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
                    <Button
                      className="!bg-primary-400 hover:!bg-primary mt-12 w-fit text-sm !font-medium !uppercase md:text-base lg:text-sm xl:text-base 2xl:text-lg"
                      size="lg"
                      radius={12}
                      onClick={
                        selectedOption.price === null
                          ? () => router.push('/contact')
                          : () => fetchClientSecret()
                      }
                    >
                      {selectedOption.price !== null
                        ? 'Checkout'
                        : 'Book A Call'}
                    </Button>
                  </Stack>
                </Card>
              </motion.div>
            ))}
          </Box>

          {/* Right Features (Desktop: Right Column, Mobile: Bottom) */}
          <div className="mt-4 flex flex-col gap-4 md:mt-6 lg:w-1/3">
            {rightFeatures.map((item, index) => (
              <motion.div
                key={item.title}
                variants={checkItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: (index + leftFeatures.length + 1) * 0.6 }}
                className="flex items-start justify-start gap-x-4 py-2"
              >
                {/* <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-xl" /> */}
                <Title
                  order={2}
                  ff={'var(--font-poppins)'}
                  c="#333333"
                  className="text-start capitalize lg:!max-w-xs xl:!max-w-sm 2xl:!max-w-md"
                >
                  <div className="mb-0.5 text-lg font-medium xl:text-xl 2xl:text-2xl">
                    {item.title}
                  </div>
                  <div className="text-base font-normal text-[#5E5E5E] xl:text-lg 2xl:text-xl">
                    {item.description}
                  </div>
                </Title>
              </motion.div>
            ))}
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default PricingCards;
