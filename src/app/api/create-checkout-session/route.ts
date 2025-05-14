'use server';

import { stripe } from '@/lib';
import { NextResponse } from 'next/server';

const validOptions = [
  { cars: 1, price: 500 },
  { cars: 5, price: 2300 },
  { cars: 10, price: 4500 },
  { cars: 20, price: 9000 },
];

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { price, cars } = data;

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

    const isValid = validOptions.some(
      (option) => option.cars === cars && option.price === price
    );
    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid pricing option' },
        { status: 400 }
      );
    }

    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            unit_amount: price * 100,
            currency: 'usd',
            product_data: {
              name: `Growth Plan - ${cars} Car${cars > 1 ? 's' : ''}`,
            },
            recurring: { interval: 'month' }, // Adjust if one-time payment
          },
          quantity: 1,
        },
      ],
      payment_method_types: ['card'],
      mode: 'subscription', // Adjust if one-time payment
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
