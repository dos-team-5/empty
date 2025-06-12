'use client';
import { Accordion, Flex, Image } from '@mantine/core';
import { Minus, PlusIcon } from 'lucide-react';
import { useState } from 'react';

const FeatureCard = () => {
  const [column1Open, setColumn1Open] = useState<boolean>(false);
  const [column2Open, setColumn2Open] = useState<boolean>(false);
  const [column1OpenId, setColumn1OpenId] = useState<number>();
  const [column2OpenId, setColumn2OpenId] = useState<number>();

  const handleColumn1Open = (id: number) => {
    setColumn1OpenId(id);
    setColumn1Open(!column1Open);
  };

  const handleColumn2Open = (id: number) => {
    setColumn2OpenId(id);
    setColumn2Open(!column2Open);
  };
  const cardsColumn1 = [
    {
      id: 1,
      title: 'Unlock the Untapped Potential of Rideshare Advertising.',
      content:
        'The rideshare industry is one of the most underutilized channels for advertising today. Most vehicles don’t feature any form of ad placement, and the few that do rely on in-car screens, rooftop displays, or full-vehicle wraps. Empty offers a smarter, more cost-effective alternative. We help you stand out and reach a broader audience for a fraction of the cost.',
      img: '1.jpg',
    },
    {
      id: 2,
      title: 'Any sized fleet, as per your needs.',
      content:
        'At Empty, we believe powerful advertising should be accessible to everyone. Whether you’re a small business with a tight budget or a global brand with massive reach, we scale to fit your goals. From one vehicle to an entire fleet, our platform delivers unmatched value and visibility, outperforming traditional out-of-home options at every level.',
      img: '32.jpg',
    },
  ];
  const cardsColumn2 = [
    {
      id: 3,
      title: 'From Preview to Live in a Few Days.',
      content:
        'With Empty’s cutting-edge platform, launching your ad is as easy as shopping online. Preview your asset directly on a vehicle, complete checkout, and go live—all within a week. No sales reps. No delays. No hassle. This streamlined process gives Empty a distinct edge over traditional out-of-home advertising options.',
      img: '2.jpg',
    },
    {
      id: 4,
      title: 'Clear Insights, Comprehensive Reporting.',
      content:
        'Empty ads move through high-traffic areas and key times to reach the right audience. Target specific demographics by strategically choosing when and where your ad appears. With our AI-powered BETA 2 analytics dashboard, you can track performance and ROI in real time, ensuring your ad is always on target.',
      img: '41.png',
    },
  ];

  return (
    <Flex
      maw={1150}
      mx="auto"
      gap={15}
      mb={180}
      direction={{ base: 'column', sm: 'row' }}
      px={{ base: 15, md: 0 }}
    >
      {/* Column 1 */}
      <Flex direction="column" w={{ base: '100%', md: '50%' }} gap={15}>
        {cardsColumn1.map((card) => (
          <div key={card.id} className="w-full items-start gap-4 md:gap-y-16">
            <div className="hover:bg-primary-50 flex min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-lg bg-transparent p-4 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] transition-colors duration-150">
              <div className="flex w-full flex-col gap-4">
                <div>
                  <img
                    width={300}
                    height={320}
                    src={card.img}
                    className="h-80 w-full rounded-lg object-cover object-top md:h-56 lg:h-72"
                  />
                </div>
                {/* <div className="relative flex h-20 items-center justify-between px-2">
            <h3 className="w-[85%] text-left text-lg font-medium text-[#333333] xl:text-xl 2xl:text-2xl">
              Unlock the Untapped Potential of Rideshare Advertising.
            </h3>
            <div
              onClick={() => setShowDetails(!showDetails)}
              className="bg-primary-400 !text-default rounded-full p-1"
            >
              {showDetails ? <Minus /> : <PlusIcon />}
            </div>
          </div> */}
                <Accordion
                  chevronPosition="right"
                  disableChevronRotation
                  chevron={
                    column1Open && column1OpenId === card.id ? (
                      <MinusIconComponent />
                    ) : (
                      <PlusIconComponent />
                    )
                  }
                  onClick={() => handleColumn1Open(card.id)}
                  variant="filled"
                  styles={{
                    label: {
                      // Target the label instead of control
                      fontSize: '18px',
                      fontWeight: '600',
                    },
                    content: {
                      fontSize: '13px',
                    },
                  }}
                >
                  <Accordion.Item value={card.title}>
                    <Accordion.Control>{card.title}</Accordion.Control>

                    <Accordion.Panel>{card.content}</Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        ))}
      </Flex>
      {/* Column 2 */}
      <Flex direction="column" w={{ base: '100%', md: '50%' }} gap={15}>
        {cardsColumn2.map((card) => (
          <div key={card.id} className="w-full items-start gap-4 md:gap-y-16">
            <div className="hover:bg-primary-50 flex min-h-[420px] cursor-pointer flex-col overflow-hidden rounded-lg bg-transparent p-4 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] transition-colors duration-150">
              <div className="flex w-full flex-col gap-4">
                <div>
                  <Image
                    width={300}
                    height={320}
                    src={card.img}
                    className="h-80 w-full rounded-lg object-cover object-top md:h-56 lg:h-72"
                    alt="hi"
                  />
                </div>
                {/* <div className="relative flex h-20 items-center justify-between px-2">
            <h3 className="w-[85%] text-left text-lg font-medium text-[#333333] xl:text-xl 2xl:text-2xl">
              Unlock the Untapped Potential of Rideshare Advertising.
            </h3>
            <div
              onClick={() => setShowDetails(!showDetails)}
              className="bg-primary-400 !text-default rounded-full p-1"
            >
              {showDetails ? <Minus /> : <PlusIcon />}
            </div>
          </div> */}
                <Accordion
                  chevronPosition="right"
                  variant="filled"
                  disableChevronRotation
                  styles={{
                    label: {
                      // Target the label instead of control
                      fontSize: '18px',
                      fontWeight: '600',
                    },
                    content: {
                      fontSize: '13px',
                    },
                  }}
                  chevron={
                    column2Open && column2OpenId === card.id ? (
                      <MinusIconComponent />
                    ) : (
                      <PlusIconComponent />
                    )
                  }
                  onClick={() => handleColumn2Open(card.id)}
                >
                  <Accordion.Item value={card.title}>
                    <Accordion.Control className="font-poppins">
                      {card.title}
                    </Accordion.Control>
                    <Accordion.Panel className="font-inter">
                      {card.content}
                    </Accordion.Panel>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
          </div>
        ))}
      </Flex>
    </Flex>
  );
};

export default FeatureCard;

const PlusIconComponent = () => {
  return (
    <div className="rounded-full bg-[#FF83D5] p-1 text-white">
      {' '}
      <PlusIcon />
    </div>
  );
};

const MinusIconComponent = () => {
  return (
    <div className="rounded-full bg-[#FF83D5] p-1 text-white transition-all duration-200">
      {' '}
      <Minus />
    </div>
  );
};
