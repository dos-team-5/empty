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
import { useState } from 'react';
import { TextAnimate } from '../TextAnimation';
import getStripe from '@/lib/getStripe';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import { motion } from 'motion/react';

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

  const handleCheckout = async () => {
    if (selectedOption.price === null) {
      router.push('/contact'); // Redirect to contact page for custom pricing
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
  };

  return (
    <Box
      className="relative h-dvh"
      // className="from-default to-primary-100 relative h-dvh bg-gradient-to-b from-55%"
    >
      <Box
        maw={1800}
        mx="auto"
        className="px-4 pt-10 pb-20 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        id="pricingSection"
      >
        <div className="mb-12 space-y-6 rounded-3xl text-center">
          <Title order={1} fw={500}>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              once
              className="text-[40px]"
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
              className="text-xl"
            >
              Go live within 7 days
            </TextAnimate>
          </Title>
        </div>
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
                className="flex h-[440px] justify-between !pb-16 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]"
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

        {/* <div className="relative flex h-[18em] w-[20em] flex-col justify-center gap-[1em] rounded-[1.5em] border-2 border-[rgba(75,30,133,0.5)] bg-gradient-to-br from-[rgba(75,30,133,1)] via-purple-700/80 to-[rgba(75,30,133,0.2)] p-[1.5em] text-white backdrop-blur-[12px] transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/30">
          <div className="absolute inset-0 rounded-[1.5em] bg-gradient-to-br from-purple-600/30 via-fuchsia-500/20 to-transparent opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,50,190,0.1),transparent_60%)] group-hover/card:animate-pulse"></div>

          <div className="absolute top-4 right-4 flex gap-2">
            <div className="h-2 w-2 rounded-full bg-purple-300/50"></div>
            <div className="h-2 w-2 rounded-full bg-purple-300/30"></div>
            <div className="h-2 w-2 rounded-full bg-purple-300/10"></div>
          </div>

          <div className="relative z-10 space-y-3 transition-transform duration-300 group-hover/card:translate-y-[-2px]">
            <h1 className="bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-[2.2em] font-bold text-transparent">
              Deploy {selectedOption.cars} Car
              {selectedOption.cars === 1 ? '' : 's'}
            </h1>
            <h2 className="bg-gradient-to-r from-white via-purple-100 to-purple-200 bg-clip-text text-[2.2em] font-bold text-transparent">
              Deploy {selectedOption.cars} Car
              {selectedOption.cars === 1 ? '' : 's'}
            </h2>
            <p className="text-[0.9em] leading-relaxed font-light text-purple-100/90">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero
              dolorum blanditiis pariatur sequi magni.
            </p>
          </div>

          <button className="group/btn relative mt-2 flex h-fit w-fit items-center justify-center gap-[0.7em] overflow-hidden rounded-full border-[1px] border-purple-300/30 bg-purple-500/10 px-[1.4em] py-[0.7em] backdrop-blur-[12px] transition-all duration-300 hover:border-purple-300/50 hover:shadow-lg hover:shadow-purple-500/20 active:scale-95">
            <div className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-purple-600/40 via-fuchsia-500/40 to-purple-600/40 transition-transform duration-700 group-hover/btn:translate-x-[100%]"></div>

            <p className="relative z-10 font-medium tracking-wide">
              Explore Now
            </p>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover/btn:translate-x-[10%]"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              ></path>
            </svg>
          </button>

          <div className="absolute bottom-4 left-4 h-8 w-8 rounded-full bg-gradient-to-br from-purple-400/20 to-transparent blur-sm group-hover/card:animate-pulse"></div>
        </div> */}
      </Box>
    </Box>
  );
};

export default PricingCards;
