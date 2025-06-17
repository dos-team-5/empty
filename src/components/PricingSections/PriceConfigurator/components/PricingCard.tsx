'use client';

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
import { formatPrice } from '../../utils/formatPrice';
import { useRouter } from 'next/navigation';

interface FeatureComparisonProps {
  planType: 'basic' | 'premium';
}

const FeatureComparison = ({ planType }: FeatureComparisonProps) => {
  const basicFeatures = PLAN_CONFIGS.basic.features;
  const premiumOnlyFeatures =
    planType === 'premium' ? PLAN_CONFIGS.premium.features : [];

  return (
    <Flex
      direction={{ base: 'column', md: 'row' }}
      gap={48}
      mt={24}
      align="flex-start"
    >
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

type CheckoutButtonProps = {
  onCheckout: (price: number, cars: number) => Promise<void>;
};

export const PricingCard = ({
  planType,
  carCount,
  pricing,
  selectedAddons,
  shouldBookCall,
  currencyType,
  setCurrencyType,
  onCheckout,
}: {
  planType: PlanType;
  carCount: number;
  pricing: ReturnType<typeof usePricingCalculation>;
  selectedAddons: string[];
  shouldBookCall: boolean;
  currencyType: Currency;
  setCurrencyType: (currency: Currency) => void;
  onCheckout: CheckoutButtonProps['onCheckout'];
}) => {
  const router = useRouter();
  const totalPrice = pricing.totalMonthlyPrice + pricing.totalInstallationFee;

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

        <Card.Section p={{ base: 16, md: 24 }} className="space-y-6">
          <SegmentedControl
            color="var(--color-primary)"
            value={currencyType}
            onChange={(value) => setCurrencyType(value as Currency)}
            data={currencyOptions}
          />

          {/* Installation Fee */}
          <Flex align="center" justify="space-between">
            <Text fw={500}>Installation Fee</Text>
            <Text fw={700} fz={18}>
              {formatPrice(
                pricing.totalInstallationFee,
                currencyType
              ).toLocaleString()}
            </Text>
          </Flex>

          {/* Monthly Pricing */}
          <Box className="space-y-2">
            <Flex align="center" justify="space-between">
              <Text fw={500}>Monthly Price</Text>
              <Text fw={700} fz={18}>
                {formatPrice(
                  pricing.totalMonthlyPrice,
                  currencyType
                ).toLocaleString()}
                /month
              </Text>
            </Flex>
            <Text fz={14} fw={600} c="dimmed">
              {formatPrice(pricing.monthlyPricePerCar, currencyType)}
              /car/month × {carCount} car
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

          {/* Add-on Pricing Summary */}
          {selectedAddons.some((addonId) => {
            const addon = ADDONS.find((a) => a.id === addonId);
            return addon?.pricing;
          }) && (
            <Box pos="relative">
              <Divider mb={16} />
              {selectedAddons.map((addonId) => {
                const addon = ADDONS.find((a) => a.id === addonId);
                return addon?.pricing ? (
                  <Flex direction="column" align="start" gap={16} key={addonId}>
                    {Object.entries(addon.pricing).map(([label, value]) => (
                      <Badge size="sm" key={label} variant="outline">
                        ${value}
                      </Badge>
                    ))}
                  </Flex>
                ) : null;
              })}
            </Box>
          )}

          <Divider />

          {/* Add-ons List */}
          <Flex
            direction={{ base: 'column', md: 'row' }}
            align={{ base: 'start', md: 'center' }}
            gap={{ base: 12, md: 24, lg: 36 }}
          >
            <Text fw={600}>Add-ons:</Text>
            <Flex align="center" gap={12} wrap={{ base: 'wrap', md: 'nowrap' }}>
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

          <Flex align="center" justify="space-between">
            <Text fw={500}>Total Fee</Text>
            <Text fw={700} fz={18}>
              {formatPrice(totalPrice, currencyType).toLocaleString()}
            </Text>
          </Flex>

          <Divider />

          {/* Action Button */}
          <Button
            onClick={
              shouldBookCall
                ? () => router.push('/contact')
                : () => onCheckout(totalPrice, carCount)
            }
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
