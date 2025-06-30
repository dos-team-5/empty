import {
  AnimatedAdSection,
  Faq,
  HeroSection,
  TextRevealSection,
} from '@/components';
import AdvertiserCampaign from '@/components/AdvertiserCampaign/AdvertiserCampaign';
import BuilderSection from '@/components/CarouselFeature/BuilderSection';
import PricingConfigurator from '@/components/PricingSections/PriceConfigurator/PricingConfigurator';
import RoiCalculator from '@/components/RoiCalculator';
import ScanVsLeadSnatcher from '@/components/ScanVsLeadSnatcher/ScanVsLeadSnatcher';

export default function Home() {
  return (
    <main className="">
      <HeroSection />
      <TextRevealSection />

      {/* <Advertisement /> */}
      {/* <WhyChooseUsSection /> */}
      <AnimatedAdSection />

      {/* <RoiCalculator /> */}

      {/* <FeatureSection />
      <FeatureCard /> */}
      {/* <CarouselFeature /> */}
      <BuilderSection />

      {/* <TimelineSectionAd /> */}
      {/* <PricingCards /> */}
      <AdvertiserCampaign />
      <RoiCalculator />
      <PricingConfigurator />
      <ScanVsLeadSnatcher />
      <Faq />
    </main>
  );
}
