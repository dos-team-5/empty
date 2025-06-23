/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  ActionIcon,
  BackgroundImage,
  Box,
  Flex,
  Group,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { campaignSteps } from './campaignData';
import { Autoplay } from 'swiper/modules';
import { useRef } from 'react';

const AdvertiserCampaign = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <Box
      pos="relative"
      maw={1552}
      px={{ base: 16, xl: 200 }}
      w="100%"
      mx="auto"
      py={24}
      mb={160}
    >
      <Title className="text-center" fz={{ base: 28, xl: 64 }}>
        Advertiser Campaign Timeline
      </Title>
      <Swiper
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        spaceBetween={60}
        modules={[Autoplay]}
      >
        <Group justify="right" pos={'absolute'} top={40} right={0}>
          <ActionIcon
            bg="#FF83D5"
            w={{ base: 36, md: 40, lg: 49 }}
            h={{ base: 36, md: 40, lg: 49 }}
            radius="xl"
            onClick={() => handlePrev()}
            aria-label="Previous slide"
          >
            <Icon icon="mingcute:arrow-left-line" width={24} />
          </ActionIcon>
          <ActionIcon
            bg="#FF83D5"
            w={{ base: 36, md: 40, lg: 49 }}
            h={{ base: 36, md: 40, lg: 49 }}
            radius="xl"
            onClick={() => handleNext()}
            aria-label="Next slide"
          >
            <Icon icon="mingcute:arrow-right-line" width={24} />
          </ActionIcon>
        </Group>
        <Box pos={'relative'}>
          {campaignSteps.map((slide, index) => (
            <SwiperSlide className="mt-20 xl:!mt-[185px]" key={index}>
              <Flex direction={'column'} align="start" gap="lg">
                <BackgroundImage w={slide.width} h={120} src={slide.bgImage}>
                  <Flex h="100%" justify="start" align="center">
                    <ThemeIcon radius="100%" bg="#D481B5" w={46} h={46}>
                      <Icon icon={slide.icon} width={30} height={30} />
                    </ThemeIcon>
                  </Flex>
                </BackgroundImage>

                <Box>
                  <Title fz={24} mb={16}>
                    {slide.title}
                  </Title>
                  <Text>{slide.description}</Text>
                </Box>
              </Flex>
            </SwiperSlide>
          ))}
        </Box>
      </Swiper>
    </Box>
  );
};

export default AdvertiserCampaign;
