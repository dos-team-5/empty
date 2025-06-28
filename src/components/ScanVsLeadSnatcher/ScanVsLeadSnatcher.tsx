'use client';

import { memo, useState /*, useEffect */ } from 'react';
import {
  Box,
  Flex,
  Group,
  Image,
  Paper,
  Text,
  Title,
  ActionIcon,
} from '@mantine/core';
import { Icon } from '@iconify/react';
import { TextAnimate } from '../TextAnimation';
import { useLanguage } from '@/providers/languageToggleContext';
import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';

export default function ScanVsLeadSnatcher() {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay (Commented)

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % slides.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);

  const slide = content.SSvsLSSection.slides[currentSlide];

  const TitleSection = memo(() => (
    <div className="rounded-3xl">
      <Title
        order={1}
        fw={700}
        c="#000000"
        ff={'var(--font-poppins)'}
        className="text-center capitalize"
      >
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className="md:text-[52px] lg:text-[48px] xl:text-[48px] 2xl:text-[64px]"
          once
        >
          {content.SSvsLSSection.title}
        </TextAnimate>
      </Title>
    </div>
  ));

  TitleSection.displayName = 'TitleSection';

  return (
    <Box py={24} mb={160} px={16} mx="auto" maw={{ lg: 900, xl: 1180 }}>
      {/* Header */}
      <Group justify="center">
        <TitleSection />
        <Text
          mt={{ base: 4 }}
          mb={{ base: 12, md: 20, xl: 55 }}
          ta="center"
          fz={{ base: 14, md: 20, xl: 22 }}
          maw={700}
        >
          {content.SSvsLSSection.subTitle}
        </Text>
      </Group>

      {/* Slide progress and title */}
      <Flex
        align="center"
        justify="center"
        mb={32}
        gap={{ base: 16, lg: 32 }}
        wrap="wrap"
      >
        <Text fz={{ base: 22, lg: 28 }} fw={600} ta="center">
          {slide.title}
        </Text>
        <Box
          w={300}
          h={{ base: 8, md: 12 }}
          bg="#E0E0E0"
          className="cursor-pointer overflow-hidden rounded-full"
          pos="relative"
          style={{ display: 'flex' }}
          onClick={() => {
            if (currentSlide === 0) {
              setCurrentSlide(1);
            } else {
              setCurrentSlide(0);
            }
          }}
        >
          <Box
            w="50%"
            h="100%"
            className={`${currentSlide === 1 ? 'translate-x-full' : ''} bg-[#FF83D5] duration-300`}
          />
        </Box>
      </Flex>

      {/* Slide container with gradient background */}
      <Flex
        bg={'#F5F5F5'}
        key={slide.id}
        className={`rounded-[40px]`}
        direction={{ base: 'column', md: 'row' }}
        gap={0}
      >
        {/* Description */}
        <Flex
          align={'start'}
          direction="column"
          justify="space-between"
          px={{ base: 16, xl: 36 }}
          pt={{ base: 16, md: 28, lg: 55 }}
          pb={{ base: 16, md: 26 }}
          w={{ base: '100%', md: 370 }}
        >
          <Group>
            <Group mb={'xs'}>
              <Text c="#555555" fz={20} fw={500}>
                {slide.subtitle}
              </Text>
            </Group>
            <Text className="min-h-55 md:min-h-30" c="#4A4A4A" fz="sm">
              {slide.description}
            </Text>
          </Group>

          {/* Navigation */}
          <Flex mt={20} gap="xs">
            <ActionIcon
              bg="#FF83D5"
              w={{ base: 36, md: 40, lg: 49 }}
              h={{ base: 36, md: 40, lg: 49 }}
              radius="xl"
              onClick={() => {
                // setTimeout(() => {
                setCurrentSlide((prev) =>
                  prev === 0
                    ? content.SSvsLSSection.slides.length - 1
                    : prev - 1
                );
                // }, 1500); // 500ms delay
              }}
              aria-label="Previous slide"
            >
              <Icon icon="mingcute:arrow-left-line" width={24} />
            </ActionIcon>
            <ActionIcon
              bg="#FF83D5"
              w={{ base: 36, md: 40, lg: 49 }}
              h={{ base: 36, md: 40, lg: 49 }}
              radius="xl"
              onClick={() => {
                // setTimeout(() => {
                setCurrentSlide((prev) =>
                  prev === content.SSvsLSSection.slides.length - 1
                    ? 0
                    : prev + 1
                );
                // }, 1500); // 500ms delay
              }}
              aria-label="Next slide"
            >
              <Icon icon="mingcute:arrow-right-line" width={24} />
            </ActionIcon>
          </Flex>
        </Flex>

        {/* Image */}
        <Paper
          w={{ base: '100%', md: 810 }}
          py={{ base: 16, md: 36, lg: 64 }}
          px={{ base: 16, md: 24, lg: 36 }}
          radius={40}
          bg="#FFE4F5"
        >
          <Paper radius={40} p={12} bg="#FFF0F9" h={390}>
            <Image
              src={slide.image}
              alt={`Image representing ${slide.title}`}
              w="100%"
              h="100%"
              fit="contain"
              radius={40}
            />
          </Paper>
        </Paper>
      </Flex>
    </Box>
  );
}
