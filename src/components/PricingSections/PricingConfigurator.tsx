'use client';

import { useState, useMemo } from 'react';
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

// Types
type PlanType = 'basic' | 'premium';

interface PricingTier {
  tier1: number;
  tier2: number;
  tier3: number;
  tier4: number;
}

interface PlanConfig {
  installationFee: number;
  pricing: PricingTier;
  features: string[];
}

interface AddonConfig {
  id: string;
  label: string;
  features: string[];
  availableFor: PlanType[];
}

// Constants
const PLAN_CONFIGS: Record<PlanType, PlanConfig> = {
  basic: {
    installationFee: 66,
    pricing: { tier1: 269, tier2: 250, tier3: 241, tier4: 232 },
    features: [
      '40+ hours of exposure per car per week',
      'Ads displayed across high traffic areas',
      'Weekly reports with heatmap',
      'Estimated CPM & impressions',
      'Hours driven tracking',
      'Proof of ad delivery',
    ],
  },
  premium: {
    installationFee: 210,
    pricing: { tier1: 303, tier2: 282, tier3: 271, tier4: 261 },
    features: [
      'All basic features included',
      '95-99% confidence rate in impression accuracy',
      'Industry-leading measurement technology',
      'Total impressions by neighborhood',
      'Hourly impression breakdown',
      'Daily and weekly impression trends',
    ],
  },
};

const ADDONS: AddonConfig[] = [
  {
    id: 'scanAndSpin',
    label: 'Add Scan & Spin Engagement',
    availableFor: ['basic', 'premium'],
    features: [
      'Device IDs collected for retargeting & attribution',
      'QR codes placed on vehicle exteriors',
      'Users scan for deals or promo codes',
      'High-intent leads from real-world interaction',
      'Email capture',
    ],
  },
  {
    id: 'deviceIdPassBack',
    label: 'Passive Device ID Capture & PassBack',
    availableFor: ['premium'],
    features: [
      'Personal device information collected via WiFi and Bluetooth proximity',
      'IDs collected without any user interaction',
      'Filtered by radius, signal strength, and location',
      'Used for audience modeling and retargeting',
      'Fully privacy-compliant (USA, Canada, Europe)',
    ],
  },
];

const CAR_COUNT_TIERS = [
  { min: 1, max: 20, tier: 'tier1' as const },
  { min: 21, max: 50, tier: 'tier2' as const },
  { min: 51, max: 100, tier: 'tier3' as const },
  { min: 101, max: Infinity, tier: 'tier4' as const },
];

// Custom hooks
const usePricingCalculation = (planType: PlanType, carCount: number) => {
  return useMemo(() => {
    const config = PLAN_CONFIGS[planType];
    const tier =
      CAR_COUNT_TIERS.find((t) => carCount >= t.min && carCount <= t.max)
        ?.tier || 'tier4';
    const monthlyPricePerCar = config.pricing[tier];

    return {
      installationFee: config.installationFee,
      monthlyPricePerCar,
      totalMonthlyPrice: monthlyPricePerCar * carCount,
      totalInstallationFee: config.installationFee * carCount,
    };
  }, [planType, carCount]);
};

// Components
const PlanCard = ({
  planType,
  value,
}: {
  planType: PlanType;
  value: string;
}) => {
  const config = PLAN_CONFIGS[planType];
  const minPrice = Math.min(...Object.values(config.pricing));
  const maxPrice = Math.max(...Object.values(config.pricing));

  return (
    <InputLabel
      htmlFor={planType}
      className="[&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5 block cursor-pointer rounded-lg border-2 border-gray-300 p-4 hover:border-gray-300"
    >
      <Box className="mb-3 flex items-center space-x-2">
        <Radio value={value} id={planType} />
        <span className="text-lg font-semibold capitalize">{planType}</span>
      </Box>
      <Box className="space-y-2 text-sm">
        <Box fw={700}>
          <strong>Installation:</strong> ${config.installationFee}/car
        </Box>
        <Box fw={700}>
          <strong>Monthly:</strong> ${maxPrice}-{minPrice}/car
        </Box>
        <Box className="text-gray-600">
          {planType === 'basic'
            ? '40+ hours exposure, weekly reports, proof of ad'
            : '95-99% accuracy, comprehensive reporting'}
        </Box>
      </Box>
    </InputLabel>
  );
};

