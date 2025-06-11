import {
  Faq,
  FeatureSection,
  HeroSection,
  PricingCards,
  PrimaryBtn,
  TextRevealByWord,
  TimelineSectionAd,
} from '@/components';
import { WhyChooseUsSection } from '@/components/AdvertisingSection/WhyAdvertisers';
import { Flex } from '@mantine/core';

export default function Home() {
  return (
    <main>
      <HeroSection />
      <TextRevealByWord className="">
        The Lowest CPM in OOH History
      </TextRevealByWord>
      <Flex justify="center" align="center">
        <PrimaryBtn btnText="Don’t Believe Us?" glowOnHover />
      </Flex>
      {/* <Advertisement /> */}
      <WhyChooseUsSection />
      <FeatureSection />

      <TimelineSectionAd />
      <PricingCards />
      <Faq />
    </main>
  );
}
