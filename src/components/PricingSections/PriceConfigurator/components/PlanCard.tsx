'use client';
import { Box, InputLabel, Radio } from '@mantine/core';
import { Currency, PlanType } from '../types';
import { PLAN_CONFIGS } from '../data';
import { formatPrice } from '../../utils/formatPrice';
import { Dispatch, SetStateAction } from 'react';
import { useLanguage } from '@/providers/languageToggleContext';

// Components
export const PlanCard = ({
  planType,
  value,
  currency,
  exchangeRate,
  setAddonSelections,
}: {
  planType: PlanType;
  value: string;
  currency: Currency;
  exchangeRate: number;
  setAddonSelections: Dispatch<SetStateAction<Record<string, boolean>>>;
}) => {
  const { language } = useLanguage();
  const config = PLAN_CONFIGS[language][planType];
  const minPrice = Math.min(...Object.values(config.pricing)) * exchangeRate;
  const maxPrice = Math.max(...Object.values(config.pricing)) * exchangeRate;
  const installationFee = config.installationFee * exchangeRate;

  return (
    <InputLabel
      htmlFor={planType}
      className="[&:has(:checked)]:border-primary [&:has(:checked)]:bg-primary/5 block cursor-pointer rounded-lg border-2 border-gray-300 p-4 hover:border-gray-300"
    >
      <Box className="mb-3 flex items-center space-x-2">
        <Radio
          value={value}
          id={planType}
          onChange={() => {
            setAddonSelections({ scanAndSpin: false, deviceIdPassBack: false });
          }}
        />
        <span className="text-lg font-semibold capitalize">{planType}</span>
      </Box>
      <Box className="space-y-2 text-sm">
        <Box fw={700}>
          <strong>Installation:</strong>{' '}
          {formatPrice(installationFee, language, currency)}/
          {language === 'fr' ? 'voiture' : 'car'}
        </Box>
        <Box fw={700}>
          <strong>{language === 'fr' ? 'Mensuel' : 'Monthly'}:</strong>{' '}
          {formatPrice(minPrice, language, currency)} -{' '}
          {formatPrice(maxPrice, language, currency)}/
          {language === 'fr' ? 'voiture' : 'car'}
        </Box>
      </Box>
    </InputLabel>
  );
};
