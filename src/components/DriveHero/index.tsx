'use client';
import { Box, Stack, Title } from '@mantine/core';
import { motion } from 'motion/react';
import Image from 'next/image';
import { TextAnimate } from '../TextAnimation';
import PrimaryBtn from '../PrimaryBtn';

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

    <Box className="relative h-dvh overflow-hidden">
      <Box className="mt-24 flex h-full w-full flex-col items-start justify-start gap-12 px-4 sm:px-8 md:px-16 lg:mt-0 lg:flex-row lg:items-center lg:justify-between lg:gap-0 lg:px-20 xl:px-24 2xl:px-32">
        <Stack className="w-full lg:w-[55%]">
          <Title order={1} fw={500}>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              className="text-start text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
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
              className="text-start text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
              once
            >
              Drive as you normally do.
            </TextAnimate>
          </Title>
          <Title order={2} fw={400}>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={1}
              className="text-start text-base md:text-lg 2xl:text-2xl"
              once
            >
              Get paid up to 300$ a month with EMPTY.
            </TextAnimate>
          </Title>
          <Title order={1} fw={500} mt="xs">
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={1.5}
              className="text-start text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
              once
            >
              Easily installable and removable decals,
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={2}
              className="text-start text-3xl lg:text-2xl xl:text-3xl 2xl:text-4xl"
              once
            >
              reducing your commitment
            </TextAnimate>
          </Title>
          <Title order={2} fw={400}>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={2.5}
              className="text-start text-base md:text-lg 2xl:text-2xl"
              once
            >
              We mail it. You install it. Start earning.
            </TextAnimate>
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={3}
              className="text-start text-base md:text-lg 2xl:text-2xl"
              once
            >
              No hidden costs. No BS.
            </TextAnimate>
          </Title>
          <motion.div
            initial={{ opacity: 0, filter: 'blur(10px)', y: 20 }}
            whileInView={{
              opacity: 1,
              filter: 'blur(0px)',
              y: 0,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 3.5 }}
          >
            <Box
              onClick={handleSignUpClick}
              className="cursor-pointer lg:origin-top-left lg:scale-125"
              mt="lg"
            >
              <PrimaryBtn btnText="Sign Up" />
            </Box>
          </motion.div>
        </Stack>
        <div className="w-full overflow-hidden lg:w-[45%]">
          <motion.div
            initial={{ x: '100%', opacity: 0 }}
            animate={{ x: '0%', opacity: 1 }}
            transition={{ duration: 2 }}
          >
            <Image
              src={'/DriveHeroImage.jpg'}
              alt="Drive Hero Image"
              width={1000}
              height={1000}
              priority
              className="lg:origin-left lg:scale-110 xl:origin-center xl:scale-100"
            />
          </motion.div>
        </div>
      </Box>
    </Box>
  );
};

export default DriveHeroSection;
