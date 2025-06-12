'use client';
import { Box, Group, Stack, Title } from '@mantine/core';
import { motion } from 'motion/react';
import Image from 'next/image';
import { TextAnimate } from '../TextAnimation';
import PrimaryBtn from '../PrimaryBtn';

import { Icon } from '../Icon';

const DriveHeroSection: React.FC = () => {
  const handleSignUpClick = () => {
    const target = document.querySelector('#signUpDriver');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    // <Box className="relative h-dvh overflow-hidden">
    //   <motion.div
    //     initial={{ x: '-132%' }}
    //     animate={{
    //       x: 0,
    //     }}
    //     transition={{ duration: 2.7, ease: 'easeOut' }}
    //     className="absolute bottom-16 left-0 lg:bottom-0"
    //   >
    //     <Image
    //       src={'/r5c.png'}
    //       alt="car2"
    //       width={1000}
    //       height={1000}
    //       className="w-[900px] origin-bottom-left lg:scale-88 xl:scale-90 2xl:scale-125"
    //       priority
    //     />
    //   </motion.div>
    //   <Box
    //     maw={1800}
    //     mx={'auto'}
    //     className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    //   >
    //     <Box className="flex h-full w-full flex-col justify-end">
    //       <Box className="pt-32">
    //         <Title order={1} fw={500}>
    //           <TextAnimate
    //             animation="blurInUp"
    //             by="word"
    //             startOnView
    //             duration={0.5}
    //             className="text-end text-3xl md:text-4xl lg:text-[40px] 2xl:text-5xl"
    //             once
    //           >
    //             Generate revenue every month
    //           </TextAnimate>
    //           <TextAnimate
    //             animation="blurInUp"
    //             by="word"
    //             startOnView
    //             duration={0.5}
    //             delay={0.5}
    //             className="text-end text-3xl md:text-4xl lg:text-[40px] 2xl:text-5xl"
    //             once
    //           >
    //             without doing more work.
    //           </TextAnimate>
    //         </Title>

    //         <Title order={2} fw={400} mt={'md'}>
    //           <TextAnimate
    //             animation="blurInUp"
    //             by="word"
    //             startOnView
    //             duration={0.5}
    //             delay={1}
    //             className="text-end text-base md:text-lg lg:text-xl 2xl:text-2xl"
    //             once
    //           >
    //             Get paid up to $300/month to display ads
    //           </TextAnimate>
    //           <TextAnimate
    //             animation="blurInUp"
    //             by="word"
    //             startOnView
    //             duration={0.5}
    //             delay={1.5}
    //             className="text-end text-base md:text-lg lg:text-xl 2xl:text-2xl"
    //             once
    //           >
    //             on your car’s front doors.
    //           </TextAnimate>
    //         </Title>

    //         <Box className="mt-6 flex flex-wrap justify-end gap-4">
    //           <motion.div
    //             initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
    //             whileInView={{
    //               opacity: 1,
    //               filter: 'blur(0px)',
    //               y: 0,
    //             }}
    //             viewport={{ once: true }}
    //             transition={{ duration: 0.4, delay: 2 }}
    //           >
    //             <Box onClick={handleSignUpClick} className="cursor-pointer">
    //               <PrimaryBtn btnText="Sign Up" />
    //             </Box>
    //           </motion.div>
    //         </Box>
    //       </Box>
    //     </Box>
    //   </Box>
    // </Box>

    <Box
      className="relative min-h-dvh overflow-hidden"
      mt={{ base: 30, md: 55 }}
    >
      <Box className="flex h-full w-full flex-col items-start justify-start gap-12 px-4 pt-20 sm:px-8 md:px-16 lg:mt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-4 lg:px-20 xl:px-24 2xl:px-32">
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
              className="md:text-[52px] lg:text-[48px] xl:text-[42px] 2xl:text-[64px]"
              once
            >
              Earn extra monthly income.
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={0.5}
              className="md:text-[52px] lg:text-[40px] xl:text-[42px] 2xl:text-[64px]"
              once
            >
              Drive as you normally do.
            </TextAnimate>
          </Title>

          <Stack className="w-full md:hidden" gap={0}>
            {[
              'Join our platform and earn up to 200$ per month with no extra effort.',
              'Simply drive your typical routes and hours.',
              'with an advertisement decal on your front doors.',
            ].map((feature, index) => (
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
                <Group wrap="nowrap" gap="xs">
                  <Icon
                    icon="lets-icons:check-fill"
                    className="text-primary-400 size-6 flex-shrink-0 rounded-md text-lg"
                  />
                  <p className="font-inter max-w-sm text-base leading-6 text-black 2xl:text-lg">
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
              <PrimaryBtn btnText="Sign Up" glowOnHover />
            </Box>
          </motion.div>
        </Stack>
        <div className="w-full overflow-hidden lg:w-[45%]">
          <div
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
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default DriveHeroSection;
