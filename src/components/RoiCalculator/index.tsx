'use client';

import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';
import { useLanguage } from '@/providers/languageToggleContext';
import { BackgroundImage, Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useState, useEffect } from 'react';

const RoiCalculator = () => {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];
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
    } else {
      setBasicResults({ cars: 0, pricePerCar: 0, total: 0 });
      setPremiumResults({ cars: 0, pricePerCar: 0, total: 0 });
    }
  };

  const handleBillboardSpendChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setBillboardSpend(numericValue);
  };

  // Trigger calculation on billboardSpend change
  useEffect(() => {
    handleCalculate();
  }, [billboardSpend]);

  const currentResults =
    selectedPlan === 'basic' ? basicResults : premiumResults;
  const budget = Number.parseFloat(billboardSpend) || 0;

  const md = useMediaQuery('(min-width: 768px)');

  return (
    <div className="relative">
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        mb={160}
      >
        <BackgroundImage
          src={
            md
              ? '/roiCalculator/rcBgComputer.png'
              : '/roiCalculator/rcBgMobile.png'
          }
          className="!relative mx-auto h-[810px] w-[349px] !bg-contain !bg-center bg-no-repeat md:h-auto md:w-auto md:!bg-contain lg:scale-90"
        >
          <div className="relative md:h-[50dvh] md:w-full lg:h-dvh">
            <div className="flex h-full w-full flex-col items-center justify-center md:flex-row md:items-center md:justify-center">
              {/* Left Side - Input Section */}
              <div
                className={`relative w-full origin-top ${language === 'fr' ? 'scale-80 lg:scale-90 xl:scale-100' : 'scale-90 md:scale-100'} md:w-[30%] md:origin-center`}
              >
                {/* Content */}
                <div className="relative rounded-[2.5rem] bg-transparent p-8 text-white">
                  <div className="lg:space-y-1 xl:space-y-6">
                    <div>
                      <h2
                        className={`mb-4 text-2xl leading-tight font-semibold md:mb-2 md:text-base lg:mb-4 lg:text-xl xl:text-2xl 2xl:text-3xl`}
                      >
                        {content.ROISection.inputSection.title}
                      </h2>
                      <p className="text-[10px] leading-relaxed text-white md:leading-tight lg:text-sm lg:leading-relaxed xl:text-base">
                        {content.ROISection.inputSection.subTitle}
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
                        {content.ROISection.inputSection.btnText}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Results */}
              <div
                className={`relative flex min-h-[300px] w-full items-center justify-center md:mt-0 md:w-[70%] ${language === 'fr' ? 'scale-80 xl:scale-90 2xl:scale-100' : 'mt-24 scale-100'}`}
              >
                <div className="space-y-6 text-center">
                  {/* Plan Toggle - Top Right */}
                  <div
                    className={`flex items-center justify-center ${language === 'fr' ? '2xl:pb-20' : '2xl:pb-12'}`}
                  >
                    <div className="flex rounded-full border border-[#672AA3] bg-transparent">
                      <button
                        onClick={() => setSelectedPlan('basic')}
                        className={`w-36 cursor-pointer rounded-tl-full rounded-bl-full border-r border-[#672AA3] py-2 text-sm font-medium transition-all ${
                          selectedPlan === 'basic'
                            ? 'bg-white font-medium text-[#1D192B]'
                            : 'bg-transparent'
                        }`}
                      >
                        {content.ROISection.resultSection.toggleBtnBasic}
                      </button>
                      <button
                        onClick={() => setSelectedPlan('premium')}
                        className={`w-36 cursor-pointer rounded-tr-full rounded-br-full border-l border-[#672AA3] py-2 text-sm font-medium transition-all ${
                          selectedPlan === 'premium'
                            ? 'bg-white font-medium text-[#1D192B]'
                            : 'bg-transparent'
                        }`}
                      >
                        {content.ROISection.resultSection.toggleBtnpremium}
                      </button>
                    </div>
                  </div>
                  <div>
                    <p className="max-w-xs text-4xl leading-tight font-bold text-gray-800 md:max-w-sm lg:max-w-lg lg:text-5xl xl:max-w-xl xl:scale-110 2xl:scale-140 2xl:pb-8">
                      {content.ROISection.resultSection.resultMainContent.line1}{' '}
                      <span className="text-purple-400">
                        {formatCurrency(budget)}
                      </span>{' '}
                      {content.ROISection.resultSection.resultMainContent.line2}{' '}
                      <span className="text-purple-400">
                        {currentResults.cars}
                      </span>{' '}
                      {content.ROISection.resultSection.resultMainContent.line3}
                    </p>
                  </div>

                  <p className="text-sm text-gray-600 2xl:pt-4">
                    {content.ROISection.resultSection.resultSubContent.line1}{' '}
                    {formatCurrency(plans[selectedPlan].installation)}{' '}
                    {content.ROISection.resultSection.resultSubContent.line2}
                  </p>
                </div>
              </div>
            </div>{' '}
          </div>
        </BackgroundImage>
      </Box>
    </div>
  );
};

export default RoiCalculator;
