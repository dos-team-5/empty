import {
  AnimatedAdSection,
  CarouselFeature,
  Faq,
  HeroSection,
  TextRevealByWord,
  TimelineSectionAd,
} from '@/components';
import AdvertiserCampaign from '@/components/AdvertiserCampaign/AdvertiserCampaign';
import PricingConfigurator from '@/components/PricingSections/PriceConfigurator/PricingConfigurator';
import ScanVsLeadSnatcher from '@/components/ScanVsLeadSnatcher/ScanVsLeadSnatcher';

export default function Home() {
  return (
    <main className=''>
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

      {/* <TimelineSectionAd /> */}
      {/* <PricingCards /> */}
      <AdvertiserCampaign />
      <PricingConfigurator />
      <ScanVsLeadSnatcher />
      <Faq />
    </main>
  );
}
