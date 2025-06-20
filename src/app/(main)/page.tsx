import {
  Faq,
  FeatureSection,
  HeroSection,
  TextRevealByWord,
  TimelineSectionAd,
} from '@/components';
import FeatureCard from '@/components/AdvertisingSection/FeatureCard';
import { WhyChooseUsSection } from '@/components/AdvertisingSection/WhyAdvertisers';
import PricingConfigurator from '@/components/PricingSections/PriceConfigurator/PricingConfigurator';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TextRevealByWord className="">
        The Lowest CPM in OOH History
      </TextRevealByWord>
      {/* <Advertisement /> */}
      <WhyChooseUsSection />

      <FeatureSection />
      <FeatureCard />
      <TimelineSectionAd />
      {/* <PricingCards /> */}

      <PricingConfigurator />
      <Faq />
    </main>
  );
}
