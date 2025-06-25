import { Container } from '@mantine/core';
import { GiftInfoCard, GiftInfoMain, GiftSteps } from './components';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Attribution',
};

const page = () => {
  return (
    <Container
      component={'main'}
      my={40}
      maw={1300}
      px={{ base: 25, md: 30 }}
      className="overflow-hidden"
    >
      <GiftInfoMain />
      <GiftSteps />
      <GiftInfoCard />
    </Container>
  );
};

export default page;
