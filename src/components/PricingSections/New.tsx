'use client';

import { useState, useEffect } from 'react';

import { Calendar, CreditCard } from 'lucide-react';

import {
  Accordion,
  Badge,
  Box,
  Button,
  Card,
  Checkbox,
  Divider,
  Flex,
  Input,
  InputLabel,
  List,
  Radio,
  RadioGroup,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import { Icon } from '@iconify/react/dist/iconify.js';

export default function PricingConfigurator() {
  const [planType, setPlanType] = useState<'basic' | 'premium'>('basic');
  const [carCount, setCarCount] = useState<number>(1);
  const [scanAndSpin, setScanAndSpin] = useState<boolean>(false);
  const [deviceIdPassBack, setDeviceIdPassBack] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);

  // Calculate monthly price per car based on tier
  const getMonthlyPricePerCar = () => {
    const pricing =
      planType === 'basic'
        ? { tier1: 269, tier2: 250, tier3: 241, tier4: 232 }
        : { tier1: 303, tier2: 282, tier3: 271, tier4: 261 };

    if (carCount >= 1 && carCount <= 20) return pricing.tier1;
    if (carCount >= 21 && carCount <= 50) return pricing.tier2;
    if (carCount >= 51 && carCount <= 100) return pricing.tier3;
    return pricing.tier4;
  };

  const installationFee = planType === 'basic' ? 66 : 210;
  const monthlyPricePerCar = getMonthlyPricePerCar();
  const totalMonthlyPrice = monthlyPricePerCar * carCount;
  const totalInstallationFee = installationFee * carCount;

  // Determine if we should show "Book a Call" vs "Checkout"
  const shouldBookCall = () => {
    if (planType === 'basic') {
      return scanAndSpin;
    } else {
      return scanAndSpin || deviceIdPassBack;
    }
  };

  // Determine current step based on selections
  useEffect(() => {
    if (planType === 'basic') {
      if (currentStep < 3) setCurrentStep(3);
    } else {
      if (currentStep < 4) setCurrentStep(4);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planType, scanAndSpin, deviceIdPassBack]);

  const features =
    planType === 'basic'
      ? [
          '40+ hours of exposure per car per week',
          'Ads displayed across high traffic areas',
          'Weekly reports with heatmap',
          'Estimated CPM & impressions',
          'Hours driven tracking',
          'Proof of ad delivery',
        ]
      : [
          'All basic features included',
          '95-99% confidence rate in impression accuracy',
          'Industry-leading measurement technology',
          'Total impressions by neighborhood',
          'Hourly impression breakdown',
          'Daily and weekly impression trends',
        ];

  return (
    <Box mih={'100vh'} p={16}>
      <Box className="mx-auto max-w-7xl">
        <SimpleGrid spacing={32} cols={2}>
          {/* Left Side - Pricing Card */}
          <Box h={'100%'}>
            <Card className="!border-primary border-2">
              <Card.Section
                p={24}
                className="text-center"
                bg={'var(--color-primary)'}
              >
                <Title fz={24} c={'white'}>
                  {planType === 'basic' ? 'Basic Plan' : 'Premium Plan'}
                </Title>
                <Text c={'white'}>
                  {carCount} car{carCount !== 1 ? 's' : ''} selected
                </Text>
              </Card.Section>
              <Card.Section p={24} className="space-y-6">
                {/* Installation Fee */}
                <Flex align={'center'} justify={'space-between'}>
                  <Text fw={500} className="font-medium">
                    Installation Fee
                  </Text>
                  <Text fw={700} fz={18} className="font-bold">
                    ${totalInstallationFee.toLocaleString()}
                  </Text>
                </Flex>

                {/* Monthly Pricing */}
                <Box className="space-y-2">
                  <Flex align={'center'} justify={'space-between'}>
                    <Text fw={500} className="font-medium">
                      Monthly Price
                    </Text>
                    <Text fw={700} fz={18} className="font-bold">
                      ${totalMonthlyPrice.toLocaleString()}/month
                    </Text>
                  </Flex>
                  <Text fz={14} fw={600} c={'dimmed'}>
                    ${monthlyPricePerCar}/car/month × {carCount} car
                    {carCount !== 1 ? 's' : ''}
                  </Text>
                </Box>

                <Divider />

                {/* Features */}
                <Box>
                  <Text fz={24} fw={700}>
                    Included Features:
                  </Text>
                  <List mt={12}>
                    {features.map((feature, index) => (
                      <List.Item mt={8} key={index}>
                        <Flex align={'center'} gap={12}>
                          <Icon
                            icon="tabler:check"
                            width={16}
                            height={16}
                            color="var(--color-primary)"
                          />
                          <span>{feature}</span>
                        </Flex>
                      </List.Item>
                    ))}
                  </List>
                </Box>

                {/* Add-ons */}
                {(scanAndSpin || deviceIdPassBack) && (
                  <>
                    <Divider />
                    <Flex align={'center'} gap={36}>
                      <h4 className="font-semibold">Add-ons:</h4>
                      <Flex align={'center'} gap={12}>
                        {scanAndSpin && (
                          <Box className="flex items-center gap-2">
                            <Badge>Scan & Spin</Badge>
                            {/* <span className="text-sm">Included</span> */}
                          </Box>
                        )}
                        {deviceIdPassBack && (
                          <Box className="flex items-center gap-2">
                            <Badge>Device ID PassBack</Badge>
                            {/* <span className="text-sm">Usage-based pricing</span> */}
                          </Box>
                        )}
                      </Flex>
                    </Flex>
                  </>
                )}

                <Divider />

                {/* Action Button */}
                <Button
                  w={'100%'}
                  h={48}
                  fz={18}
                  fw={600}
                  style={{
                    backgroundColor: shouldBookCall()
                      ? 'var(--color-primary)'
                      : 'black',
                  }}
                >
                  {shouldBookCall() ? (
                    <>
                      <Calendar className="mr-2 h-5 w-5" />
                      Book a Call
                    </>
                  ) : (
                    <>
                      <CreditCard className="mr-2 h-5 w-5" />
                      Checkout
                    </>
                  )}
                </Button>
              </Card.Section>
            </Card>
          </Box>

          {/* Right Side - Configurator Steps */}
          <Box
            p={24}
            bg={'white'}
            h={'100%'}
            className="space-y-8 border-2 border-pink-50"
          >
            {/* Step 1 - Plan Selection */}
            <Card>
              <Card.Section>
                <Title>Choose Your Plan</Title>
              </Card.Section>
              <Card.Section className="space-y-6">
                <Box mt={8} className="space-y-4">
                  <InputLabel
                    htmlFor="car-count"
                    className="text-base font-medium"
                  >
                    Number of Cars
                  </InputLabel>
                  <Input
                    type="number"
                    min={1}
                    radius={'md'}
                    w={'100%'}
                    id="car-count"
                    value={carCount}
                    onChange={(e) =>
                      setCarCount(
                        Math.max(1, Number.parseInt(e.target.value) || 1)
                      )
                    }
                    classNames={{
                      input: '!bg-gray-100',
                    }}
                  />
                </Box>

                <RadioGroup
                  value={planType}
                  onChange={(value: string) =>
                    setPlanType(value as 'basic' | 'premium')
                  }
                >
                  <Box className="grid gap-4 md:grid-cols-2">
                    {/* Basic Plan */}
                    <Box className="space-y-2">
                      <InputLabel
                        htmlFor="basic"
                        className="[&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5 block cursor-pointer rounded-lg border-2 border-gray-300 p-4 hover:border-gray-300"
                      >
                        <Box className="mb-3 flex items-center space-x-2">
                          <Radio value="basic" id="basic" />
                          <span className="text-lg font-semibold">Basic</span>
                        </Box>
                        <Box className="space-y-2 text-sm">
                          <Box fw={700}>
                            <strong>Installation:</strong> $66/car
                          </Box>
                          <Box fw={700}>
                            <strong>Monthly:</strong> $269-232/car
                          </Box>
                          <Box className="text-gray-600">
                            40+ hours exposure, weekly reports, proof of ad
                          </Box>
                        </Box>
                      </InputLabel>
                    </Box>

                    {/* Premium Plan */}
                    <Box className="space-y-2">
                      <InputLabel
                        htmlFor="premium"
                        className="[&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5 block cursor-pointer rounded-lg border-2 border-gray-300 p-4 hover:border-gray-300"
                      >
                        <Box className="mb-3 flex items-center space-x-2">
                          <Radio value="premium" id="premium" />
                          <span className="text-lg font-semibold">Premium</span>
                        </Box>
                        <Box className="space-y-2 text-sm">
                          <Box fw={700}>
                            <strong>Installation:</strong> $210/car
                          </Box>
                          <Box fw={700}>
                            <strong>Monthly:</strong> $303-261/car
                          </Box>
                          <Box className="text-gray-600">
                            95-99% accuracy, comprehensive reporting
                          </Box>
                        </Box>
                      </InputLabel>
                    </Box>
                  </Box>
                </RadioGroup>
              </Card.Section>
            </Card>

            <Accordion>
              {/* Step 2 - Scan & Spin */}
              <Accordion.Item value="scan-spin">
                <Accordion.Control>
                  <Flex align={'start'} gap={12}>
                    <Checkbox
                      id="scan-spin"
                      checked={scanAndSpin}
                      onChange={(event) =>
                        setScanAndSpin(event.currentTarget.checked)
                      }
                    />
                    <Flex align={'center'} gap={8}>
                      <InputLabel
                        fz={16}
                        htmlFor="scan-spin"
                        className="cursor-pointer text-xl font-medium"
                      >
                        Add Scan & Spin Engagement
                      </InputLabel>

                      <Badge variant="outline">Same Pricing</Badge>
                    </Flex>
                  </Flex>
                </Accordion.Control>
                <Accordion.Panel>
                  <Box className="space-y-1 text-sm text-gray-600">
                    <Box>
                      • Device IDs collected for retargeting & attribution
                    </Box>
                    <Box>• QR codes placed on vehicle exteriors</Box>
                    <Box>• Users scan for deals or promo codes</Box>
                    <Box>• High-intent leads from real-world interaction</Box>
                    <Box>• Email capture</Box>
                  </Box>
                </Accordion.Panel>
              </Accordion.Item>
              {/* Step 3 - Device ID (Premium Only) */}
              {planType === 'premium' && (
                // <Card.Section>
                //   <Box className="flex items-center gap-3">
                //     <Box
                //       className="flex h-8 w-8 items-center justify-center rounded-full font-bold text-white"
                //       style={{ backgroundColor: '#D381B5' }}
                //     >
                //       3
                //     </Box>
                //     <Title className="flex items-center gap-2">
                //       Device ID PassBack (Optional)
                //       <Tooltip
                //         label="  Most people leave WiFi and Bluetooth on by default.
                //           Our sensors detect nearby devices when they come
                //           within range of your ad, counting each as a
                //           real-world impression. We filter impressions by
                //           distance, signal strength, and location to give you
                //           highly accurate, verifiable reach data."
                //       >
                //         <Info className="h-4 w-4 text-gray-500" />
                //       </Tooltip>
                //     </Title>
                //   </Box>
                // </Card.Section>

                <Accordion.Item value="device-id">
                  <Accordion.Control>
                    <Flex className="flex items-start space-x-3">
                      <Checkbox
                        id="device-id"
                        checked={deviceIdPassBack}
                        onChange={(event) =>
                          setDeviceIdPassBack(event.currentTarget.checked)
                        }
                      />
                      <Flex align={'center'} gap={8}>
                        <InputLabel
                          fz={16}
                          htmlFor="device-id"
                          className="cursor-pointer text-base font-medium"
                        >
                          Passive Device ID Capture & PassBack
                        </InputLabel>
                        <Badge variant="outline">Same Pricing</Badge>
                      </Flex>
                    </Flex>
                  </Accordion.Control>
                  <Accordion.Panel>
                    <Box className="space-y-1 text-sm text-gray-600">
                      <Box>
                        • Personal device information collected via WiFi and
                        Bluetooth proximity
                      </Box>
                      <Box>• IDs collected without any user interaction</Box>
                      <Box>
                        • Filtered by radius, signal strength, and location
                      </Box>
                      <Box>• Used for audience modeling and retargeting</Box>
                      <Box>• Fully privacy-compliant (USA, Canada, Europe)</Box>
                    </Box>
                    <Box className="space-y-2">
                      <Box className="text-sm">
                        <strong>Pricing:</strong>
                      </Box>
                      <Box className="space-y-1 text-sm text-gray-600">
                        <Box>
                          • $0.50 per device collected through Scan & Spin
                        </Box>
                        <Box>
                          • $0.01 per device collected through Geofencing
                        </Box>
                      </Box>
                    </Box>
                  </Accordion.Panel>
                </Accordion.Item>
              )}
            </Accordion>
          </Box>
        </SimpleGrid>
      </Box>
    </Box>
  );
}
