import { Box, InputLabel, Radio } from '@mantine/core';
import { PlanType } from '../types';
import { PLAN_CONFIGS } from '../data';

// Components
export const PlanCard = ({
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
