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
  Slider,
  Title,
  Badge,
} from '@mantine/core';
import { Check } from 'lucide-react';
import { useState } from 'react';

const plans = [
  {
    name: 'Growth Plan',
    features: [
      'Advanced analytics',
      'Up to 50 team members',
      'Priority support',
      '25GB storage space',
      'Custom integrations',
      'API access',
    ],
  },
];

// Car deployment and corresponding prices
const carOptions = [
  { cars: 1, price: 500 },
  { cars: 5, price: 2300 },
  { cars: 10, price: 4500 },
  { cars: 20, price: 9000 },
  { cars: 50, price: 21000 },
  { cars: 100, price: 39000 },
  { cars: 200, price: null }, // Contact for pricing
];

const PricingCards = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const selectedOption = carOptions[selectedIndex];

  return (
    <Box
      maw={1800}
      mx="auto"
      mt={100}
      className="relative px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      <div className="mb-12 space-y-6 text-center">
        <Badge
          color="var(--mantine-primary-color-5)"
          variant="filled"
          size="xl"
          radius={0}
        >
          PRICING
        </Badge>

        <Text className="mb-4 !text-5xl font-bold">Go live within 5 days</Text>
        <Text className="text-dimmed !mt-4">
          Starter (1 month) Growth (3 months) Pro (6 months)
        </Text>
      </div>

      <Box mx="auto" maw={600}>
        {plans.map((plan) => (
          <Card
            key={plan.name}
            padding="xl"
            radius={0}
            className="border-dimmed border-2 !pb-16"
          >
            <Box mx="auto" maw={300}>
              <Text className="bg-default-border rounded-none !p-2 text-center !font-bold">
                Deploy {selectedOption.cars} Cars
              </Text>
            </Box>
            <Stack mt={20}>
              <Group>
                <Box className="flex w-full items-center justify-center gap-1">
                  {selectedOption.price !== null ? (
                    <>
                      <Title order={5}>$</Title>
                      <Text className="!text-primary !text-5xl !font-bold">
                        {selectedOption.price.toLocaleString()}
                      </Text>
                      <Text className="text-dimmed">/month</Text>
                    </>
                  ) : (
                    <Text className="!text-primary !text-3xl !font-bold">
                      Contact for pricing
                    </Text>
                  )}
                </Box>
              </Group>

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
              >
                {plan.features.map((feature) => (
                  <List.Item key={feature}>{feature}</List.Item>
                ))}
              </List>

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
            </Stack>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default PricingCards;
