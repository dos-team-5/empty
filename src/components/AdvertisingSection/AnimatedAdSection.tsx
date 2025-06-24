import { Box, Stack, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import AnimatedCircle from './AnimatedCircle';
import Image from 'next/image';

const AnimatedAdSection = () => {
  return (
    <section className="relative h-[70vh] w-full overflow-hidden md:h-[80vh] lg:mt-48 lg:h-[90vh] xl:h-[80vh]">
      <Box
        maw={1800}
        mx={'auto'}
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
      >
        {/* Section Title */}
        <Stack gap={10} className="">
          <Title
            order={1}
            fw={700}
            ff={'var(--font-poppins)'}
            className="text-center"
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              once
              className="md:text-[52px] lg:text-[48px] xl:text-[48px] 2xl:text-[64px]"
            >
              Why Advertisers
            </TextAnimate>
          </Title>
          <Title
            order={1}
            fw={700}
            ff={'var(--font-poppins)'}
            className="pb-12 text-center"
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              delay={0.5}
              once
              className="md:text-[52px] lg:text-[48px] xl:text-[48px] 2xl:text-[64px]"
            >
              Choose EMPTY
            </TextAnimate>
          </Title>
        </Stack>
        {/* Animated Circle */}
        <AnimatedCircle />
      </Box>
      <Image
        src={'/ad/R244.png'}
        width={1000}
        height={1000}
        alt="R24Image"
        priority
        className='z-1000 absolute  bottom-0 w-[60%] lg:w-[36%] left-1/2 -translate-x-1/2'
      />
    </section>
  );
};

export default AnimatedAdSection;
