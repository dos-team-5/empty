import {
  Faq,
  FeatureSection,
  HeroSection,
  PricingCards,
  PrimaryBtn,
  TextRevealByWord,
  TimelineSectionAd,
} from '@/components';
import FeatureCard from '@/components/AdvertisingSection/FeatureCard';
import { WhyChooseUsSection } from '@/components/AdvertisingSection/WhyAdvertisers';
import { Flex } from '@mantine/core';

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
      <PricingCards />
      <Faq />
    </main>
  );
}
