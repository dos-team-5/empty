'use client';
import { Accordion, Box, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { memo, useMemo, useState } from 'react';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';

const faqData = [
  {
    id: 'reset-password',
    question: 'How do I know my rideshare ads are being seen?',
    answer:
      'We provide complete ad visibility tracking for your rideshare advertising campaign. With real-time GPS tracking, weekly ride activity reports, and photo confirmations from drivers, you’ll know your ads are live and in motion. Plus, our detailed analytics report includes impression estimates, heatmaps, and zone-based reach, giving you full transparency into your out-of-home (OOH) ad performance.',
  },
  {
    id: 'another-account',
    question:
      'Is there a minimum number of vehicles to start a rideshare advertising campaign?',
    answer:
      'EMPTY was built to make OOH advertising accessible for businesses of all sizes. Campaigns can typically start with just 5 vehicles, and we welcome smaller pilots, perfect for local or regional businesses with limited ad budgets. Our low entry cost and scalable fleet model make mobile advertising easy to test, launch, and grow.',
  },

  {
    id: 'credit-card',
    question: 'How quickly can I launch a rideshare advertising campaign?',
    answer:
      'Your campaign can be up and running in as little as 5–10 business days. Once you upload your ad creative and complete checkout, we handle the printing, shipping, and driver coordination. EMPTY makes launching an OOH campaign faster and easier than traditional billboard advertising.',
  },
  {
    id: 'payment',
    question: 'Can I A/B test ad creatives in my OOH campaign?',
    answer:
      'Yes. Our platform lets you run multiple creatives across your rideshare fleet to A/B test your messaging. You can also add or remove vehicles based on performance or targeting needs. EMPTY gives you the flexibility to optimize your mobile OOH campaign like a digital media buy.',
  },
  {
    id: 'digitalMarketting',
    question:
      'Can I combine EMPTY with my digital marketing or retargeting strategy?',
    answer:
      'Absolutely. EMPTY integrates seamlessly with digital marketing by acting as a real-world amplifier for your online campaigns. Our exclusive Scan&Spin feature captures verified engagement data from people who interact with your ad, enabling precise retargeting through device IDs across digital channels. It’s a powerful way to connect offline visibility with online conversion',
  },
  {
    id: 'commitment',
    question:
      'Is there a contract or long-term commitment for advertising with EMPTY?',
    answer:
      'No long-term commitment is required. Our rideshare advertising campaigns run month-to-month, giving you full control. You can renew, scale, pause, or adjust your campaign at the end of any billing cycle. No sales pressure, no hidden fees.',
  },
];

const Faq = memo(() => {
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');
  const [openItem, setOpenItem] = useState<string | null>(null);

  const titleContent = useMemo(
    () => (
      <>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
          once
        >
          Frequently
        </TextAnimate>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
          delay={0.5}
          once
        >
          Asked Questions
        </TextAnimate>
      </>
    ),
    []
  );

  return (
    <Box
      className="relative"
      // className="from-default to-primary-100 relative h-dvh bg-gradient-to-b from-55%"
    >
      <Box
        mt={50}
        maw={1400}
        mx="auto"
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        style={{ minHeight: '600px' }}
      >
        <Title
          order={1}
          ta="center"
          fw={700}
          c="#333333"
          ff={'var(--font-poppins)'}
          className="capitalize"
        >
          {titleContent}
        </Title>

        <Accordion
          // mt={40}
          // pb={20}
          chevron={false}
          value={openItem}
          onChange={setOpenItem}
          variant="default"
          transitionDuration={200}
          maw={'100%'}
          mx="auto"
          className="mt-8 transition-all duration-200 ease-in-out"
          styles={{
            panel: {
              fontSize: '15px',
              color: '#757575',
              paddingLeft: '15px',
            },
          }}
        >
          {faqData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ y: -50, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: {
                  delay: (i + 1) * 0.3,
                },
              }}
              viewport={{ once: true }}
              className="border-primary-500 !border-b"
            >
              <Accordion.Item value={item.id}>
                <Accordion.Control pr={0} className="hover:!bg-primary-50/80">
                  <Box
                    className="font-poppins flex !h-full items-center justify-between text-lg font-medium text-[#333333] xl:text-xl 2xl:text-2xl"
                    style={{ width: '100%' }}
                  >
                    {item.question}
                    {openItem === item.id ? (
                      <Box className="bg-primary rounded-full p-1 text-white">
                        <Minus size={16} />
                      </Box>
                    ) : (
                      <Box className="bg-primary rounded-full p-1 text-white">
                        <Plus size={16} />
                      </Box>
                    )}
                  </Box>
                </Accordion.Control>
                <Accordion.Panel className="font-inter">
                  {item.answer}
                </Accordion.Panel>
              </Accordion.Item>
            </motion.div>
          ))}
        </Accordion>
      </Box>
    </Box>
  );
});

export default Faq;
