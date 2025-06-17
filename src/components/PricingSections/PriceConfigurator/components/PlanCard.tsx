import { Box, InputLabel, Radio } from '@mantine/core';
import { Currency, PlanType } from '../types';
import { PLAN_CONFIGS } from '../data';
import { formatPrice } from '../../utils/formatPrice';

// Components
export const PlanCard = ({
  planType,
  value,
  currency,
  exchangeRate,
}: {
  planType: PlanType;
  value: string;
  currency: Currency;
  exchangeRate: number;
}) => {
  const config = PLAN_CONFIGS[planType];
  const minPrice = Math.min(...Object.values(config.pricing)) * exchangeRate;
  const maxPrice = Math.max(...Object.values(config.pricing)) * exchangeRate;
  const installationFee = config.installationFee * exchangeRate;

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
          <strong>Installation:</strong>{' '}
          {formatPrice(installationFee, currency)}/car
        </Box>
        <Box fw={700}>
          <strong>Monthly:</strong> {formatPrice(minPrice, currency)} -{' '}
          {formatPrice(maxPrice, currency)}/car
        </Box>
      </Box>
    </InputLabel>
  );
};
