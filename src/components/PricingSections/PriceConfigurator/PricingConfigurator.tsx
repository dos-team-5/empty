'use client';

import { useState, useMemo, memo, useEffect, useCallback } from 'react';
import {
  Accordion,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  InputLabel,
  NumberInput,
  RadioGroup,
  Slider,
  Title,
} from '@mantine/core';
import { motion } from 'motion/react';
import { Currency, PlanType } from './types';
import { usePricingCalculation } from './hooks/usePriceCalculation';
import { ADDONS, CAR_OPTIONS } from './data';
import { PricingCard } from './components/PricingCard';
import { PlanCard } from './components/PlanCard';
import { AddonItem } from './components/AddOnItem';
import { Icon } from '@iconify/react/dist/iconify.js';
import { TextAnimate } from '@/components/TextAnimation';
import { getExchangeRates } from './action/getExchangeRates';
import { useHover } from '@mantine/hooks';
import { useLanguage } from '@/providers/languageToggleContext';
import { priceConfiguratorContent } from '@/contents/advertise/PricingConfigaratorContent';

const TitleSection = memo(({ title }: { title: string }) => (
  <div className="mb-12 space-y-6 rounded-3xl text-start">
    <Title
      order={1}
      fw={700}
      c="#333333"
      ff={'var(--font-poppins)'}
      className="capitalize"
      ta="center"
    >
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        once
        className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
      >
        {title}
      </TextAnimate>
    </Title>
  </div>
));

TitleSection.displayName = 'TitleSection';

