import {
  Advertisement,
  Faq,
  FeatureSection,
  HeroSection,
  PricingCards,
  TextReveal,
  TimelineSectionAd,
} from '@/components';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TextReveal className="">
        Go Further With Your Ad Spend Than Ever Before
      </TextReveal>
      <Advertisement />
      <FeatureSection />
      <TimelineSectionAd />
      <PricingCards />
      <Faq />
    </main>
  );
}
