import {
  AnimatedAdSection,
  CarouselFeature,
  Faq,
  HeroSection,
  TextRevealByWord,
  TimelineSectionAd,
} from '@/components';
import PricingConfigurator from '@/components/PricingSections/PriceConfigurator/PricingConfigurator';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TextRevealByWord className="">
        The Lowest CPM in OOH History
      </TextRevealByWord>
      {/* <Advertisement /> */}
      {/* <WhyChooseUsSection /> */}
      <AnimatedAdSection />

      {/* <FeatureSection />
      <FeatureCard /> */}
      <CarouselFeature />
      
      <TimelineSectionAd />
      {/* <PricingCards /> */}

      <PricingConfigurator />
      <Faq />
    </main>
  );
}
