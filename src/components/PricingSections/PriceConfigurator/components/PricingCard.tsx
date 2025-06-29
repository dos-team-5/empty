/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Radio,
  Text,
  Title,
} from '@mantine/core';
import { Currency, PlanType } from '../types';
import { usePricingCalculation } from '../hooks/usePriceCalculation';
import { ADDONS, currencyOptions, Language, PLAN_CONFIGS } from '../data';
import { Calendar, CreditCard } from 'lucide-react';
import FeatureList from './FeatureList';
import { motion } from 'framer-motion';
import { formatPrice } from '../../utils/formatPrice';
import { useRouter } from 'next/navigation';
import classes from './Demo.module.css';
import { useLanguage } from '@/providers/languageToggleContext';

interface FeatureComparisonProps {
  planType: 'basic' | 'premium';
  language: Language;
}

const FeatureComparison = ({ planType, language }: FeatureComparisonProps) => {
  const basicFeatures = PLAN_CONFIGS[language].basic.features;
  const premiumOnlyFeatures =
    planType === 'premium' ? PLAN_CONFIGS[language].premium.features : [];

  return (
    <Flex direction={{ base: 'column', md: 'row' }} gap={32} align="flex-start">
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

const cards = currencyOptions.map((item) => (
  <Radio.Card
    className={classes.root}
    w={60}
    py={8}
    radius="md"
    value={item.value}
    key={item.label}
  >
    <Text className="!text-center" fw={700} fz={12}>
      {item.label}
    </Text>
  </Radio.Card>
));

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
  months,
}: {
  planType: PlanType;
  carCount: number;
  pricing: ReturnType<typeof usePricingCalculation>;
  selectedAddons: string[];
  shouldBookCall: boolean;
  currencyType: Currency;
  setCurrencyType: (currency: Currency) => void;
  onCheckout: CheckoutButtonProps['onCheckout'];
  months: number;
}) => {
  const { language } = useLanguage();
  const router = useRouter();
  const totalPrice =
    pricing.totalMonthlyPrice * months + pricing.totalInstallationFee;

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
        <Card.Section p={16} className="text-center" bg="var(--color-primary)">
          <Title fz={18} c="white">
            {planType === 'basic' ? 'Basic Plan' : 'Premium Plan'}
          </Title>
          <Text mt={2} c="white">
            {carCount} {language === 'en' ? 'car' : 'voiture'}
            {language === 'en' && carCount !== 1 ? 's' : ''}{' '}
            {language === 'en' ? 'selected' : 'choisie'}
          </Text>
        </Card.Section>

        <Card.Section p={16} className="space-y-2">
          <Radio.Group
            value={currencyType}
            onChange={(value) => setCurrencyType(value as Currency)}
          >
            <Flex gap="xs">{cards}</Flex>
          </Radio.Group>

          {/* Installation Fee */}
          <Flex align="center" justify="space-between">
            <Text fw={500}>
              {language === 'fr'
                ? 'Fonctionnalités incluses'
                : 'One-Time Installation Fee'}
            </Text>
            <Text fw={700} fz={18}>
              {formatPrice(
                pricing.totalInstallationFee,
                language,
                currencyType
              ).toLocaleString()}
            </Text>
          </Flex>

          {/* Monthly Pricing */}
          <Box>
            <Flex align="center" justify="space-between">
              <Text fw={500}>
                {language === 'fr' ? 'Prix ​​mensuel' : 'Monthly Price'}
              </Text>
              <Text fw={700} fz={18}>
                {formatPrice(
                  pricing.totalMonthlyPrice,
                  language,
                  currencyType
                ).toLocaleString()}
                /{language === 'fr' ? 'mois' : 'month'}
              </Text>
            </Flex>
            <Text fz={14} fw={600} c="dimmed">
              {formatPrice(pricing.monthlyPricePerCar, language, currencyType)}/
              {language === 'en' ? 'car' : 'voiture'}/
              {language === 'fr' ? 'mois' : 'month'} × {carCount}{' '}
              {language === 'en' ? 'car' : 'voiture'}
              {language === 'en' && carCount !== 1 ? 's' : ''}
            </Text>
          </Box>

          <Divider />

          {/* Features */}
          <Box>
            <Text fz={24} fw={700}>
              {language === 'fr'
                ? "Frais d'installation uniques"
                : 'Included Features'}
              :
            </Text>
            <FeatureComparison planType={planType} language={language} />
          </Box>

          {/* Add-on Pricing Summary */}
          {selectedAddons.some((addonId) => {
            const addon = ADDONS[language].find((a) => a.id === addonId);
            return addon?.pricing;
          }) && (
            <Box pos="relative">
              <Divider mb={16} />
              {selectedAddons.map((addonId) => {
                const addon = ADDONS[language].find((a) => a.id === addonId);
                return addon?.pricing ? (
                  <Flex direction="column" align="start" gap={16} key={addonId}>
                    {Object.entries(addon.pricing).map(([label, value]) => (
                      <Badge size="sm" key={label} variant="outline" mb={10}>
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
            <Text fw={600}>
              {language === 'fr' ? 'Modules complémentaires' : 'Add-ons'}:
            </Text>
            <Flex align="center" gap={12} wrap={{ base: 'wrap', md: 'nowrap' }}>
              {selectedAddons.length === 0 ? (
                <Text fz={12} c={'dimmed'}>
                  {language === 'fr'
                    ? 'Aucun module complémentaire sélectionné'
                    : 'No add-ons selected'}
                </Text>
              ) : (
                selectedAddons.map((addonId) => {
                  const addon = ADDONS[language].find((a) => a.id === addonId);
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
            <Text fw={500}>Total: </Text>
            <Text fw={700} fz={18}>
              {formatPrice(totalPrice, language, currencyType).toLocaleString()}
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
          >
            {shouldBookCall ? (
              <>
                <Calendar className="mr-2 h-5 w-5" />
                {language === 'fr' ? 'Réserver un appel' : 'Book a Call'}
              </>
            ) : (
              <>
                <CreditCard className="mr-2 h-5 w-5" />
                {language === 'fr' ? 'Paiement' : 'Checkout'}
              </>
            )}
          </Button>
        </Card.Section>
      </Card>
    </motion.div>
  );
};
