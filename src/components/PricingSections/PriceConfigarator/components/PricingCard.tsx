import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Text,
  Title,
} from '@mantine/core';
import { PlanType } from '../types';
import { usePricingCalculation } from '../hooks/usePriceCalculation';
import { ADDONS, PLAN_CONFIGS } from '../data';
import { Calendar, CreditCard } from 'lucide-react';
import FeatureList from './FeatureList';

interface FeatureComparisonProps {
  planType: 'basic' | 'premium';
}

const FeatureComparison = ({ planType }: FeatureComparisonProps) => {
  const basicFeatures = PLAN_CONFIGS.basic.features;
  const premiumOnlyFeatures =
    planType === 'premium' ? PLAN_CONFIGS.premium.features : [];

  return (
    <Flex gap={48} mt={24} align="flex-start">
      {/* Basic Features Column */}
      <Box>
        <FeatureList features={basicFeatures} />
      </Box>

      {/* Premium-Only Features Column */}
      {planType === 'premium' && (
        <Box>
          <FeatureList features={premiumOnlyFeatures} />
        </Box>
      )}
    </Flex>
  );
};

export const PricingCard = ({
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
          <FeatureComparison planType={planType} />
        </Box>

        {/* Add-ons */}

        <Box pos={'relative'}>
          {selectedAddons.length === 0
            ? null
            : selectedAddons.map((addonId) => {
                const addon = ADDONS.find((a) => a.id === addonId);
                return addon ? (
                  <Box>
                    {addon.pricing && (
                      <Flex align="center" gap={4}>
                        {Object.entries(addon.pricing).map(([label, value]) => (
                          <Badge
                            key={label}
                            variant="light"
                            color="gray"
                            ml={4}
                          >
                            ${value.toFixed(2)}
                          </Badge>
                        ))}
                        <Text fz={12} c="dimmed" ml={4}>
                          per interactive device ID
                        </Text>
                      </Flex>
                    )}
                  </Box>
                ) : null;
              })}
        </Box>

        <Divider />
        <Flex align="center" gap={36}>
          <Text fw={600}>Add-ons:</Text>
          <Flex align="center" gap={12}>
            {selectedAddons.length === 0
              ? 'N/A'
              : selectedAddons.map((addonId) => {
                  const addon = ADDONS.find((a) => a.id === addonId);
                  return addon ? (
                    <Box>
                      <Badge key={addonId}>
                        {addon.label
                          .replace('Add ', '')
                          .replace('Passive ', '')}
                      </Badge>
                    </Box>
                  ) : null;
                })}
          </Flex>
        </Flex>

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
