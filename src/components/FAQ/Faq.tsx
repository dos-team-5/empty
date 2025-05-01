'use client';
import { Accordion, Box, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';
import { TextAnimate } from '../TextAnimation';

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

const Faq = () => {
  const IsAboveMobile = useMediaQuery('(min-width: 768px)');
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <Box
      mt={100}
      maw={1400}
      mx={'auto'}
      className="mb-16 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      <Title order={1} ta={'center'} fw={500} fz={IsAboveMobile ? 52 : 'h2'}>
        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className=""
          once
        >
          Got Questions!
        </TextAnimate>

        <TextAnimate
          animation="blurInUp"
          by="word"
          startOnView
          duration={0.5}
          className=""
          delay={1}
          once
        >
          We Got Answers
        </TextAnimate>
      </Title>

      <Accordion
        mt={40}
        chevron={false}
        value={openItem}
        onChange={setOpenItem}
        variant="separated"
        transitionDuration={200}
        maw={800}
        mx={'auto'}
        className=""
      >
        {faqData.map((item) => (
          <Accordion.Item
            key={item.id}
            value={item.id}
            className="!border-none bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]"
          >
            <Accordion.Control className="!border-dimmed rounded-lg !border-2 !px-0 !py-2">
              <Box
                className="flex items-center justify-between pl-4"
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
            <Accordion.Panel className="!border-dimmed rounded-lg !border-2 !border-t-0 bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))] !px-0 !py-2">
              {item.answer}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};

export default Faq;
