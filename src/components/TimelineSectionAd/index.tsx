import { Box, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import TimeLineComponent from '../TimeLineComponent';
import {
  ChartNoAxesCombined,
  MapPin,
  RotateCw,
  ShoppingCart,
  Upload,
} from 'lucide-react';

const data = [
  {
    title: '1. Upload Your Ad & Customize Your Campaign',
    desc: 'Submit your creative, choose your target city or region, and select how many rideshare vehicles you’d like to activate.',
    icon: <Upload size={24} />,
  },
  {
    title: '2. Checkout Online',
    desc: 'Review your selections and pay securely through our platform. No back-and-forth, no hidden costs.',
    icon: <ShoppingCart size={24} />,
  },
  {
    title: '3. Decals in Motion',
    desc: 'We handle the logistics: your ad is printed and installed on verified drivers’ vehicles. You’re updated at every step and notified the moment your campaign goes live.',
    icon: <MapPin size={24} />,
  },
  {
    title: '4. Track Campaign Performance',
    desc: 'Track your campaign performance with weekly reports, including coverage, impressions, CPM, and photo confirmations from drivers to ensure your ads are live and visible.',
    icon: <ChartNoAxesCombined size={24} />,
  },
  {
    title: '5. Renew or Scale With a Click',
    desc: 'Easily extend your campaign, update your creative, or scale to more cities and vehicles. Enjoy flexible month-to-month terms with just one week to go live. ',
    icon: <RotateCw size={24} />,
  },
];

const TimelineSectionAd = () => {
  return (
    <Box className="relative mt-16 overflow-hidden" mb={150}>
      <Box
        maw={1000}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Title
          order={1}
          fw={700}
          ff={'var(--font-poppins)'}
          c="#333333"
          className="capitalize"
          ta="center"
        >
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
            once
          >
            Advertiser Campaign
          </TextAnimate>
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            delay={0.5}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
            once
          >
            Timeline
          </TextAnimate>
        </Title>
        <TimeLineComponent data={data} />
      </Box>
    </Box>
  );
};

export default TimelineSectionAd;
