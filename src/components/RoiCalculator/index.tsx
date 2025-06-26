'use client';

import { useState } from 'react';
import {
  Car,
  DollarSign,
  TrendingUp,
  Calculator,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function Component() {
  const [billboardSpend, setBillboardSpend] = useState('');
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium'>(
    'basic'
  );
  const [basicResults, setBasicResults] = useState({
    cars: 0,
    pricePerCar: 0,
    total: 0,
  });
  const [premiumResults, setPremiumResults] = useState({
    cars: 0,
    pricePerCar: 0,
    total: 0,
  });
  const [showResults, setShowResults] = useState(false);

  // Pricing structures - Fixed tier ranges
  const plans = {
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
      setShowResults(true);
    }
  };

  const handleBillboardSpendChange = (value: string) => {
    const numericValue = value.replace(/[^0-9.]/g, '');
    setBillboardSpend(numericValue);
  };

  const currentResults =
    selectedPlan === 'basic' ? basicResults : premiumResults;
  const budget = Number.parseFloat(billboardSpend) || 0;
  const savingsPercentage =
    currentResults.total > 0
      ? Math.round(((budget - currentResults.total) / budget) * 100)
      : 0;
  const annualSavings = (budget - currentResults.total) * 12;
  const efficiencyPercentage =
    currentResults.cars > 0
      ? Math.round((currentResults.cars / (budget / 1000)) * 100)
      : 0;

  return (
    <div className="mt-50  p-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-[400px_1fr]">
          {/* Left Side - Input */}
          <div className="rounded-[20px] border border-pink-300/20 bg-white/90 p-10 shadow-[0_20px_40px_rgba(0,0,0,0.1)] backdrop-blur-3xl min-h-120">
            <div className="space-y-4">
              <div className="pb-4 text-center">
                <div className="from-primary mx-auto mb-4 flex h-[60px] w-[60px] items-center justify-center rounded-full bg-gradient-to-br to-[#B86BA0]">
                  <Calculator size={28} className="text-white" />
                </div>
                <h2 className="mb-2 text-xl font-bold text-slate-800">
                  How much did you spend on billboards last month?
                </h2>
                <p className="text-base text-slate-600">
                  Let's see how many cars you could get instead!
                </p>
              </div>

              <div className="relative pb-4">
                <DollarSign
                  size={20}
                  className="text-primary absolute top-1/2 left-[3.5rem] z-10 -translate-y-1/2 transform"
                />
                <input
                  type="text"
                  placeholder="$0"
                  value={billboardSpend}
                  onChange={(e) => handleBillboardSpendChange(e.target.value)}
                  className="focus:border-primary h-20 w-full rounded-xl border-2 border-slate-200 bg-slate-50 pl-[3.5rem] text-center text-[2rem] font-bold text-slate-800 transition-all focus:bg-white focus:ring-4 focus:ring-[rgba(212,130,182,0.1)] focus:outline-none"
                />
              </div>

              <button
                onClick={handleCalculate}
                disabled={
                  !billboardSpend || Number.parseFloat(billboardSpend) <= 0
                }
                className="from-primary flex h-[60px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r to-[#B86BA0] !text-lg !font-bold text-white shadow-[0_8px_20px_rgba(212,130,182,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(212,130,182,0.4)] disabled:transform-none disabled:bg-slate-300 disabled:text-slate-500 disabled:shadow-none"
              >
                Calculate
                <ArrowRight size={20} />
              </button>
              {showResults && (
                <Link
                  href={'/contact'}
                  className="from-primary flex h-[60px] w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r to-[#B86BA0] text-lg font-bold text-white shadow-[0_8px_20px_rgba(212,130,182,0.3)] transition-all hover:-translate-y-0.5 hover:shadow-[0_12px_30px_rgba(212,130,182,0.4)]"
                >
                  Get Started
                  <ArrowRight size={20} />
                </Link>
              )}
            </div>
          </div>

          {/* Right Side - Results */}
          <div>
            {showResults ? (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {/* Main Result Card */}
                <div className="from-primary col-span-full rounded-2xl bg-gradient-to-r to-[#B86BA0] p-8 text-white shadow-[0_20px_40px_rgba(212,130,182,0.3)]">
                  {/* Plan Toggle */}
                  <div className="mb-6 flex justify-end">
                    <div className="rounded-xl border border-white/30 bg-white/20 p-1 backdrop-blur-sm">
                      <div className="flex">
                        <button
                          onClick={() => setSelectedPlan('basic')}
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                            selectedPlan === 'basic'
                              ? 'text-primary bg-white shadow-md'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          Basic Plan
                        </button>
                        <button
                          onClick={() => setSelectedPlan('premium')}
                          className={`rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                            selectedPlan === 'premium'
                              ? 'text-primary bg-white shadow-md'
                              : 'text-white/80 hover:text-white'
                          }`}
                        >
                          Premium Plan
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="mb-2 text-lg font-semibold opacity-90">
                        Cars Available for Your Budget
                      </p>
                      <p className="text-6xl leading-none font-light">
                        {currentResults.cars.toLocaleString()}
                      </p>
                      <p className="mt-2 text-base opacity-90">
                        {plans[selectedPlan].name} Plan •{' '}
                        {formatCurrency(currentResults.pricePerCar)}/month per
                        car
                      </p>
                      <p className="mt-2 text-sm opacity-80">
                        *One-time installation fee of{' '}
                        {formatCurrency(plans[selectedPlan].installation)} per
                        car
                      </p>
                    </div>
                    <Car size={80} className="opacity-80" />
                  </div>
                </div>

                {/* Annual Savings */}
                <div className="rounded-2xl border border-pink-300/20 bg-white/90 p-6 shadow-[0_10px_25px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp size={20} className="text-emerald-500" />
                    <p className="text-sm font-semibold tracking-wide text-slate-600 uppercase">
                      Annual Savings
                    </p>
                  </div>
                  <p className="text-[2rem] font-extrabold text-emerald-500">
                    {annualSavings > 0 ? formatCurrency(annualSavings) : '$0'}
                  </p>
                  <p className="text-xs text-slate-600">
                    Potential yearly savings
                  </p>
                </div>

                {/* Efficiency Percentage */}
                <div className="rounded-2xl border border-pink-300/20 bg-white/90 p-6 shadow-[0_10px_25px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
                  <div className="mb-2 flex items-center gap-2">
                    <Calculator size={20} className="text-blue-500" />
                    <p className="text-sm font-semibold tracking-wide text-slate-600 uppercase">
                      ROI Efficiency
                    </p>
                  </div>
                  <p className="text-[2rem] font-extrabold text-blue-500">
                    {efficiencyPercentage}%
                  </p>
                  <p className="text-xs text-slate-600">
                    Coverage efficiency rate
                  </p>
                </div>

                {/* Monthly Cost */}
                <div className="rounded-2xl border border-pink-300/20 bg-white/90 p-6 shadow-[0_10px_25px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
                  <p className="mb-2 text-sm font-semibold tracking-wide text-slate-600 uppercase">
                    Monthly Investment
                  </p>
                  <p className="text-[2rem] font-extrabold text-slate-800">
                    {formatCurrency(currentResults.total)}
                  </p>
                  <p className="text-xs text-slate-600">Total monthly cost</p>
                </div>

                {/* Daily Reach Impact */}
                <div className="rounded-2xl border border-pink-300/20 bg-white/90 p-6 shadow-[0_10px_25px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
                  <div className="mb-2 flex items-center gap-2">
                    <TrendingUp size={20} className="text-amber-500" />
                    <p className="text-sm font-semibold tracking-wide text-slate-600 uppercase">
                      Daily Reach Impact
                    </p>
                  </div>
                  <p className="text-[2rem] font-extrabold text-amber-500">
                    {(currentResults.cars * 1500).toLocaleString()}
                  </p>
                  <p className="text-xs text-slate-600">
                    People reached daily vs static billboards
                  </p>
                </div>

                {/* Summary */}
                <div className="col-span-full rounded-2xl border border-pink-300/20 bg-white/90 p-8 shadow-[0_10px_25px_rgba(0,0,0,0.1)] backdrop-blur-3xl">
                  <p className="text-lg leading-relaxed font-semibold text-slate-800">
                    Your{' '}
                    <strong className="text-primary">
                      {formatCurrency(budget)}
                    </strong>{' '}
                    billboard budget could get you{' '}
                    <strong className="text-primary">
                      {currentResults.cars} cars
                    </strong>{' '}
                    reaching{' '}
                    <strong className="text-amber-500">
                      {(currentResults.cars * 1500).toLocaleString()} people
                      daily
                    </strong>{' '}
                    across the entire city with our {plans[selectedPlan].name}{' '}
                    plan!
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex min-h-120 items-center justify-center rounded-2xl border-2 border-dashed border-pink-300/30 bg-white/50 p-16 text-center backdrop-blur-3xl">
                <div>
                  <Car
                    size={80}
                    className="text-primary mx-auto mb-8 opacity-50"
                  />
                  <h3 className="mb-2 text-xl font-semibold text-slate-600">
                    Ready to Calculate?
                  </h3>
                  <p className="text-base text-slate-500">
                    Enter your billboard spend to see your ROI results
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
