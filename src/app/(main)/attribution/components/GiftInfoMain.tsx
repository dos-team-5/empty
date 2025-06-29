'use client';
import { PrimaryBtn } from '@/components';
import { TextAnimate } from '@/components/TextAnimation';
import { attributionPageContent } from '@/contents/attribution/attributionPage';
import { useLanguage } from '@/providers/languageToggleContext';
import { Box, Flex, Image, Stack, Text, Title } from '@mantine/core';

import Link from 'next/link';
import { useMemo } from 'react';

const GiftInfoMain = () => {
  const { language } = useLanguage();
  const content = attributionPageContent[language];

  const titleContent = useMemo(
    () => (
      <>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className={`text-[24px] ${language === 'fr' ? 'md:text-[20px]' : 'md:text-[32px]'}`}
          once
        >
          {content.heroSection.title.line1}
        </TextAnimate>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className={`text-[24px] ${language === 'fr' ? 'md:text-[20px]' : 'md:text-[32px]'}`}
          delay={0.5}
          once
        >
          {content.heroSection.title.line2}
        </TextAnimate>
      </>
    ),
    [language, content.heroSection.title.line1, content.heroSection.title.line2]
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
          {content.heroSection.description}
        </Text>
        <Link href={'/contact'}>
          {' '}
          <PrimaryBtn btnText={content.heroSection.button} glow arrow={false} />
        </Link>
      </Stack>
      {/* right section */}
      <Box w={{ base: '50%', sm: '25%' }}>
        {/* <Image alt="svg" src="spinnerLogo.svg" /> */}
        <Image
          title="Attribution Empty Ip"
          alt="svg"
          src="/attribution/Empty-Ip.png"
        />
      </Box>
    </Flex>
  );
};

export default GiftInfoMain;
