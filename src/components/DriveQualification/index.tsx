'use client';
import React from 'react';
import { Title, Box, List } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import { NotebookText, StarIcon, UserCheck } from 'lucide-react';
import { motion } from 'motion/react';
import Image from 'next/image';

const DriveQualificationSection: React.FC = () => {
  const checkItemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <Box className="relative min-h-dvh">
      <motion.div
        initial={{ x: -300, y: -400, opacity: 0, scale: 0.5 }}
        whileInView={{
          x: 0,
          y: 0,
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
        viewport={{ once: true }}
        className="absolute bottom-16 left-0 hidden lg:-bottom-40 lg:block"
      >
        <Image
          src={'/CC2.png'}
          alt="car2"
          width={1000}
          height={1000}
          className="w-[900px] origin-bottom-left scale-50 xl:scale-75 2xl:scale-100"
          priority
        />
      </motion.div>
      <Box
        maw={1800}
        mx={'auto'}
        className="mb-24 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        id="driveQualification"
      >
        <Box className="flex h-full flex-col justify-end">
          <Box className="pt-16 md:pt-20">
            <Title order={1} fw={500}>
              <TextAnimate
                animation="blurInUp"
                by="word"
                startOnView
                duration={0.5}
                className="text-center text-3xl md:text-4xl lg:text-end lg:text-[40px] 2xl:text-5xl"
                once
              >
                Here's what you need to become a Driver
              </TextAnimate>
            </Title>
          </Box>
          <div className="mt-16 flex w-full flex-col items-center justify-end gap-4 gap-y-8 px-2 lg:flex-row lg:items-start lg:gap-y-0">
            {[
              {
                icon: <StarIcon />,
                title: 'Requirements',
                list: [
                  'Meet the minimum age of driver in your city',
                  'Have atleast three years of driving experience',
                  'Clear a background check',
                ],
              },
              {
                icon: <NotebookText />,
                title: 'Documents',
                list: [
                  `Valid driver's licence`,
                  `Proof of residency in your city, state, or province`,
                  'Insurance if you plan to drive your own car',
                ],
              },
              {
                icon: <UserCheck />,
                title: 'Signup process',
                list: [
                  'Submit documents and photo',
                  'Provide information for a background check',
                  'Find out if your car is eligible, or get a car',
                ],
              },
            ].map((item, idx) => (
              <motion.div
                key={idx}
                variants={checkItemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: (idx + 1) * 0.6 }}
                className="flex h-[340px] flex-col gap-2 rounded-xl p-8 shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] lg:items-start"
              >
                {item.icon}
                <p className="mt-4 text-base font-semibold md:text-lg lg:text-xl">
                  {item.title}
                </p>
                <List maw={240} type="unordered" className="!mt-2 list-disc">
                  {item.list.map((listItem, i) => (
                    <List.Item key={i} className="!mt-2 text-sm md:text-base">
                      {listItem}
                    </List.Item>
                  ))}
                </List>
              </motion.div>
            ))}
          </div>
        </Box>
      </Box>
    </Box>
  );
};

export default DriveQualificationSection;
