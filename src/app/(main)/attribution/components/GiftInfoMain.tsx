import { PrimaryBtn } from '@/components';
import { TextAnimate } from '@/components/TextAnimation';
import { Box, Flex, Image, Stack, Text, Title } from '@mantine/core';

import Link from 'next/link';
import { useMemo } from 'react';

const GiftInfoMain = () => {
  const titleContent = useMemo(
    () => (
      <>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className="text-[24px] md:text-[32px]"
          once
        >
          Know Exactly Who's Engaging
        </TextAnimate>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className="text-[24px] md:text-[32px]"
          delay={0.5}
          once
        >
          with Your OOH Campaign
        </TextAnimate>
      </>
    ),
    []
  );

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
          order={1}
          fw={700}
          c="#333333"
          ff={'var(--font-poppins)'}
          className="capitalize"
        >
          {titleContent}
        </Title>
        <Text fz={{ base: 12, sm: 13, md: 14 }} ff={'var(--font-inter)'}>
          Scan & Spin is a QR-powered tool that tracks real-time engagement with
          your out-of-home ads. By offering instant, interactive rewards, it
          provides clear insights into who’s interacting with your brand and how
          those interactions drive real-world conversions. No other OOH solution
          offers this level of precision and ROI tracking. Each user's
          information is collected, enabling you to retarget them with pinpoint
          accuracy.
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
