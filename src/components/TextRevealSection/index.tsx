'use client';
import { useLanguage } from '@/providers/languageToggleContext';
import { TextRevealByWord } from '../TextRevealByWord'; 
import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';

const TextRevealSection = () => {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];
  return (
    <TextRevealByWord className="">
      {content.textRevealSection.title}
    </TextRevealByWord>
  );
};

export default TextRevealSection;
