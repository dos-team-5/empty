import { Title } from '@mantine/core';
import { TextAnimate } from '../TextAnimation';

const AnimatedTitle = () => {
  return (
    <Title
      order={1}
      fw={700}
      ff={'var(--font-poppins)'}
      className="text-start capitalize"
    >
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        className="text-xl md:text-2xl xl:text-3xl"
        once
      >
        Billboards Don’t Move,
      </TextAnimate>

      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        delay={1}
        className="text-xl md:text-2xl xl:text-3xl"
        once
      >
        Your Customers Do.
      </TextAnimate>
    </Title>
  );
};

export default AnimatedTitle;
