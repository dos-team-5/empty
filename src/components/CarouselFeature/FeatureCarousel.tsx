'use client';
import { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Title } from '@mantine/core';
import { MoveLeft, MoveRight } from 'lucide-react';
import type { Swiper as SwiperClass } from 'swiper';
import { useLanguage } from '@/providers/languageToggleContext';
import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';

const FeatureCarousel = () => {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];
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
        // loop
        // autoplay={{
        //   delay: 5000,
        //   disableOnInteraction: false,
        // }}
        modules={[Autoplay, Pagination]}
        pagination={{
          clickable: true,
          type: 'bullets',
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        className="feature-slider !mx-0 mt-4 max-w-80 lg:mt-16"
      >
        <>
          {content.featureCarouselSection.carouselSection.carouselData.map(
            (feature) => (
              <SwiperSlide key={feature.id} className="py-12">
                <Title
                  order={3}
                  fw={600}
                  ff={'var(--font-poppins)'}
                  className="text-start !text-base capitalize"
                >
                  {feature.title}
                </Title>
                <p className="font-inter my-8 text-start text-xs font-normal">
                  {feature.content}
                </p>
              </SwiperSlide>
            )
          )}
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
