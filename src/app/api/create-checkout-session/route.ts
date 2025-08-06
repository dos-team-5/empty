import { stripe } from '@/lib/stripe';
import { NextResponse } from 'next/server';

// Pricing configuration matching the frontend
const PLAN_CONFIGS = {
  basic: {
    installationFee: 66.0,
    pricing: { tier1: 269.0, tier2: 269.0, tier3: 269.0, tier4: 269.0 },
  },
  premium: {
    installationFee: 210,
    pricing: { tier1: 303.0, tier2: 282.0, tier3: 271.0, tier4: 261.0 },
  },
};

const CAR_COUNT_TIERS = [
  { min: 1, max: 20, tier: 'tier1' as const },
  { min: 21, max: 50, tier: 'tier2' as const },
  { min: 51, max: 100, tier: 'tier3' as const },
  { min: 101, max: Infinity, tier: 'tier4' as const },
];

// Function to calculate pricing based on plan type, car count, and months
function calculatePrice(planType: 'basic' | 'premium', carCount: number, months: number, currency: 'cad' | 'usd' = 'cad', exchangeRate: number = 1) {
  const config = PLAN_CONFIGS[planType];
  const tier = CAR_COUNT_TIERS.find((t) => carCount >= t.min && carCount <= t.max)?.tier ?? 'tier4';
  
  let monthlyPricePerCar = config.pricing[tier];
  let installationFee = config.installationFee;
  
  // Convert if USD
  if (currency === 'usd') {
    monthlyPricePerCar = Math.round(monthlyPricePerCar * exchangeRate);
    installationFee = Math.round(installationFee * exchangeRate);
  }
  
  const totalMonthlyPrice = monthlyPricePerCar * carCount;
  const totalInstallationFee = installationFee * carCount;
  
  return totalMonthlyPrice * months + totalInstallationFee;
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { price, cars, planType = 'basic', months = 1, currency = 'cad', exchangeRate = 1 } = data;

    // Validate required parameters
    if (
      typeof price !== 'number' ||
      typeof cars !== 'number' ||
      price <= 0 ||
      cars <= 0
    ) {
      return NextResponse.json(
        { error: 'Invalid price or cars value' },
        { status: 400 }
      );
    }

    // Validate plan type
    if (!['basic', 'premium'].includes(planType)) {
      return NextResponse.json(
        { error: 'Invalid plan type. Must be "basic" or "premium"' },
        { status: 400 }
      );
    }

    // Calculate expected price based on parameters
    const expectedPrice = calculatePrice(planType, cars, months, currency, exchangeRate);
    
    // Allow for small rounding differences (within $1)
    const priceDifference = Math.abs(price - expectedPrice);
    if (priceDifference > 1) {
      return NextResponse.json(
        { 
          error: 'Price mismatch', 
          expected: expectedPrice, 
          received: price,
          details: { planType, cars, months, currency, exchangeRate }
        },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            unit_amount: price * 100,
            currency: currency === 'usd' ? 'usd' : 'cad',
            product_data: {
              name: `${planType.charAt(0).toUpperCase() + planType.slice(1)} Plan - ${cars} Car${cars > 1 ? 's' : ''} for ${months} Month${months > 1 ? 's' : ''}`,
              description: `${planType.charAt(0).toUpperCase() + planType.slice(1)} advertising plan including installation and ${months} month${months > 1 ? 's' : ''} of service`,
            },
            recurring: months === 1 ? undefined : { interval: 'month' }, // One-time payment for single month, recurring for multiple
          },
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      mode: months === 1 ? 'payment' : 'subscription', // One-time payment for single month, subscription for multiple
      phone_number_collection: { enabled: true }, // Enable phone number collection
      automatic_tax: { enabled: false },
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/paymentResult?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/`,
    });

    // Return the redirect URL for the Stripe checkout
    if (session.url) {
      return NextResponse.json({ redirectUrl: session.url });
    } else {
      return NextResponse.json(
        { error: 'Failed to generate checkout URL' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return NextResponse.json(
      { error: 'Failed to process payment. Please try again later.' },
      { status: 500 }
    );
  }
}
