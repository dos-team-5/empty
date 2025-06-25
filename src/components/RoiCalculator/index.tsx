'use client';

import { useState } from 'react';
import { Car, DollarSign, ArrowRight } from 'lucide-react';
import { TextInput, Text, Group, Stack, Card, Button } from '@mantine/core';

export default function Component() {
  const [step, setStep] = useState(1);
  const [billboardSpend, setBillboardSpend] = useState('');
  const [basicResults, setBasicResults] = useState({
    cars: 0,
    pricePerCar: 0,
    total: 0,
  });
  const [isAnimating, setIsAnimating] = useState(false);

  // Pricing structures
  const plans = {
    basic: {
      name: 'Basic',
      installation: 66,
      tiers: [
        { min: 1, max: 20, price: 269 },
        { min: 21, max: 50, price: 250 },
        { min: 51, max: 100, price: 241 },
        { min: 101, max: Number.POSITIVE_INFINITY, price: 232 },
      ],
    },
  };

  const getPricing = (carCount: number, plan: 'basic') => {
    const planData = plans[plan];
    for (const tier of planData.tiers) {
      if (carCount >= tier.min && carCount <= tier.max) {
        return tier.price;
      }
    }
    return planData.tiers[planData.tiers.length - 1].price;
  };

  const calculateMaxCars = (budget: number, plan: 'basic') => {
    if (budget <= 0) return { cars: 0, pricePerCar: 0, total: 0 };

    for (let cars = 1; cars <= 1000; cars++) {
      const pricePerCar = getPricing(cars, plan);
      const totalMonthlyCost = cars * pricePerCar;

      if (totalMonthlyCost > budget) {
        const maxAffordableCars = cars - 1;
        if (maxAffordableCars <= 0)
          return { cars: 0, pricePerCar: 0, total: 0 };
        const finalPrice = getPricing(maxAffordableCars, plan);
        return {
          cars: maxAffordableCars,
          pricePerCar: finalPrice,
          total: maxAffordableCars * finalPrice,
        };
      }
    }

    const finalPrice = getPricing(1000, plan);
    return { cars: 1000, pricePerCar: finalPrice, total: 1000 * finalPrice };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleNext = () => {
    if (billboardSpend && Number.parseFloat(billboardSpend) > 0) {
      setIsAnimating(true);

      setTimeout(() => {
        const budget = Number.parseFloat(billboardSpend);
        const basicCalc = calculateMaxCars(budget, 'basic');
        setBasicResults(basicCalc);
        setStep(2);
        setIsAnimating(false);
      }, 500);
    }
  };

  const handleBillboardSpendChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setBillboardSpend(numericValue);
  };

  const budget = Number.parseFloat(billboardSpend) || 0;
  const savingsPercentage =
    basicResults.total > 0
      ? Math.round(((budget - basicResults.total) / budget) * 100)
      : 0;
  const coverageEfficiency =
    basicResults.cars > 0
      ? Math.round((basicResults.cars / (budget / 1000)) * 100)
      : 0;

  const resetCalculator = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setStep(1);
      setBillboardSpend('');
      setIsAnimating(false);
    }, 300);
  };

  const handleGetStartedClick = () => {
    const target = document.querySelector('#pricing-configurator');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      className="mx-auto mt-50 w-full max-w-4xl p-2 md:p-6"
      style={{
        backgroundColor: 'transparent',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          opacity: isAnimating ? 0 : 1,
          transform: isAnimating ? 'translateY(20px)' : 'translateY(0)',
          transition: 'all 0.5s ease-in-out',
        }}
      >
        {step === 1 && (
          <Card
            padding="3rem"
            radius="24px"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 130, 182, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              animation: 'slideInUp 0.6s ease-out',
            }}
          >
            <Stack gap="2rem">
              <div>
                <Text
                  size="2.5rem"
                  fw={600}
                  style={{
                    color: '#000000',
                    marginBottom: '1rem',
                    lineHeight: 1.2,
                    animation: 'fadeInUp 0.8s ease-out 0.2s both',
                  }}
                >
                  How much did you spend on billboards last month?
                </Text>
                <Text
                  size="xl"
                  c="#666"
                  style={{
                    marginBottom: '2rem',
                    animation: 'fadeInUp 0.8s ease-out 0.4s both',
                  }}
                >
                  Let's see how many cars you could get instead!
                </Text>
              </div>

              <div style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}>
                <TextInput
                  placeholder="Enter your billboard spend"
                  value={billboardSpend}
                  onChange={(e) =>
                    handleBillboardSpendChange(e.currentTarget.value)
                  }
                  size="xl"
                  leftSection={
                    <DollarSign size={24} style={{ color: '#D482B6' }} />
                  }
                  styles={{
                    input: {
                      fontSize: '18px',
                      height: '90px',
                      backgroundColor: 'rgba(255, 255, 255, 0.8)',
                      border: '2px solid #e9ecef',
                      borderRadius: '20px',
                      paddingLeft: '32px',
                      color: '#000000',
                      fontWeight: 500,
                      textAlign: 'center',
                      '&:focus': {
                        borderColor: '#D482B6',
                        backgroundColor: 'white',
                        boxShadow: '0 0 0 4px rgba(212, 130, 182, 0.1)',
                        transform: 'scale(1.02)',
                        transition: 'all 0.3s ease',
                      },
                    },
                  }}
                />
              </div>

              <div style={{ animation: 'fadeInUp 0.8s ease-out 0.8s both' }}>
                <Button
                  onClick={handleNext}
                  disabled={
                    !billboardSpend || Number.parseFloat(billboardSpend) <= 0
                  }
                  size="xl"
                  rightSection={<ArrowRight size={24} />}
                  style={{
                    backgroundColor: '#D482B6',
                    border: 'none',
                    borderRadius: '20px',
                    height: '70px',
                    fontSize: '1.3rem',
                    fontWeight: 600,
                    padding: '0 3rem',
                    '&:hover': {
                      backgroundColor: '#c06ba0',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 8px 25px rgba(212, 130, 182, 0.4)',
                    },
                    '&:disabled': {
                      backgroundColor: '#e9ecef',
                      color: '#999',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Calculate My ROI
                </Button>
              </div>
            </Stack>
          </Card>
        )}

        {step === 2 && (
          <Card
            padding="3rem"
            radius="24px"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.9)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(212, 130, 182, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
              animation: 'slideInUp 0.6s ease-out',
            }}
          >
            <Stack gap="2rem">
              <div style={{ animation: 'zoomIn 0.8s ease-out 0.2s both' }}>
                <Text
                  size="5rem"
                  fw={300}
                  style={{
                    color: '#D482B6',
                    lineHeight: 1,
                    fontFamily: 'system-ui',
                    marginBottom: '1rem',
                  }}
                >
                  {basicResults.cars.toLocaleString()}
                </Text>
                <Group justify="center" gap="md">
                  <Car size={40} style={{ color: '#D482B6' }} />
                  <Text fz={24} c="#666" fw={500}>
                    cars
                  </Text>
                </Group>
              </div>

              <Card
                padding="16px"
                radius="20px"
                style={{
                  backgroundColor: 'rgba(212, 130, 182, 0.1)',
                  border: '1px solid rgba(212, 130, 182, 0.3)',
                  animation: 'fadeInUp 0.8s ease-out 0.4s both',
                }}
              >
                <Text
                  size="24px"
                  fw={600}
                  c="#000000"
                  style={{ lineHeight: 1.5 }}
                >
                  Your {formatCurrency(budget)} billboard budget could get you{' '}
                  <span style={{ color: '#D482B6', fontWeight: 700 }}>
                    {basicResults.cars} cars
                  </span>{' '}
                  driving around the city full time!
                </Text>
              </Card>

              <Group
                justify="center"
                gap="4rem"
                style={{ animation: 'fadeInUp 0.8s ease-out 0.6s both' }}
              >
                <div style={{ textAlign: 'center' }}>
                  <Text size="3rem" fw={700} c="#D482B6">
                    {savingsPercentage > 0
                      ? `${savingsPercentage}%`
                      : `${Math.abs(savingsPercentage)}%`}
                  </Text>
                  <Text size="md" c="#666" fw={500} tt="uppercase">
                    {savingsPercentage > 0
                      ? 'Money Saved'
                      : 'Additional Investment'}
                  </Text>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <Text size="3rem" fw={700} c="#D482B6">
                    {coverageEfficiency}%
                  </Text>
                  <Text size="md" c="#666" fw={500} tt="uppercase">
                    Coverage Efficiency
                  </Text>
                </div>
              </Group>

              <Stack
                gap="lg"
                style={{ animation: 'fadeInUp 0.8s ease-out 0.8s both' }}
              >
                <Group justify="space-between">
                  <Text size="lg" c="#666" fw={500}>
                    Monthly Rate per Car:
                  </Text>
                  <Text size="lg" c="#D482B6" fw={600}>
                    {formatCurrency(basicResults.pricePerCar)}
                  </Text>
                </Group>
                <Group justify="space-between">
                  <Text size="lg" c="#666" fw={500}>
                    Total Monthly Cost:
                  </Text>
                  <Text size="lg" c="#D482B6" fw={600}>
                    {formatCurrency(basicResults.total)}
                  </Text>
                </Group>
              </Stack>

              <Text
                size="sm"
                c="#666"
                style={{
                  fontStyle: 'italic',
                  textAlign: 'center',
                  marginTop: '1rem',
                  animation: 'fadeInUp 0.8s ease-out 1s both',
                }}
              >
                *One time installation fee of $66 per car
              </Text>

              <div
                style={{ animation: 'fadeInUp 0.8s ease-out 1s both' }}
                className="space-y-4 md:space-y-0 md:space-x-4"
              >
                <Button
                  onClick={resetCalculator}
                  variant="outline"
                  size="lg"
                  style={{
                    borderColor: '#D482B6',
                    color: '#D482B6',
                    borderRadius: '16px',
                    height: '60px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(212, 130, 182, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Calculate Again
                </Button>
                <Button
                  onClick={handleGetStartedClick}
                  variant="filled"
                  size="lg"
                  style={{
                    borderColor: '#D482B6',
                    color: '#ffffff',
                    borderRadius: '16px',
                    height: '60px',
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    '&:hover': {
                      backgroundColor: 'rgba(212, 130, 182, 0.1)',
                      transform: 'translateY(-2px)',
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  Get Started
                </Button>
              </div>
            </Stack>
          </Card>
        )}
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
