import { Container } from '@mantine/core';
import { GiftInfoCard, GiftInfoMain, GiftSteps } from './components';
import Head from 'next/head';

const page = () => {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={`${process.env.NEXT_PUBLIC_URL}`} />
        <title>Attribution</title>
      </Head>
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
    </>
  );
};

export default page;
