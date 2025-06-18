import { Image, Stack } from '@mantine/core';
import { motion } from 'motion/react';
const HowSpinWorks = () => {
  const newImages = [
    {
      id: 1,
      img: '/attribution/HowSpinWorks/img1.png',
    },
    {
      id: 2,
      img: '/attribution/HowSpinWorks/img2.png',
    },
    {
      id: 3,
      img: '/attribution/HowSpinWorks/img3.png',
    },
    {
      id: 4,
      img: '/attribution/HowSpinWorks/img4.png',
    },
    {
      id: 5,
      img: '/attribution/HowSpinWorks/img5.png',
    },
  ];
  return (
    <Stack>
      {newImages.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: index % 2 === 0 ? 100 : -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut', delay: index * 0.2 }}
          viewport={{ once: true }}
        >
          <Image
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
