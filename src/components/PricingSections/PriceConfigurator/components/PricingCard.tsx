import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  SegmentedControl,
  Text,
  Title,
} from '@mantine/core';
import { Currency, PlanType } from '../types';
import { usePricingCalculation } from '../hooks/usePriceCalculation';
import { ADDONS, currencyOptions, PLAN_CONFIGS } from '../data';
import { Calendar, CreditCard } from 'lucide-react';
import FeatureList from './FeatureList';
import { motion } from 'framer-motion';

interface FeatureComparisonProps {
  planType: 'basic' | 'premium';
}

const FeatureComparison = ({ planType }: FeatureComparisonProps) => {
  const basicFeatures = PLAN_CONFIGS.basic.features;
  const premiumOnlyFeatures =
    planType === 'premium' ? PLAN_CONFIGS.premium.features : [];

  return (
    <Flex gap={48} mt={24} align="flex-start">
      <Box>
        <FeatureList features={basicFeatures} />
      </Box>
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
  currencyType,
  setCurrencyType,
}: {
  planType: PlanType;
  carCount: number;
  pricing: ReturnType<typeof usePricingCalculation>;
  selectedAddons: string[];
  shouldBookCall: boolean;
  currencyType: Currency;
  setCurrencyType: (currency: Currency) => void;
}) => {
  return (
    <motion.div
      initial={{ scale: 0.3, opacity: 0 }}
      whileInView={{
        scale: 1,
        opacity: 1,
        transition: {
          duration: 0.7,
          ease: 'easeInOut',
        },
      }}
      viewport={{ once: true }}
    >
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
          <SegmentedControl
            defaultValue="usd"
            value={currencyType}
            onChange={(value) => setCurrencyType(value as Currency)}
            data={currencyOptions}
          />

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

          <Divider />

          {/* Add-on Pricing Summary */}
          <Box pos={'relative'}>
            {selectedAddons.map((addonId) => {
              const addon = ADDONS.find((a) => a.id === addonId);
              return addon?.pricing ? (
                <Flex align="center" gap={4} key={addonId}>
                  {Object.entries(addon.pricing).map(([label, value]) => (
                    <Badge key={label} variant="light" color="gray" ml={4}>
                      ${value.toFixed(2)}
                    </Badge>
                  ))}
                  <Text fz={12} c="dimmed" ml={4}>
                    per interactive device ID
                  </Text>
                </Flex>
              ) : null;
            })}
          </Box>

          <Divider />

          {/* Add-ons List */}
          <Flex align="center" gap={36}>
            <Text fw={600}>Add-ons:</Text>
            <Flex align="center" gap={12}>
              {selectedAddons.length === 0 ? (
                <Text fz={12} c={'dimmed'}>
                  No add-ons selected
                </Text>
              ) : (
                selectedAddons.map((addonId) => {
                  const addon = ADDONS.find((a) => a.id === addonId);
                  return addon ? (
                    <Badge key={addonId}>
                      {addon.label.replace('Add ', '').replace('Passive ', '')}
                    </Badge>
                  ) : null;
                })
              )}
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
              backgroundColor: shouldBookCall
                ? 'var(--color-primary)'
                : 'black',
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
    </motion.div>
  );
};
