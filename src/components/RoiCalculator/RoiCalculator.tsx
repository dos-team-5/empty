'use client';

import { BackgroundImage, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState } from 'react';

const RoiCalculator = () => {
  const [billboardSpend, setBillboardSpend] = useState('10000');
  type PlanType = 'basic' | 'premium';

  const [selectedPlan, setSelectedPlan] = useState<PlanType>('basic');
  const [basicResults, setBasicResults] = useState({
    cars: 40,
    pricePerCar: 0,
    total: 0,
  });
  const [premiumResults, setPremiumResults] = useState({
    cars: 35,
    pricePerCar: 0,
    total: 0,
  });

  // Pricing structures - Fixed tier ranges
  const plans: Record<
    PlanType,
    {
      name: string;
      installation: number;
      tiers: { min: number; max: number; price: number }[];
    }
  > = {
    basic: {
      name: 'Basic',
      installation: 66,
      tiers: [
        { min: 1, max: 20, price: 269 },
        { min: 21, max: 50, price: 250 },
        { min: 51, max: 100, price: 241 },
        { min: 101, max: Number.POSITIVE_INFINITY, price: 232 },
      ],
    },
    premium: {
      name: 'Premium',
      installation: 210,
      tiers: [
        { min: 1, max: 20, price: 303 },
        { min: 21, max: 50, price: 282 },
        { min: 51, max: 100, price: 271 },
        { min: 101, max: Number.POSITIVE_INFINITY, price: 261 },
      ],
    },
  };

  const getPricing = (carCount: number, plan: 'basic' | 'premium') => {
    const planData = plans[plan];

    // Find the correct tier based on car count
    if (carCount >= 1 && carCount <= 20) return planData.tiers[0].price;
    if (carCount >= 21 && carCount <= 50) return planData.tiers[1].price;
    if (carCount >= 51 && carCount <= 100) return planData.tiers[2].price;
    if (carCount >= 101) return planData.tiers[3].price;

    // Fallback to first tier price
    return planData.tiers[0].price;
  };

  const calculateMaxCars = (budget: number, plan: 'basic' | 'premium') => {
    if (budget <= 0) return { cars: 0, pricePerCar: 0, total: 0 };

    for (let cars = 1; cars <= 1000; cars++) {
      const pricePerCar = getPricing(cars, plan);
      const totalMonthlyCost = cars * pricePerCar;

      if (totalMonthlyCost > budget) {
        const maxAffordableCars = cars - 1;
        if (maxAffordableCars <= 0)
          return { cars: 0, pricePerCar: 0, total: 0 };
        const finalPrice = getPricing(maxAffordableCars, plan);
        return {
          cars: maxAffordableCars,
          pricePerCar: finalPrice,
          total: maxAffordableCars * finalPrice,
        };
      }
    }

    const finalPrice = getPricing(1000, plan);
    return { cars: 1000, pricePerCar: finalPrice, total: 1000 * finalPrice };
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-CA', {
      style: 'currency',
      currency: 'CAD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleCalculate = () => {
    if (billboardSpend && Number.parseFloat(billboardSpend) > 0) {
      const budget = Number.parseFloat(billboardSpend);
      const basicCalc = calculateMaxCars(budget, 'basic');
      const premiumCalc = calculateMaxCars(budget, 'premium');
      setBasicResults(basicCalc);
      setPremiumResults(premiumCalc);
      true;
    }
  };

  const handleBillboardSpendChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setBillboardSpend(numericValue);
  };

  const currentResults =
    selectedPlan === 'basic' ? basicResults : premiumResults;
  const budget = Number.parseFloat(billboardSpend) || 0;

  const md = useMediaQuery('(min-width: 768px)');

  return (
    <div className="relative min-h-dvh">
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <BackgroundImage
          src={
            md
              ? '/roiCalculator/rcBgComputer.png'
              : '/roiCalculator/rcBgMobile.png'
          }
          className="!relative mx-auto h-dvh w-dvw bg-cover !bg-top bg-no-repeat md:h-dvh md:!bg-contain lg:scale-90"
        >
          <div className="flex h-dvh w-full flex-col items-center justify-start md:flex-row md:items-start md:justify-between">
            {/* Left Side - Input Section */}
            <div className="relative mt-8 w-full md:mt-8 md:w-[30%] lg:mt-12 xl:mt-20 xl:ml-8 2xl:mt-40">
              {/* Content */}
              <div className="relative rounded-[2.5rem] bg-transparent p-8 text-white">
                <div className="lg:space-y-1 xl:space-y-6">
                  <div>
                    <h2 className="mb-4 text-2xl leading-tight font-semibold md:mb-2 md:text-base lg:mb-4 lg:text-xl xl:text-3xl">
                      How much did you spend on billboards last month?
                    </h2>
                    <p className="text-[10px] leading-relaxed text-white md:leading-tight lg:text-sm lg:leading-relaxed xl:text-base">
                      Let's see how many cars you could get instead with our car
                      advertising service.
                    </p>
                  </div>

                  <div className="origin-left scale-65 space-y-4 md:scale-60 lg:scale-75 xl:scale-100">
                    <input
                      type="text"
                      value={billboardSpend}
                      onChange={(e) =>
                        handleBillboardSpendChange(e.target.value)
                      }
                      className="w-full rounded-md border-0 bg-[#FFDFF3] px-4 py-3 text-lg text-[#09090B] placeholder-[#09090B] placeholder:opacity-70 focus:ring-2 focus:ring-white/50 focus:outline-none xl:w-[88%]"
                    />

                    <button
                      onClick={handleCalculate}
                      disabled={
                        !billboardSpend ||
                        Number.parseFloat(billboardSpend) <= 0
                      }
                      className="w-full cursor-pointer rounded-xl border bg-white py-3 font-semibold text-[#D381B5] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:bg-white disabled:opacity-70 xl:w-[88%]"
                    >
                      Calculate
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side - Results */}
            <div className="mt-24 flex min-h-[300px] w-full items-center justify-center md:mt-12 md:w-[70%] lg:mt-32 xl:mt-44 2xl:mt-64">
              {/* Plan Toggle - Top Right */}
              <div className="absolute top-[1.2%] right-[6.5%] z-10 origin-top-right scale-75 lg:top-[2.5%] lg:scale-100 xl:right-[8%] 2xl:right-[6.5%]">
                <div className="flex rounded-full border border-[#672AA3] bg-transparent">
                  <button
                    onClick={() => setSelectedPlan('basic')}
                    className={`w-36 cursor-pointer rounded-tl-full rounded-bl-full border-r border-[#672AA3] py-2 text-sm font-medium transition-all ${
                      selectedPlan === 'basic'
                        ? 'bg-white font-medium text-[#1D192B]'
                        : 'bg-transparent'
                    }`}
                  >
                    Basic Plan
                  </button>
                  <button
                    onClick={() => setSelectedPlan('premium')}
                    className={`w-36 cursor-pointer rounded-tr-full rounded-br-full border-l border-[#672AA3] py-2 text-sm font-medium transition-all ${
                      selectedPlan === 'premium'
                        ? 'bg-white font-medium text-[#1D192B]'
                        : 'bg-transparent'
                    }`}
                  >
                    Premium Plan
                  </button>
                </div>
              </div>
              <div className="space-y-6 text-center">
                <div>
                  <p className="max-w-xs text-2xl leading-tight font-bold text-gray-800 md:max-w-sm lg:max-w-lg lg:text-3xl xl:max-w-xl xl:text-4xl">
                    For{' '}
                    <span className="text-purple-400">
                      {formatCurrency(budget)}
                    </span>{' '}
                    you could get{' '}
                    <span className="text-purple-400">
                      {currentResults.cars}
                    </span>{' '}
                    cars, driving with your ad full-time.
                  </p>
                </div>

                <p className="text-sm text-gray-600">
                  *One-time installation fee of{' '}
                  {formatCurrency(plans[selectedPlan].installation)} per car
                </p>
              </div>
            </div>
          </div>
        </BackgroundImage>
      </Box>
    </div>
  );
};

export default RoiCalculator;
