import { memo } from 'react';
import { Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import { useLanguage } from '@/providers/languageToggleContext';
import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';

const AnimatedTitle = () => {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];

  return (
    <Title
      order={1}
      fw={700}
      ff={'var(--font-poppins)'}
      className="text-start capitalize"
    >
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        className={
          language === 'fr'
            ? 'text-lg xl:text-xl 2xl:text-4xl'
            : 'text-xl xl:text-3xl 2xl:text-4xl'
        }
        once
      >
        {content.featureCarouselSection.carouselSection.title.line1}
      </TextAnimate>

      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        delay={1}
        className={
          language === 'fr'
            ? 'text-lg xl:text-xl 2xl:text-4xl'
            : 'text-xl xl:text-3xl 2xl:text-4xl'
        }
        once
      >
        {content.featureCarouselSection.carouselSection.title.line2}
      </TextAnimate>
    </Title>
  );
};

export default memo(AnimatedTitle);
