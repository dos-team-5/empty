import { Box, Stack, Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';
import AnimatedCircle from './AnimatedCircle';

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
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
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
              className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl"
            >
              Choose EMPTY
            </TextAnimate>
          </Title>
        </Stack>
        {/* Animated Circle */}
        <AnimatedCircle />
      </Box>
    </section>
  );
};

export default AnimatedAdSection;
