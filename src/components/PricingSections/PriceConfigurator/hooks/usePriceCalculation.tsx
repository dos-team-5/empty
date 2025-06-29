import { useMemo } from 'react';
import { PlanType, Currency } from '../types';
import { CAR_COUNT_TIERS, Language, PLAN_CONFIGS } from '../data';

export const usePricingCalculation = (
  planType: PlanType,
  carCount: number,
  language: Language,
  currency: Currency = 'cad', // 'usd' | 'cad'
  exchangeRate: number = 1 // USD to CAD rate
) => {
  return useMemo(() => {
    const config = PLAN_CONFIGS[language][planType];
    const tier =
      CAR_COUNT_TIERS.find((t) => carCount >= t.min && carCount <= t.max)
        ?.tier ?? 'tier4';

    let monthlyPricePerCar = config.pricing[tier];
    let installationFee = config.installationFee;

    // Convert if CAD
    if (currency === 'usd') {
      monthlyPricePerCar = Math.round(monthlyPricePerCar * exchangeRate);
      installationFee = Math.round(installationFee * exchangeRate);
    }

    return {
      installationFee,
      monthlyPricePerCar,
      totalMonthlyPrice: monthlyPricePerCar * carCount,
      totalInstallationFee: installationFee * carCount,
    };
  }, [planType, carCount, currency, exchangeRate, language]);
};
