'use client';
import { Image, Stack } from '@mantine/core';
import { motion } from 'motion/react';

const HowSpinWorks = () => {
  const newImages = [
    {
      id: 1,
      img: '/attribution/HowSpinWorks/image1.png',
    },
    {
      id: 2,
      img: '/attribution/HowSpinWorks/image2.png',
    },
    {
      id: 3,
      img: '/attribution/HowSpinWorks/image3.png',
    },
    {
      id: 4,
      img: '/attribution/HowSpinWorks/image4.png',
    },
    {
      id: 5,
      img: '/attribution/HowSpinWorks/image5.png',
    },
  ];
  return (
    <Stack>
      {newImages.map((item) => (
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
