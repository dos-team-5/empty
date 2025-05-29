import {
  Advertisement,
  Faq,
  FeatureSection,
  HeroSection,
  PricingCards,
  TimelineSectionAd,
} from '@/components';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <Advertisement />
      <FeatureSection />
      <TimelineSectionAd />
      <PricingCards />
      <Faq />
    </main>
  );
}
