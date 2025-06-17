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
  const [carOptions, setCarOptions] = useState(CAR_OPTIONS);

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

    // Inject custom value if it doesn't already exist
    if (!carOptions.find((opt) => opt.cars === newCount)) {
      const newOption = {
        cars: newCount,
        label: `${newCount} `,
      };
      const updatedOptions = [...carOptions, newOption].sort(
        (a, b) => a.cars - b.cars
      );
      setCarOptions(updatedOptions);
      setSelectedIndex(
        updatedOptions.findIndex((opt) => opt.cars === newCount)
      );
    } else {
      const index = carOptions.findIndex((opt) => opt.cars === newCount);
      setSelectedIndex(index);
    }
  };

  const handleSliderChange = (value: number) => {
    setSelectedIndex(value);
    setCarCount(carOptions[value].cars);
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
                    px={16}
                    mb={30}
                    value={selectedIndex}
                    onChange={handleSliderChange}
                    min={0}
                    max={carOptions.length - 1}
                    step={1}
                    marks={carOptions.map((option, index) => ({
                      value: index,
                      label: option.label,
                    }))}
                    color="var(--mantine-primary-color-4)"
                    label={(value) =>
                      `${carOptions[value].cars} car${carOptions[value].cars > 1 ? 's' : ''}`
                    }
                  />

                  {/* Input for precise entry */}
                  <Input
                    type="number"
                    min={1}
                    radius="md"
                    w="100%"
                    id="car-count"
                    defaultValue={carCount}
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
