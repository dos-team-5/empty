'use client';
import { Box, Group, Stack, Title } from '@mantine/core';
import { motion } from 'motion/react';
import Image from 'next/image';
import { TextAnimate } from '../TextAnimation';
import PrimaryBtn from '../PrimaryBtn';

import { Icon } from '../FileManager/lib/Icon';
import { useLanguage } from '@/providers/languageToggleContext';
import { getDrivePageContent } from '@/contents/drive/driveLandingPage';

const DriveHeroSection: React.FC = () => {
  const { language } = useLanguage();
  const content = getDrivePageContent[language];
  const handleSignUpClick = () => {
    const target = document.querySelector('#signUpDriver');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <Box
      className="relative min-h-dvh overflow-hidden"
      mt={{ base: 30, md: 55 }}
    >
      <Box className="flex h-full w-full flex-col items-start justify-start gap-12 px-4 pt-20 sm:px-8 md:px-16 lg:mt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-20 xl:mt-[10dvh] xl:px-24 2xl:px-32">
        <Stack className="w-full lg:w-[55%]">
          <Title
            order={1}
            fw={700}
            c="#000000"
            ff={'var(--font-poppins)'}
            className="capitalize"
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              className={`${language === 'fr' ? '2xl:text-[36px]' : '2xl:text-[64px]'} md:text-[32px] xl:text-[42px]`}
              once
            >
              {content.heroSection.title.line1}
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={0.5}
              className={`${language === 'fr' ? '2xl:text-[36px]' : '2xl:text-[64px]'} md:text-[32px] xl:text-[42px]`}
              once
            >
              {content.heroSection.title.line2}
            </TextAnimate>
          </Title>

          <Stack className="w-full md:hidden" gap={0}>
            {content.heroSection.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{
                  delay: 1 + 0.6 * index,
                }}
                className="w-full py-2"
              >
                <Group
                  w={'100%'}
                  className="!space-y-3"
                  align="flex-start"
                  wrap="nowrap"
                >
                  <Icon
                    icon="lets-icons:check-fill"
                    className="text-primary-400 size-6 flex-shrink-0 rounded-md text-lg"
                  />
                  <p className="font-inter fon max-w-md text-sm leading-6 !font-semibold text-black md:text-base 2xl:text-xl">
                    {feature}
                  </p>
                </Group>
              </motion.div>
            ))}
          </Stack>

          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            whileInView={{
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 2.5 }}
          >
            <Box onClick={handleSignUpClick} className="cursor-pointer" mt="xs">
              <PrimaryBtn btnText={content.heroSection.cta} glowOnHover />
            </Box>
          </motion.div>
         
        </Stack>
        <div className="w-full lg:w-[45%]">
          {/* <div
            // initial={{ x: '100%', opacity: 0 }}
            // animate={{ x: '0%', opacity: 1 }}
            // transition={{ duration: 2 }}
            className="rounded-xl bg-[#e9c8dd] p-2"
          >
            <Image
              src={'/DriveHeroImage.jpg'}
              alt="Drive Hero Image"
              width={1000}
              height={1000}
              priority
              className="rounded-xl lg:origin-left lg:scale-110 xl:origin-center xl:scale-100"
            />
          </div> */}
          <div
            className="mt-10"
            // initial={{ x: '100%', opacity: 0 }}
            // animate={{ x: '0%', opacity: 1 }}
            // transition={{ duration: 2 }}
          >
            <Image
              src={'/Empty-Drive-Car-Illustration.png'}
              alt="Drive Hero Image"
              width={1000}
              height={1000}
              priority
              className="w-[1400px] rounded-xl lg:scale-140 xl:origin-center xl:scale-140"
            />
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default DriveHeroSection;
