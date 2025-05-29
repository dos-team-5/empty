import { Box, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import TimeLineComponent from '../TimeLineComponent';

const data = [
  {
    title: '1. Upload Your Ad & Customize Your Campaign',
    desc: 'Submit your creative, choose your target city or region, and select how many rideshare vehicles you’d like to activate.',
  },
  {
    title: '2. Checkout Online',
    desc: 'Review your selections and pay securely through our platform. No back-and-forth, no hidden costs.',
  },
  {
    title: '3. Decals in Motion',
    desc: 'We handle the logistics: your ad is printed, shipped, and installed on verified drivers’ vehicles. You’ll be notified at each stage — when decals are shipped, received, and installed.',
  },
  {
    title: '4. Track Campaign Performance',
    desc: 'Track your campaign performance with weekly reports, including coverage, impressions, CPM, and photo confirmations from drivers to ensure your ads are live and visible.',
  },
  {
    title: '5. Renew or Scale With a Click',
    desc: 'Easily extend your campaign, update your creative, or scale to more cities and vehicles. Enjoy flexible month-to-month terms with just one week to go live. ',
  },
];

const TimelineSectionAd = () => {
  return (
    <Box className="relative mt-16 overflow-hidden">
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        <Title
          order={1}
          fw={700}
          ff={'var(--font-poppins)'}
          c="#333333"
          className="capitalize"
        >
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
            once
          >
            Advertiser Campaign Timeline
          </TextAnimate>
        </Title>
        <TimeLineComponent data={data} />
      </Box>
    </Box>
  );
};

export default TimelineSectionAd;
