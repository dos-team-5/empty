'use client';
import { Box, Flex, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import TimeLineComponent from '../TimeLineComponent';
import { useLanguage } from '@/providers/languageToggleContext';
import { getDrivePageContent } from '@/contents/drive/driveLandingPage';

const TimelineSectionDrive = () => {
  const { language } = useLanguage();
  const content = getDrivePageContent[language];
  const data = content.timeLine.data;
  return (
    <Box className="relative my-2 mt-16 overflow-hidden">
      <Flex
        direction={'column'}
        align={'center'}
        justify={'center'}
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
          ta={'center'}
        >
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl"
            once
          >
            {content.timeLine.title}
          </TextAnimate>
        </Title>

        <TimeLineComponent data={data} />

        {/* <Title
          order={1}
          fw={700}
          ff={'var(--font-poppins)'}
          c="#5E5E5E"
          className="capitalize"
        >
          <TextAnimate
            animation="blurInUp"
            by="word"
            startOnView
            duration={0.5}
            className="!my-8 text-lg md:text-2xl lg:text-xl xl:text-2xl 2xl:text-3xl"
            once
          >
            Earn more with no extra work—just drive!
          </TextAnimate>
        </Title> */}
      </Flex>
    </Box>
  );
};

export default TimelineSectionDrive;
