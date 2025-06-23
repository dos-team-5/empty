'use client';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Title } from '@mantine/core';
import { MoveLeft, MoveRight } from 'lucide-react';

const features = [
  {
    id: 1,
    title: 'Unlock the Untapped Potential of Rideshare Advertising.',
    content:
      'The rideshare industry is one of the most underutilized channels for advertising today. Most vehicles don’t feature any form of ad placement, and the few that do rely on in-car screens, rooftop displays, or full-vehicle wraps. Empty offers a smarter, more cost-effective alternative. We help you stand out and reach a broader audience for a fraction of the cost.',
  },
  {
    id: 2,
    title: 'Any sized fleet, as per your needs.',
    content:
      'At Empty, we believe powerful advertising should be accessible to everyone. Whether you’re a small business with a tight budget or a global brand with massive reach, we scale to fit your goals. From one vehicle to an entire fleet, our platform delivers unmatched value and visibility, outperforming traditional out-of-home options at every level.',
  },
  {
    id: 3,
    title: 'From Preview to Live in a Few Days.',
    content:
      'With Empty’s platform, launching your ad is as easy as shopping online. Preview your asset directly on a vehicle, complete checkout, and go live. No sales reps. No delays. No hassle.',
  },
  {
    id: 4,
    title: 'Clear Insights, Comprehensive Reporting.',
    content:
      'With EMPTY, you get detailed, real-time analytics, including impression data, audience demographics, geographic heatmaps, ride activity, and engagement insights. We bring digital-grade reporting to physical campaigns, so you’ll know exactly where your ads went, how many people saw them, and who they reached. No guesswork, no vague reach estimates.',
  },
];

import type { Swiper as SwiperClass } from 'swiper';

const FeatureCarousel = () => {
  const swiperRef = useRef<SwiperClass | null>(null);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  return (
    <div className="relative">
      <Swiper
        loop
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
          type: 'bullets',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="feature-slider !mx-0 mt-4 lg:mt-16 max-w-80"
      >
        <>
          {features.map((feature) => (
            <SwiperSlide key={feature.id} className="py-12">
              <Title
                order={3}
                fw={600}
                ff={'var(--font-poppins)'}
                className="text-start !text-base capitalize"
              >
                {feature.title}
              </Title>
              <p className="my-8 text-start text-xs font-normal font-inter">
                {feature.content}
              </p>
            </SwiperSlide>
          ))}
        </>
        {/* Navigation Buttons */}
        <div className="absolute bottom-0 left-0 z-100 flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="cursor-pointer rounded-full bg-[#FF83D5] p-2 text-white transition-colors hover:bg-[#E66DBF]"
          >
            <MoveLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="cursor-pointer rounded-full bg-[#FF83D5] p-2 text-white transition-colors hover:bg-[#E66DBF]"
          >
            <MoveRight size={16} />
          </button>
        </div>
      </Swiper>
    </div>
  );
};

export default FeatureCarousel;
