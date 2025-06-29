'use client';
import { attributionPageContent } from '@/contents/attribution/attributionPage';
import { useLanguage } from '@/providers/languageToggleContext';
import { Card, Flex, Image, SimpleGrid, Stack, Text } from '@mantine/core';

const GiftInfoCard = () => {
  const { language } = useLanguage();
  const content = attributionPageContent[language];
  const cardData = content.whyScanSpinSection.cardData;
  return (
    <Stack maw={1000} mx="auto" mb={200}>
      {/* title */}
      <Stack>
        <Text ta="center" fz={{ base: 25, sm: 35 }} fw={400} mb={40}>
          Why Scan & Spin? Your Key Advantages
        </Text>
        {/* <Text
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
        </Text> */}

        {/* card */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing={0}>
          {cardData.map((card, i) => (
            <Card
              py={30}
              mih={192}
              key={i}
              bg={i % 2 == 0 ? 'white' : '#FFF8FD'}
              className="cursor-pointer !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] transition-all duration-200 hover:z-40 hover:scale-110"
            >
              {card.id === 3 ? (
                <Flex h="100%" justify="center" align="center">
                  <Image
                    title={card.title}
                    alt={card.title}
                    w={220}
                    src={card.logo}
                  />
                </Flex>
              ) : (
                <Stack maw={380} w={{ base: '95%', sm: '90%' }}>
                  <Image
                    title={card.title}
                    alt={card.title}
                    w={40}
                    src={card.logo}
                  />
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
