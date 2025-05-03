import {
  Advertisement,
  Faq,
  FeatureSection,
  HeroSection,
  PricingCards,
} from '@/components';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Advertisement />
      <FeatureSection />
      <PricingCards />
      <Faq />
    </main>
  );
}
