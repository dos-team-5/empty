import { PrimaryBtn } from '@/components';
import { TextAnimate } from '@/components/TextAnimation';
import { Box, Flex, Image, Stack, Text, Title } from '@mantine/core';

import Link from 'next/link';

const GiftInfoMain = () => {
  return (
    <Flex
      justify="space-between"
      my={100}
      maw={1000}
      mx="auto"
      direction={{ base: 'column', sm: 'row' }}
      align="center"
      gap={25}
    >
      {/* left section */}
      <Stack w={{ base: '100%', sm: '50%' }} gap={30}>
        <Title
          ff={'var(--font-poppins)'}
          fw={600}
          fz={{ base: 22, sm: 30, md: 40 }}
        >
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            once
          >
            Want More Than Just Impressions?
          </TextAnimate>
        </Title>
        <Text fz={{ base: 12, sm: 13, md: 14 }} ff={'var(--font-inter)'}>
          Scan & Spin is our QR-powered add-on that lets people scan your ad,
          spin a digital wheel, and have a chance to win prizes, discounts, or
          free items related to your brand. It turns your mobile ad into an
          exciting and interactive experience, driving real-world engagement,
          retargetable warm leads, and online virality that makes your brand the
          one people remember
        </Text>
        <Link href={'/contact'}>
          {' '}
          <PrimaryBtn btnText="Book A Call" glow arrow={false} />
        </Link>
      </Stack>
      {/* right section */}
      <Box w={{ base: '50%', sm: '25%' }}>
        {/* <Image alt="svg" src="spinnerLogo.svg" /> */}
        <Image alt="svg" src="/attribution/Empty-Ip.png" />
      </Box>
    </Flex>
  );
};

export default GiftInfoMain;
