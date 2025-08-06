import Stripe from 'stripe';

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error(
    'STRIPE_SECRET_KEY is not defined in environment variables. Please check your .env file.'
  );
}

if (!stripeSecretKey.startsWith('sk_')) {
  throw new Error(
    'Invalid STRIPE_SECRET_KEY format. It should start with "sk_".'
  );
}

export const stripe = new Stripe(stripeSecretKey, {
  apiVersion: '2025-04-30.basil',
  typescript: true,
});
