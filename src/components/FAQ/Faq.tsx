'use client';
import { Accordion, Box, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Minus, Plus } from 'lucide-react';
import { memo, useMemo, useState } from 'react';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';

const faqData = [
  {
    id: 'reset-password',
    question: 'How can I reset my password?',
    answer:
      'To reset your password, click on the "Forgot Password" link on the login page. You will receive an email with instructions to create a new password. Follow the link in the email to set up a new password for your account.',
  },
  {
    id: 'another-account',
    question: 'Can I create more than one account?',
    answer:
      'Yes, you can create multiple accounts using different email addresses. Each account will be treated separately and will have its own settings, history, and preferences.',
  },
  {
    id: 'newsletter',
    question: 'How can I subscribe to the monthly newsletter?',
    answer:
      'You can subscribe to our monthly newsletter by visiting your account settings and checking the "Subscribe to newsletter" option. Alternatively, you can enter your email in the subscription box at the bottom of our homepage.',
  },
  {
    id: 'credit-card',
    question: 'Do you store credit card information securely?',
    answer:
      'Yes, we take security very seriously. We do not store your full credit card details on our servers. We use industry-standard encryption and secure payment processors to handle all transactions, ensuring your financial information remains protected.',
  },
  {
    id: 'payment',
    question: 'What payment systems do you work with?',
    answer:
      'We accept major credit cards (Visa, Mastercard, American Express), PayPal, and Apple Pay. In select regions, we also support bank transfers and other local payment methods. All payment processing is handled through secure, encrypted connections.',
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
          Got Questions!
        </TextAnimate>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className="md:text-[52px] lg:text-[48px] xl:text-[52px] 2xl:text-[64px]"
          delay={1}
          once
        >
          We Got Answers
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
          mt={40}
          pb={20}
          chevron={false}
          value={openItem}
          onChange={setOpenItem}
          variant="separated"
          transitionDuration={200}
          maw={450}
          mx="auto"
          className="transition-all duration-200 ease-in-out"
        >
          {faqData.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ y: -50, opacity: 0 }}
              whileInView={{
                y: 0,
                opacity: 1,
                transition: {
                  delay: (i + 1) * 0.5,
                },
              }}
              viewport={{ once: true }}
              className="mb-4"
            >
              <Accordion.Item
                value={item.id}
                className="from-default to-primary-50 from-55%] !border-none bg-gradient-to-b"
              >
                <Accordion.Control className="rounded-lg !px-0 !py-2 !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]">
                  <Box
                    className="flex items-center justify-between pl-4 text-lg font-medium text-[#333333] xl:text-xl 2xl:text-2xl"
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
                <Accordion.Panel className="from-default to-primary-50 rounded-lg bg-gradient-to-b from-55% !px-0 !py-2 text-base font-normal text-[#5E5E5E] !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] xl:text-lg 2xl:text-xl">
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