// Main Component
export default function PricingConfigurator() {
  const { language } = useLanguage();
  const [currency, setCurrency] = useState<Currency>('cad');
  const [exchangeRate, setExchangeRate] = useState<number>(1);
  const [resetKey, setResetKey] = useState(0);
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
  const { ref } = useHover();
  const [months, setMonths] = useState<number>(1);

  // Fetch exchange rate on toggle or initial load
  useEffect(() => {
    const fetchRate = async () => {
      if (currency === 'usd') {
        const res = await getExchangeRates(); // this will call your server action
        if (res.cadToUsd) {
          setExchangeRate(res.cadToUsd ?? 1);
        }
      } else {
        setExchangeRate(1); // USD is the base
      }
    };

    fetchRate();
  }, [currency]);

  const pricing = usePricingCalculation(
    planType,
    carCount,
    language,
    currency,
    exchangeRate
  );

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
    () =>
      ADDONS[language].filter((addon) => addon.availableFor.includes(planType)),
    [planType, language]
  );

  const handleReset = () => {
    setPlanType('basic');
    setCarCount(1);
    setSelectedIndex(0);
    setAddonSelections({ scanAndSpin: false, deviceIdPassBack: false });
    setResetKey((prev) => prev + 1); // force re-render on Slider
    setCarOptions(CAR_OPTIONS);
  };

  if (!process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY) {
    throw new Error('Stripe publishable key is not defined');
  }

  const fetchClientSecret = useCallback(async (price: number, cars: number) => {
    if (price === null || price === undefined) {
      throw new Error('Price not available for selected option');
    }

    try {
      const response = await fetch('/api/create-checkout-session', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ price, cars }),
      });

      const data = await response.json();

      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      } else {
        console.error('Error:', data.error);
      }
    } catch (error) {
      console.error('Error fetching client secret:', error);
      throw error;
    }
  }, []);

  const content = priceConfiguratorContent[language];

  return (
    <Box id="pricing-configurator" mb={180} p={16}>
      <Box className="mx-auto xl:!max-w-[1000px] 2xl:!max-w-[1100px]">
        <TitleSection title={content.title} />
        <div className="flex w-full origin-top flex-col-reverse gap-y-8 md:flex-row-reverse md:items-start md:justify-between md:gap-y-0 lg:scale-80 xl:scale-100">
          {/* Left Side - Pricing Card */}
          <Box className="md:w-[48%]" h="100%">
            <PricingCard
              planType={planType}
              carCount={carCount}
              pricing={pricing}
              selectedAddons={selectedAddons}
              shouldBookCall={shouldBookCall}
              currencyType={currency}
              setCurrencyType={setCurrency}
              onCheckout={fetchClientSecret}
              months={months}
            />
          </Box>

          {/* Right Side - Configurator Steps */}
          <motion.div
            initial={{ scale: 0.3, opacity: 0 }}
            whileInView={{
              scale: 1,
              opacity: 1,
              transition: {
                duration: 0.7,
                delay: 0.3,
                ease: 'easeInOut',
              },
            }}
            viewport={{ once: true }}
            className="md:w-[48%]"
          >
            <Box
              p={16}
              bg="white"
              h="100%"
              className="!order-1 space-y-6 !rounded-[10px] border-2 border-pink-50 md:!order-2"
            >
              {/* Step 1 - Plan Selection */}
              <Card>
                <Card.Section>
                  <Flex align={'center'} justify="space-between">
                    <Title fz={{ base: 20, sm: 32 }}>
                      {content.rightSection.title}
                    </Title>
                    <Button
                      mt={8}
                      mr={16}
                      bg={'#ffffff'}
                      w={{ base: 40, sm: 60 }}
                      h={{ base: 40, sm: 60 }}
                      className="flex items-center justify-center rounded-full"
                      unstyled
                      onClick={() => handleReset()}
                      style={{ boxShadow: '2px 2px 13px 2px #FF83D58A' }}
                    >
                      <Icon
                        width={30}
                        icon="ri:reset-left-line"
                        color="#FF83D5"
                      />
                    </Button>
                  </Flex>
                </Card.Section>
                <Card.Section className="space-y-6">
                  <Box className="space-y-4">
                    <InputLabel
                      htmlFor="car-count"
                      className="text-base font-medium"
                    >
                      {content.rightSection.content1}
                    </InputLabel>

                    {/* Slider for quick selection */}
                    <Slider
                      key={resetKey}
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
                    <NumberInput
                      hideControls
                      radius="md"
                      w="100%"
                      id="car-count"
                      value={carCount}
                      onChange={(value) =>
                        handleCarCountChange(value.toString())
                      }
                      classNames={{ input: '!bg-gray-100' }}
                      placeholder="Enter exact number of cars"
                    />
                  </Box>

                  <Box className="space-y-4">
                    <Flex gap={8}>
                      <InputLabel
                        htmlFor="months"
                        className="text-base font-medium"
                      >
                        {content.rightSection.content2}
                      </InputLabel>
                      <Badge variant="outline">{`${months} ${content.rightSection.content3}${language === 'en' && months > 1 ? 's' : ''}`}</Badge>
                    </Flex>

                    {/* Slider for quick selection */}
                    <Slider
                      id="months"
                      value={months}
                      onChange={setMonths}
                      defaultValue={1}
                      min={1}
                      max={12}
                      ref={ref}
                      label={null}
                      styles={{
                        thumb: {
                          transition: 'opacity 150ms ease',
                        },
                      }}
                    />
                  </Box>

                  <RadioGroup
                    value={planType}
                    onChange={(value: string) => setPlanType(value as PlanType)}
                  >
                    <Box className="grid gap-4 md:grid-cols-2">
                      <PlanCard
                        planType="basic"
                        value="basic"
                        currency={currency}
                        exchangeRate={exchangeRate}
                        setAddonSelections={setAddonSelections}
                      />

                      <PlanCard
                        planType="premium"
                        value="premium"
                        currency={currency}
                        exchangeRate={exchangeRate}
                        setAddonSelections={setAddonSelections}
                      />
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
                    language={language}
                  />
                ))}
              </Accordion>
            </Box>
          </motion.div>
        </div>
      </Box>
    </Box>
  );
}
