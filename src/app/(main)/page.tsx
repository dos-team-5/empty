import {
  AnimatedAdSection,
  CarouselFeature,
  Faq,
  HeroSection,
  TextRevealByWord,
} from '@/components';
import AdvertiserCampaign from '@/components/AdvertiserCampaign/AdvertiserCampaign';
import PricingConfigurator from '@/components/PricingSections/PriceConfigurator/PricingConfigurator';
import RoiCalculator from '@/components/RoiCalculator';
import ScanVsLeadSnatcher from '@/components/ScanVsLeadSnatcher/ScanVsLeadSnatcher';
import Head from 'next/head';

export default function Home() {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}`} />
        <title>Home-Empty</title>
      </Head>
      <main className="">
        <HeroSection />
        <TextRevealByWord className="">
          The Lowest CPM in OOH History
        </TextRevealByWord>
        {/* <Advertisement /> */}
        {/* <WhyChooseUsSection /> */}
        <AnimatedAdSection />

        <RoiCalculator />

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
    </>
  );
}
