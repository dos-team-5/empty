'use client';

import { Title, Text, SimpleGrid, Paper, List, Image } from '@mantine/core';
import { motion } from 'motion/react';
import { FC } from 'react';
import { TextAnimate } from '../TextAnimation';
import { useLanguage } from '@/providers/languageToggleContext';
import { getDrivePageContent } from '@/contents/drive/driveLandingPage';

// --- Main Component ---

export const EarnByDrivingSection: FC = () => {
  const { language } = useLanguage();
  const content = getDrivePageContent[language];
  const howItWorksSteps = content.driverSignUp.howItWorksSteps;
  const whatToExpectItems = content.driverSignUp.whatToExpectItems;
  return (
    <div className="font-sans">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="mb-6 text-left sm:mb-6">
          <Title
            ff={'var(--font-inter)'}
            order={1}
            className="!mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl"
          >
            <TextAnimate
              animation="blurInUp"
              by="word"
              startOnView
              duration={0.5}
              once
            >
              {language === 'en' ? 'Earn by Driving' : 'Gagner en conduisant'}
            </TextAnimate>
          </Title>
          <Text
            ff={'var(--font-inter)'}
            className="max-w-2xl text-lg !text-gray-600"
          >
            {language === 'en'
              ? 'Ready to turn your everyday commute into passive income? We make it simple and secure to earn extra cash just by driving your car as usual.'
              : "Prêt à transformer vos trajets quotidiens en revenu passif ? Nous vous offrons une façon simple et sécurisée de gagner de l'argent supplémentaire simplement en conduisant comme d'habitude."}
          </Text>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <Title
            order={2}
            className="!mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
          >
            {language === 'en'
              ? 'How It Works: Your Path to Earnings'
              : 'Comment ça marche : Votre chemin vers les gains'}
          </Title>
          <SimpleGrid
            cols={{ base: 1, sm: 2 }}
            spacing={{ base: 'xl', sm: '3rem' }}
          >
            {howItWorksSteps.map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.6 }}
                className="flex items-start gap-x-4"
              >
                <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-[#E55C9A] text-sm font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <Title
                    fz={15}
                    order={3}
                    className="mb-1 text-lg font-semibold text-gray-900"
                    pb={8}
                  >
                    {item.title}
                  </Title>
                  <Text fz={13} className="leading-relaxed !text-gray-600">
                    {item.description}
                  </Text>
                </div>
              </motion.div>
            ))}
          </SimpleGrid>
        </div>

        {/* What to Expect Section */}
        <div>
          <Paper withBorder radius="xl" className="!bg-[#FFF0BF] p-6 sm:p-8">
            <div className="mb-6 flex items-start justify-between">
              <Title order={3} className="text-xl font-bold text-gray-900">
                {language === 'en'
                  ? 'What to Expect'
                  : 'Ce que vous devez attendre'}
              </Title>
              <div className="flex h-10 w-10 items-center justify-center">
                {/* <MessageCircleWarning size={24} /> */}
                <Image alt="form-i-icon" src="form-i-icon.svg" />
              </div>
            </div>

            <List
              spacing="lg"
              listStyleType="disc"
              classNames={{ itemWrapper: 'flex' }}
            >
              {whatToExpectItems.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: -20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.6 }}
                  className="mb-4"
                >
                  <List.Item
                    // icon={
                    //   <ThemeIcon
                    //     color="#E55C9A"
                    //     size={10}
                    //     radius="xl"
                    //     className="mt-2"
                    //   />
                    // }
                    className="items-start"
                  >
                    <span className="font-semibold text-gray-800">
                      {item.title}
                    </span>
                    <Text fz={13} className="mt-1 !text-gray-600">
                      {item.description}
                    </Text>
                  </List.Item>
                </motion.div>
              ))}
            </List>
          </Paper>
        </div>
      </div>
    </div>
  );
};
