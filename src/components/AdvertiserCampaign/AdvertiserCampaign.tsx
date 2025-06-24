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
  SimpleGrid,
  Image,
} from '@mantine/core';
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react';
import { campaignSteps } from './campaignData';
import { Autoplay } from 'swiper/modules';
import { useRef } from 'react';
import { useMediaQuery } from '@mantine/hooks';
import { TextAnimate } from '../TextAnimation';

const AdvertiserCampaign = () => {
  const swiperRef = useRef<SwiperClass | null>(null);
  const isMobile = useMediaQuery('(max-width: 767px)');
  const tablet = useMediaQuery('(min-width: 768px) and (max-width: 1023px)');

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const cols = isMobile ? 1 : tablet ? 2 : 3;

  return (
    <Box
      pos="relative"
      maw={1552}
      px={{ base: 16, xl: 200 }}
      w="100%"
      mx="auto"
      py={24}
      mb={160}
      mt={120}
    >
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
          Advertiser Campaign Timeline
        </TextAnimate>
      </Title>
      <div className="lg:scale-80 xl:scale-100">
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
          className="!pb-16"
        >
          <Group justify="right" pos={'absolute'} bottom={0} right={0}>
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
          <Box pos={'relative'} className="">
            {campaignSteps.map((slide, index) => (
              <SwiperSlide className="mt-20" key={index}>
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
          <SimpleGrid cols={cols} spacing={0} mt={16}>
          <Image
            src="/advertiser-campaign/indicator.png"
            alt="advertiser campaign"
          />
          <Image
            hidden={isMobile}
            src="/advertiser-campaign/indicator.png"
            alt="advertiser campaign"
          />
          <Image
            hidden={isMobile || tablet}
            src="/advertiser-campaign/indicator.png"
            alt="advertiser campaign"
          />
        </SimpleGrid>
        </Swiper>
        
      </div>
    </Box>
  );
};

export default AdvertiserCampaign;
