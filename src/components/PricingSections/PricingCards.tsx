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
      className="relative px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      id='pricingSection'
    >
      <div className="mb-12 space-y-6 rounded-3xl text-center">
        <Title order={1} fw={500} fz={IsAboveMobile ? 56 : 'h2'}>
          Why rent a wall when you can own the road?{' '}
        </Title>
        <Title order={2} fw={400} fz={IsAboveMobile ? 'h2' : 'md'} mt={'md'}>
          Go live within 7 days
        </Title>
      </div>

      <Box mx="auto" maw={500}>
        {plans.map((plan) => (
          <Card
            key={plan.name}
            padding="xl"
            radius={15}
            className="border-dimmed border-2 !pb-16"
          >
            <Box mx="auto" maw={300}>
              <Text className="!p-2 text-center !text-3xl !font-bold">
                Deploy {selectedOption.cars} Cars
              </Text>
            </Box>
            <Stack mt={20}>
              <Group>
                <Box className="flex w-full items-center justify-center gap-1">
                  {selectedOption.price !== null ? (
                    <>
                      <Title order={5}>$</Title>
                      <Text className="!text-primary !text-7xl !font-bold">
                        {selectedOption.price.toLocaleString()}
                      </Text>
                      <Text className="text-dimmed">/month</Text>
                    </>
                  ) : (
                    <Text className="!text-primary text-center !text-4xl !font-bold">
                      Contact for pricing
                    </Text>
                  )}
                </Box>
              </Group>

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
                color="var(--mantine-primary-color-5)"
                className="mt-6"
              />

              <List
                spacing="xl"
                size="sm"
                className="mt-6"
                icon={
                  <ThemeIcon
                    color="var(--mantine-primary-color-5)"
                    size={24}
                    radius={0}
                  >
                    <Check size={rem(14)} />
                  </ThemeIcon>
                }
              ></List>

              <Button className="mt-12 w-fit" size="lg" radius={15}>
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
