import { TextAnimate } from '@/components/TextAnimation';
import { Stack, Title } from '@mantine/core';
import HowSpinWorks from './HowSpinWorks';

const lines = [
  {
    text: "Scan & Spin delivers the kind of engagement you'd get if you hired dozens of people",
  },
  {
    text: 'to hand out coupons across the city. But instead of guessing who took one, ',
  },
  {
    text: 'each person is tracked individually and can be retargeted again and again.',
  },
];

const GiftSteps = () => {
  return (
    <Stack maw={1200} mx="auto" mt={{ base: 80 }} mb={{ base: 80 }}>
      {/* title */}
      <Title
        order={2}
        fw={400}
        c={'var(--color-primary)'}
        ff={'var(--font-inter)'}
        className="capitalize"
        pt={0}
        ta={'center'}
      >
        <TextAnimate
          animation="blurIn"
          by="word"
          startOnView
          duration={0.5}
          delay={1}
          once
          className="text-[16px] 2xl:text-[28px]"
        >
          {lines[0].text}
        </TextAnimate>
        <TextAnimate
          animation="blurIn"
          by="word"
          startOnView
          duration={0.5}
          delay={2.0}
          once
          className="text-[16px] 2xl:text-[28px]"
        >
          {lines[1].text}
        </TextAnimate>
        <TextAnimate
          animation="blurIn"
          by="word"
          startOnView
          duration={0.5}
          delay={3.0}
          once
          className="text-[16px] 2xl:text-[28px]"
        >
          {lines[2].text}
        </TextAnimate>
      </Title>
      <Title mt={100} ta="center" fz={{ base: 25, sm: 35 }} fw={600} pb={30}>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          once
        >
          How It Works: The Scan & Spin Journey
        </TextAnimate>
      </Title>
      {/* <Text
        ta="center"
        fz={{ base: 13, sm: 16 }}
        maw={540}
        mx="auto"
        className="!text-gray-600"
      >
        Ready to turn your everyday commute into passive income? We make it
        simple and secure to earn extra cash just by driving your car as usual.
      </Text> */}
      {/* svg image */}
      {/* <Image src="/giftDetails/giftSteps.svg" /> */}

      <div
        // initial={{ opacity: 0, scale: 0.3 }}
        // whileInView={{ opacity: 1, scale: 1 }}
        // transition={{ duration: 0.7, ease: 'easeInOut' }}
        className="flex w-full items-start justify-center"
      >
        {/* <GiftStepsSvg /> */}
        <HowSpinWorks />
      </div>
    </Stack>
  );
};

export default GiftSteps;
