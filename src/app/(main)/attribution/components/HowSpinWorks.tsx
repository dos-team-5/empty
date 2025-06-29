'use client';
import { attributionPageContent } from '@/contents/attribution/attributionPage';
import { useLanguage } from '@/providers/languageToggleContext';
import { Image, Stack } from '@mantine/core';
import { motion } from 'motion/react';

const HowSpinWorks = () => {
  const { language } = useLanguage();
  const content = attributionPageContent[language];
  return (
    <Stack>
      {content.howSpinWorksImages.map((item) => (
        <motion.div
          initial={{ x: 200 * Math.pow(-1, item.id), opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          viewport={{ once: true }}
          key={item.id}
        >
          <Image
            title={item.id.toString()}
            alt={item.id.toString()}
            src={item.img}
            w={{ base: '100%', md: '70%' }}
            mx="auto"
            mb={{ base: 60, md: 140 }}
          />
        </motion.div>
      ))}
    </Stack>
  );
};

export default HowSpinWorks;
