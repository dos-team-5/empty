'use client';

import { memo, useEffect, useState /*, useEffect */ } from 'react';
import { Smartphone, Users } from 'lucide-react';
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
import type React from 'react';
import { Icon } from '@iconify/react';
import { TextAnimate } from '../TextAnimation';

interface CarouselSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  backgroundColor: string;
  icon: React.ReactNode;
}

const slides: CarouselSlide[] = [
  {
    id: 'scan-spin',
    title: 'Scan & Spin',
    subtitle: 'Engagement That Converts Instantly',
    description:
      "Scan & Spin is great for activation, referrals, lead capture, brand recognition, and more. It's a simple, fun, and engaging way to collect leads. It's instant, fun, and memorable. Perfect for campaigns that need immediate engagement and collect real-time leads, and create buzz on the spot. Ideal for in-person marketing campaigns that need immediate action.",
    image: '/VS_SCANSPIN.png',
    backgroundColor: 'from-pink-100 to-purple-100',
    icon: <Smartphone className="h-6 w-6" />,
  },
  {
    id: 'lead-snatcher',
    title: 'Lead Snatcher',
    subtitle: 'Passive Reach, Powerful Data',
    description:
      'Lead Snatcher captures nearby mobile devices via WiFi and Bluetooth — no app downloads or user interaction required. It runs in the background on your premises, collecting valuable traffic data, dwell times, and return visitor patterns. This method is perfect for advertisers focused on silent frequency, analyzing customer behavior, and building comprehensive databases without requiring direct user interaction.',
    image: '/VS_LEAD_SNATCHER.png',
    backgroundColor: 'from-blue-50 to-indigo-100',
    icon: <Users className="h-6 w-6" />,
  },
];

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
        Scan & Spin vs Lead Snatcher
      </TextAnimate>
    </Title>
  </div>
));

TitleSection.displayName = 'TitleSection';

export default function ScanVsLeadSnatcher() {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Autoplay (Commented)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const slide = slides[currentSlide];

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
          Choose the right tool for your campaign goals — instant engagement or
          passive reach.
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
          direction="column"
          justify="space-between"
          px={{ base: 16, xl: 36 }}
          pt={{ base: 16, md: 28, lg: 55 }}
          pb={{ base: 16, md: 26 }}
          w={{ base: '100%', md: 370 }}
        >
          <Group mb="xs">
            <Text c="#555555" fz={20} fw={500}>
              {slide.subtitle}
            </Text>
          </Group>
          <Text mih={270} c="#4A4A4A" fz="sm">
            {slide.description}
          </Text>

          {/* Navigation */}
          <Flex mt={20} gap="xs">
            <ActionIcon
              bg="#FF83D5"
              w={{ base: 36, md: 40, lg: 49 }}
              h={{ base: 36, md: 40, lg: 49 }}
              radius="xl"
              onClick={() => {
                setTimeout(() => {
                  setCurrentSlide((prev) =>
                    prev === 0 ? slides.length - 1 : prev - 1
                  );
                }, 1500); // 500ms delay
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
                setTimeout(() => {
                  setCurrentSlide((prev) =>
                    prev === slides.length - 1 ? 0 : prev + 1
                  );
                }, 1500); // 500ms delay
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
