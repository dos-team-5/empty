'use client';
import { Accordion, Box, Title } from '@mantine/core';
import { memo, useMemo, useState } from 'react';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';
import { Minus, Plus } from 'lucide-react';
import { useLanguage } from '@/providers/languageToggleContext';
import { getAdvertisePageContent } from '@/contents/advertise/AdvertisePage';

const Faq = memo(() => {
  const { language } = useLanguage();
  const content = getAdvertisePageContent[language];
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
          {content.faqSection.title.line1}
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
          {content.faqSection.title.line2}
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
        mt={180}
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
          {content.faqSection.faqData.map((item, i) => (
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