const AddonItem = ({
  addon,
  checked,
  onChange,
}: {
  addon: AddonConfig;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) => (
  <Accordion.Item value={addon.id}>
    <Accordion.Control>
      <Flex align="start" gap={12}>
        <Checkbox
          id={addon.id}
          checked={checked}
          onChange={(event) => onChange(event.currentTarget.checked)}
        />
        <Flex align="center" gap={8}>
          <InputLabel
            fz={16}
            htmlFor={addon.id}
            className="cursor-pointer text-base font-medium"
          >
            {addon.label}
          </InputLabel>
          <Badge variant="outline">Same Pricing</Badge>
        </Flex>
      </Flex>
    </Accordion.Control>
    <Accordion.Panel>
      <List listStyleType="disc" spacing="xs" size="sm" withPadding>
        {addon.features.map((feature, index) => (
          <List.Item key={index}>{feature}</List.Item>
        ))}
      </List>
    </Accordion.Panel>
  </Accordion.Item>
);

const FeatureList = ({ features }: { features: string[] }) => (
  <List mt={12}>
    {features.map((feature, index) => (
      <List.Item mt={8} key={index}>
        <Flex align="center" gap={12}>
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
);

const PricingCard = ({
  planType,
  carCount,
  pricing,
  selectedAddons,
  shouldBookCall,
}: {
  planType: PlanType;
  carCount: number;
  pricing: ReturnType<typeof usePricingCalculation>;
  selectedAddons: string[];
  shouldBookCall: boolean;
}) => {
  const config = PLAN_CONFIGS[planType];

  return (
    <Card radius={10} className="!border-primary border-2">
      <Card.Section p={24} className="text-center" bg="var(--color-primary)">
        <Title fz={24} c="white">
          {planType === 'basic' ? 'Basic Plan' : 'Premium Plan'}
        </Title>
        <Text c="white">
          {carCount} car{carCount !== 1 ? 's' : ''} selected
        </Text>
      </Card.Section>

      <Card.Section p={24} className="space-y-6">
        {/* Installation Fee */}
        <Flex align="center" justify="space-between">
          <Text fw={500}>Installation Fee</Text>
          <Text fw={700} fz={18}>
            ${pricing.totalInstallationFee.toLocaleString()}
          </Text>
        </Flex>

        {/* Monthly Pricing */}
        <Box className="space-y-2">
          <Flex align="center" justify="space-between">
            <Text fw={500}>Monthly Price</Text>
            <Text fw={700} fz={18}>
              ${pricing.totalMonthlyPrice.toLocaleString()}/month
            </Text>
          </Flex>
          <Text fz={14} fw={600} c="dimmed">
            ${pricing.monthlyPricePerCar}/car/month × {carCount} car
            {carCount !== 1 ? 's' : ''}
          </Text>
        </Box>

        <Divider />

        {/* Features */}
        <Box>
          <Text fz={24} fw={700}>
            Included Features:
          </Text>
          <FeatureList features={config.features} />
        </Box>

        {/* Add-ons */}
        {selectedAddons.length > 0 && (
          <>
            <Divider />
            <Flex align="center" gap={36}>
              <Text fw={600}>Add-ons:</Text>
              <Flex align="center" gap={12}>
                {selectedAddons.map((addonId) => {
                  const addon = ADDONS.find((a) => a.id === addonId);
                  return addon ? (
                    <Badge key={addonId}>
                      {addon.label.replace('Add ', '').replace('Passive ', '')}
                    </Badge>
                  ) : null;
                })}
              </Flex>
            </Flex>
          </>
        )}

        <Divider />

        {/* Action Button */}
        <Button
          w="100%"
          h={48}
          fz={18}
          fw={600}
          style={{
            backgroundColor: shouldBookCall ? 'var(--color-primary)' : 'black',
          }}
        >
          {shouldBookCall ? (
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
  );
};

// Main Component
export default function PricingConfigurator() {
  const [planType, setPlanType] = useState<PlanType>('basic');
  const [carCount, setCarCount] = useState<number>(1);
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
    setCarCount(Math.max(1, Number.parseInt(value) || 1));
  };

  const availableAddons = useMemo(
    () => ADDONS.filter((addon) => addon.availableFor.includes(planType)),
    [planType]
  );

  return (
    <Box mih="100vh" p={16}>
      <Box className="mx-auto max-w-7xl">
        <SimpleGrid spacing={32} cols={2}>
          {/* Left Side - Pricing Card */}
          <Box h="100%">
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
                    readOnly
                    type="number"
                    min={1}
                    radius="md"
                    w="100%"
                    id="car-count"
                    value={carCount}
                    onChange={(e) => handleCarCountChange(e.target.value)}
                    classNames={{ input: '!bg-gray-100' }}
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
            <Accordion>
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
