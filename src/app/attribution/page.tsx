import { Container } from '@mantine/core';
import { GiftInfoCard, GiftInfoMain, GiftSteps } from './components';

const page = () => {
  return (
    <Container my={40} maw={1300} px={{ base: 25, md: 30 }}>
      <GiftInfoMain />
      <GiftSteps />
      <GiftInfoCard />
    </Container>
  );
};

export default page;
