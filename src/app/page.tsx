import {
  Advertisement,
  Faq,
  FeatureSection,
  HeroSection,
  PricingCards,
} from '@/components';

import Link from 'next/link';

export default function Home() {
  return (
    <main>
      <Link href={'/signup/client'}>Client signup</Link>
      <Link href={'/signup/driver'}>Driver signup</Link>
      <HeroSection />
      <Advertisement />
      <FeatureSection />
      <PricingCards />
      <Faq />
    </main>
  );
}
