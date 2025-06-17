'use client';

import { useState, useMemo } from 'react';
import {
  Accordion,
  Box,
  Card,
  Input,
  InputLabel,
  RadioGroup,
  SimpleGrid,
  Slider,
  Title,
} from '@mantine/core';
import { PlanType } from './types';
import { usePricingCalculation } from './hooks/usePriceCalculation';
import { ADDONS, CAR_OPTIONS } from './data';
import { PricingCard } from './components/PricingCard';
import { PlanCard } from './components/PlanCard';
import { AddonItem } from './components/AddOnItem';

// Main Component
export default function PricingConfigurator() {
  const [planType, setPlanType] = useState<PlanType>('basic');
  const [carCount, setCarCount] = useState<number>(1);
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const [addonSelections, setAddonSelections] = useState<
    Record<string, boolean>
  >({
    scanAndSpin: false,
    deviceIdPassBack: false,
  });

  const pricing = usePricingCalculation(planType, carCount);

  const selectedAddons = useMemo(
    () =>
      Object.entries(addonSelections)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([_, selected]) => selected)
        .map(([addonId]) => addonId),
    [addonSelections]
  );

  const shouldBookCall = useMemo(() => {
    if (planType === 'basic') {
      return addonSelections.scanAndSpin;
    }
    return addonSelections.scanAndSpin || addonSelections.deviceIdPassBack;
  }, [planType, addonSelections]);

  const handleAddonChange = (addonId: string, checked: boolean) => {
    setAddonSelections((prev) => ({ ...prev, [addonId]: checked }));
  };

  const handleCarCountChange = (value: string) => {
    const newCount = Math.max(1, Number.parseInt(value) || 1);
    setCarCount(newCount);

    // Find the closest index for the slider
    const closestIndex = CAR_OPTIONS.reduce((closest, option, index) => {
      return Math.abs(option.cars - newCount) <
        Math.abs(CAR_OPTIONS[closest].cars - newCount)
        ? index
        : closest;
    }, 0);
    setSelectedIndex(closestIndex);
  };

  const handleSliderChange = (value: number) => {
    setSelectedIndex(value);
    setCarCount(CAR_OPTIONS[value].cars);
  };

  const availableAddons = useMemo(
    () => ADDONS.filter((addon) => addon.availableFor.includes(planType)),
    [planType]
  );

  return (
    <Box mih="100vh" p={16}>
      <Box maw={1400} className="mx-auto">
        <SimpleGrid spacing={32} cols={{ base: 1, lg: 2 }}>
          {/* Left Side - Pricing Card */}
          <Box className="flex-grow" h="100%">
            <PricingCard
              planType={planType}
              carCount={carCount}
              pricing={pricing}
              selectedAddons={selectedAddons}
              shouldBookCall={shouldBookCall}
            />
          </Box>

          {/* Right Side - Configurator Steps */}
          <Box
            p={24}
            bg="white"
            h="100%"
            className="space-y-6 !rounded-[10px] border-2 border-pink-50"
          >
            {/* Step 1 - Plan Selection */}
            <Card>
              <Card.Section>
                <Title>Choose Your Plan</Title>
              </Card.Section>
              <Card.Section className="space-y-6">
                <Box className="space-y-4">
                  <InputLabel
                    htmlFor="car-count"
                    className="text-base font-medium"
                  >
                    Number of Cars
                  </InputLabel>

                  {/* Slider for quick selection */}
                  <Slider
                    mb={30}
                    value={selectedIndex}
                    onChange={handleSliderChange}
                    min={0}
                    max={CAR_OPTIONS.length - 1}
                    step={1}
                    marks={CAR_OPTIONS.map((option, index) => ({
                      value: index,
                      label: option.label,
                    }))}
                    color="var(--mantine-primary-color-4)"
                    label={(value) =>
                      `${CAR_OPTIONS[value].cars} car${CAR_OPTIONS[value].cars > 1 ? 's' : ''}`
                    }
                  />

                  {/* Input for precise entry */}
                  <Input
                    type="number"
                    min={1}
                    radius="md"
                    w="100%"
                    id="car-count"
                    value={carCount}
                    onChange={(e) => handleCarCountChange(e.target.value)}
                    classNames={{ input: '!bg-gray-100' }}
                    placeholder="Enter exact number of cars"
                  />
                </Box>

                <RadioGroup
                  value={planType}
                  onChange={(value: string) => setPlanType(value as PlanType)}
                >
                  <Box className="grid gap-4 md:grid-cols-2">
                    <PlanCard planType="basic" value="basic" />
                    <PlanCard planType="premium" value="premium" />
                  </Box>
                </RadioGroup>
              </Card.Section>
            </Card>

            {/* Add-ons */}
            <Accordion variant="separated">
              {availableAddons.map((addon) => (
                <AddonItem
                  key={addon.id}
                  addon={addon}
                  checked={addonSelections[addon.id] || false}
                  onChange={(checked) => handleAddonChange(addon.id, checked)}
                />
              ))}
            </Accordion>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
