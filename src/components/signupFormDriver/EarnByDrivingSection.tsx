'use client';

import { Title, Text, SimpleGrid, Paper, List, Image } from '@mantine/core';
import { motion } from 'motion/react';
import { FC } from 'react';

// --- Data for the sections to keep the component clean ---

const howItWorksSteps = [
  {
    step: 1,
    title: 'Quick & Secure Setup',
    description:
      "We'll first verify your identity and banking information. This ensures your monthly payments are always timely and secure via direct deposit.",
  },
  {
    step: 2,
    title: 'Get Campaign Offers',
    description:
      "Once verified, you're officially part of our network! You'll then receive advertising campaign offers that you can choose to accept or decline. It's totally up to you!",
  },
  {
    step: 3,
    title: 'Drive as You Normally Do',
    description:
      'Accept a campaign? Great! Get the decal installed at an EMPTY installation center. After that, just keep driving your usual routes. No extra work or detours needed',
  },
  {
    step: 4,
    title: 'Monthly Direct Deposits',
    description:
      "You'll get paid every month with a direct deposit straight to your bank account. Your earnings will vary based on the specific campaign you're in.",
  },
];

const whatToExpectItems = [
  {
    title: 'Smart Campaign Matching',
    description:
      'We use your location and driving habits to connect you with the most relevant advertisers.',
  },
  {
    title: 'Flexible Assignment Times',
    description:
      "The time it takes to get assigned to a campaign can vary—from one day to several weeks or even months. It depends on campaign availability, your location, and advertiser demand. Don't worry if it's not immediate; we're always working to find the best match for you!",
  },
  {
    title: 'Simple Commitment',
    description:
      'Once the campaign is live, we just ask you to provide regular photo updates of the decals condition, while keeping the Evertrack app open and running at all times to allow us to track your driving activity.',
  },
];

// --- Main Component ---

export const EarnByDrivingSection: FC = () => {
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
            <span className="">Earn More Just by Driving!</span>
          </Title>
          <Text
            ff={'var(--font-inter)'}
            className="max-w-2xl text-lg !text-gray-600"
          >
            Ready to turn your everyday commute into passive income? We make it
            simple and secure to earn extra cash just by driving your car as
            usual.
          </Text>
        </div>

        {/* How It Works Section */}
        <div className="mb-12">
          <Title
            order={2}
            className="!mb-8 text-2xl font-bold text-gray-900 sm:text-3xl"
          >
            How It Works: Your Path to Earnings
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
                What to Expect
              </Title>
              <div className="flex h-10 w-10 items-center justify-center">
                {/* <MessageCircleWarning size={24} /> */}
                <Image src="form-i-icon.svg" />
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
