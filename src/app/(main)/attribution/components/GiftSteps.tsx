import GiftStepsSvg from '@/components/Icons/GiftStepsSvg';
import { TextAnimate } from '@/components/TextAnimation';
import { Stack, Title } from '@mantine/core';

const GiftSteps = () => {
  return (
    <Stack
      maw={1000}
      mx="auto"
      mt={{ base: 80, sm: 180 }}
      mb={{ base: 80, sm: 250 }}
    >
      {/* title */}
      <Title ta="center" fz={{ base: 25, sm: 35 }} fw={600} pb={30}>
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
      <div className="flex w-full items-start justify-center">
        <GiftStepsSvg />
      </div>
    </Stack>
  );
};

export default GiftSteps;
