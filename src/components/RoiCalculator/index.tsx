'use client';

import { useState, useEffect } from 'react';
import { Calculator, Car } from 'lucide-react';
import {
  Card,
  TextInput,
  Button,
  Text,
  Group,
  Stack,
  Grid,
} from '@mantine/core';

export default function Component() {
  const [billboardSpend, setBillboardSpend] = useState('');
  const [calculatedCars, setCalculatedCars] = useState(0);
  const [pricePerCar, setPricePerCar] = useState(0);

  // Pricing tiers
  const getPricing = (carCount: number) => {
    if (carCount >= 100) return 232;
    if (carCount >= 50) return 241;
    if (carCount >= 20) return 250;
    return 269;
  };

  // Calculate maximum cars affordable with given budget
  const calculateMaxCars = (budget: number) => {
    if (budget <= 0) return 0;

    // Try different car counts to find the maximum affordable
    for (let cars = 1; cars <= 1000; cars++) {
      const pricePerCar = getPricing(cars);
      const totalMonthlyCost = cars * pricePerCar;

      if (totalMonthlyCost > budget) {
        // Return the previous count that was affordable
        const maxAffordableCars = cars - 1;
        return maxAffordableCars > 0 ? maxAffordableCars : 0;
      }
    }

    return 1000; // If somehow they can afford 1000+ cars
  };

  useEffect(() => {
    const budget = Number.parseFloat(billboardSpend) || 0;
    const maxCars = calculateMaxCars(budget);
    setCalculatedCars(maxCars);
    setPricePerCar(maxCars > 0 ? getPricing(maxCars) : 0);
  }, [billboardSpend]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="mx-auto mt-40 w-full max-w-4xl p-4">
      <Card
        shadow="xl"
        padding="xl"
        radius="lg"
        style={{
          backgroundColor: 'white',
          border: 'none',
        }}
      >
        {/* Header */}
        <div
          className="mb-6 rounded-t-lg p-6 text-center"
          style={{ backgroundColor: '#D482B6' }}
        >
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white">
            <Calculator className="h-8 w-8" style={{ color: '#D482B6' }} />
          </div>
          <Text size="xl" fw={700} c="white" mb="xs">
            See how your billboard budget could work harder for you
          </Text>
        </div>

        <Stack gap="xl">
          {/* Input Section */}
          <div>
            <Text size="lg" fw={600} c="black" mb="md">
              How much did you spend on billboards last month?
            </Text>
            <TextInput
              placeholder="0"
              value={billboardSpend}
              onChange={(e) => setBillboardSpend(e.currentTarget.value)}
              type="number"
              size="lg"
              leftSection="C$"
              styles={{
                input: {
                  fontSize: '18px',
                  height: '56px',
                  borderWidth: '2px',
                  '&:focus': {
                    borderColor: '#D482B6',
                  },
                },
              }}
            />
          </div>

          {/* Results Section */}
          {calculatedCars > 0 && (
            <Card
              padding="xl"
              radius="md"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              <Stack gap="lg">
                {/* Main Result */}
                <div className="text-center">
                  <Group justify="center" gap="md" mb="md">
                    <Car className="h-8 w-8" style={{ color: '#D482B6' }} />
                    <Text size="xl" fw={700} c="black">
                      That could get you{' '}
                      <Text
                        component="span"
                        size="2.5rem"
                        fw={700}
                        style={{ color: '#D482B6' }}
                      >
                        {calculatedCars}
                      </Text>{' '}
                      car{calculatedCars !== 1 ? 's' : ''}
                    </Text>
                  </Group>
                  <Text size="lg" fw={500} c="dimmed">
                    driving around the city full time!
                  </Text>
                </div>

                {/* Cost Breakdown */}
                <Grid>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Card
                      padding="md"
                      radius="md"
                      style={{
                        backgroundColor: 'white',
                        borderLeft: `4px solid #D482B6`,
                      }}
                    >
                      <Text size="sm" c="dimmed">
                        Monthly Rate
                      </Text>
                      <Text size="xl" fw={700} c="black">
                        {formatCurrency(pricePerCar)}/car
                      </Text>
                    </Card>
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, sm: 6 }}>
                    <Card
                      padding="md"
                      radius="md"
                      style={{
                        backgroundColor: 'white',
                        borderLeft: `4px solid #D482B6`,
                      }}
                    >
                      <Text size="sm" c="dimmed">
                        Total Monthly Cost
                      </Text>
                      <Text size="xl" fw={700} c="black">
                        {formatCurrency(calculatedCars * pricePerCar)}
                      </Text>
                    </Card>
                  </Grid.Col>
                </Grid>

                {/* CTA Section */}
                <div className="pt-4 text-center">
                  <Text size="sm" c="dimmed" mb="md">
                    Plus one-time installation fee: {formatCurrency(66)} per car
                  </Text>
                  <Button
                    onClick={() => scrollToSection('pricing-configurator')}
                    size="lg"
                    style={{ backgroundColor: '#D482B6' }}
                    styles={{
                      root: {
                        '&:hover': {
                          backgroundColor: '#c470a4',
                        },
                      },
                    }}
                  >
                    Get Started Today
                  </Button>
                </div>
              </Stack>
            </Card>
          )}

          {/* No Results Message */}
          {billboardSpend && calculatedCars === 0 && (
            <Card
              padding="xl"
              radius="md"
              style={{ backgroundColor: '#f8f9fa' }}
            >
              <Text ta="center" c="dimmed">
                Enter a higher amount to see how many cars you could afford with
                our service.
              </Text>
            </Card>
          )}
        </Stack>
      </Card>
    </div>
  );
}
