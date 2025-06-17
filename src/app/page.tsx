import {
  Faq,
  FeatureSection,
  HeroSection,
  TextRevealByWord,
  TimelineSectionAd,
} from '@/components';
import FeatureCard from '@/components/AdvertisingSection/FeatureCard';
import { WhyChooseUsSection } from '@/components/AdvertisingSection/WhyAdvertisers';
import { getExchangeRates } from '@/components/PricingSections/PriceConfigurator/action/getExchangeRates';
import PricingConfigurator from '@/components/PricingSections/PriceConfigurator/PricingConfigurator';

export default async function Home() {
  const { usdToCad, date, source, error } = await getExchangeRates();

  console.log('Exchange rates:', usdToCad, date, source, error);

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
