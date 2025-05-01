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
import { useMediaQuery } from '@mantine/hooks';
import { Check } from 'lucide-react';
import { useState } from 'react';
import { TextAnimate } from '../TextAnimation';

const plans = [
  {
    name: 'Growth Plan',
  },
];

// Car deployment and corresponding prices
const carOptions = [
  { cars: 1, price: 500 },
  { cars: 5, price: 2300 },
  { cars: 10, price: 4500 },
  { cars: 20, price: 9000 },
  { cars: 50, price: null },
  { cars: 100, price: null },
  { cars: 200, price: null }, // Contact for pricing
];

const PricingCards = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');

  const selectedOption = carOptions[selectedIndex];

  return (
    <Box
      maw={1800}
      mx="auto"
      mt={100}
      className="relative px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32 pt-20 pb-20"
      id="pricingSection"
    >
      <div className="mb-12 space-y-6 rounded-3xl text-center">
        <Title order={1} fw={500} fz={IsAboveMobile ? 52 : 'h2'}>
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
          >
            Why rent a wall when you can own the road?
          </TextAnimate>
        </Title>
        <Title order={2} fw={400} fz={IsAboveMobile ? 'h2' : 'md'} mt={'md'}>
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            delay={0.5}
          >
            Go live within 7 days
          </TextAnimate>
        </Title>
      </div>

      <Box mx="auto" maw={500}>
        {plans.map((plan) => (
          <Card
            key={plan.name}
            padding="xl"
            radius={15}
            className="border-dimmed flex h-[600px] justify-between border-2 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] !pb-16"
          >
            <Box mx="auto" maw={500}>
              <Text className="!p-2 text-center !text-[48px] !font-bold">
                Deploy {selectedOption.cars} Car
                {selectedOption.cars === 1 ? '' : 's'}
              </Text>
            </Box>
            <Group>
              <Box className="flex w-full items-center justify-center gap-1">
                {selectedOption.price !== null ? (
                  <>
                    <Title order={5}>$</Title>
                    <Text className="!text-primary-400 !text-7xl !font-bold">
                      {selectedOption.price.toLocaleString()}
                    </Text>
                    <Text className="text-dimmed">/month</Text>
                  </>
                ) : (
                  <Text className="!text-primary-400 text-center !text-4xl !font-bold">
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
                size="lg"
                radius={15}
              >
                {selectedOption.price !== null ? 'Checkout' : 'Book A Call'}
              </Button>
            </Stack>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PricingCards;
