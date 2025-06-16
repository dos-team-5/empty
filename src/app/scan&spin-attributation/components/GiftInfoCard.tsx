import { Card, Flex, Image, SimpleGrid, Stack, Text } from '@mantine/core';

const GiftInfoCard = () => {
  const cardData = [
    {
      id: 1,
      logo: '/giftDetails/engagement.svg',
      title: 'Real Engagement',
      content:
        ' Branded QR codes on rideshare vehicles invite scans for instant rewards like discounts or free products, creating welcomed interaction in high-traffic areas.',
    },
    {
      id: 2,
      logo: '/giftDetails/verified.svg',
      title: 'Verified Attribution',
      content:
        ' Every interaction is geo-verified, time-stamped, and linked to a unique digital ID. This provides precise engagement data, eliminating estimated impressions and tracking in-store redemption.',
    },
    {
      id: 3,
      logo: '/EMPTY-Logo.png',
      title: 'none',
      content: ' none',
    },
    {
      id: 4,
      logo: '/giftDetails/audiance.svg',
      title: 'Retargetable Audiences',
      content:
        ' Capture high-intent users for retargeting via email, SMS, or loyalty campaigns. Digital IDs from real-world interactions offer precision targeting, outperforming OOH and digital ads.',
    },
    {
      id: 5,
      logo: '/giftDetails/mobileFirst.svg',
      title: 'Mobile-First & Shareable',
      content:
        'The mobile-optimized experience, centered on an interactive prize wheel, boosts engagement and social sharing, increasing reach and brand memorability.',
    },
    {
      id: 6,
      logo: '/giftDetails/measure.svg',
      title: 'Measurable ROI',
      content:
        'Scan & Spin links physical visibility to digital performance, transforming out-of-home advertising into a trackable, data-driven channel for conversions and customer acquisition.',
    },
  ];
  return (
    <Stack maw={1000} mx="auto" mb={200}>
      {/* title */}
      <Stack>
        <Text ta="center" fz={{ base: 25, sm: 35 }} fw={400}>
          Why Scan & Spin? Your Key Advantages
        </Text>
        <Text
          fz={{ base: 13, sm: 16 }}
          maw={540}
          mx="auto"
          ta="center"
          ff={'var(--font-poppins)'}
          className="!text-gray-600"
        >
          Ready to turn your everyday commute into passive income? We make it
          simple and secure to earn extra cash just by driving your car as
          usual.
        </Text>

        {/* card */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={0}>
          {cardData.map((card, i) => (
            <Card
              py={30}
              mih={192}
              key={i}
              bg={i % 2 == 0 ? 'white' : '#FFF8FD'}
              className="cursor-pointer transition-all duration-200 hover:z-40 hover:scale-110"
            >
              {card.id === 3 ? (
                <Flex h="100%" justify="center" align="center">
                  <Image w={220} src={card.logo} />
                </Flex>
              ) : (
                <Stack maw={380} w={{ base: '95%', sm: '90%' }}>
                  <Image w={40} src={card.logo} />
                  <Text ta="justify" fz={18} fw={500}>
                    {card.title}
                  </Text>
                  <Text fz={12} className="!text-gray-600">
                    {card.content}
                  </Text>
                </Stack>
              )}
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
      {/* cards */}
    </Stack>
  );
};

export default GiftInfoCard;
