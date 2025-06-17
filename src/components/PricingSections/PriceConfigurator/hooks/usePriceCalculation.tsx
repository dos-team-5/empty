import { useMemo } from 'react';
import { Currency, PlanType } from '../types';
import { CAR_COUNT_TIERS, PLAN_CONFIGS } from '../data';

export const usePricingCalculation = (
  planType: PlanType,
  carCount: number,
  currency?: Currency
) => {
  return useMemo(() => {
    const config = PLAN_CONFIGS[planType];
    const tier =
      CAR_COUNT_TIERS.find((t) => carCount >= t.min && carCount <= t.max)
        ?.tier ?? 'tier4';
    const monthlyPricePerCar = config.pricing[tier];

    return {
      installationFee: config.installationFee,
      monthlyPricePerCar,
      totalMonthlyPrice: monthlyPricePerCar * carCount,
      totalInstallationFee: config.installationFee * carCount,
    };
  }, [planType, carCount]);
};
