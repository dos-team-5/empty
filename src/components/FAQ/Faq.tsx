'use client';
import { Accordion, Box, Title } from '@mantine/core';
import { Minus, Plus } from 'lucide-react';
import { useState } from 'react';

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
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <Box
      mt={100}
      maw={1400}
      mx={'auto'}
      className="mb-16 px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      <Title ta="center" className="mb-12">
        Got Questions! <br /> We Got Answers
      </Title>

      <Accordion
        mt={40}
        chevron={false}
        value={openItem}
        onChange={setOpenItem}
        transitionDuration={300}
        variant="separated"
        radius={0}
        className="!rounded-none"

        // styles={{
        //   item: {
        //     marginBottom: rem(8),
        //     border: '1px solid var(--mantine-color-gray-3)',
        //   },
        //   control: {
        //     padding: `${rem(16)} ${rem(20)}`,
        //     radius: rem(24),
        //     backgroundColor: 'white',
        //     color: 'black',
        //     '&:hover': {
        //       backgroundColor: 'white',
        //     },
        //   },
        //   panel: {
        //     padding: rem(20),
        //     fontSize: rem(14),
        //     lineHeight: 1.6,
        //   },
        // }}
      >
        {faqData.map((item) => (
          <Accordion.Item key={item.id} value={item.id}>
            <Accordion.Control className="!border-dimmed !border-2 !px-0 !py-2">
              <Box
                className="flex items-center justify-between pl-4"
                style={{ width: '100%' }}
              >
                {item.question}
                {openItem === item.id ? (
                  <Box className="bg-primary text-text !rounded-none p-1">
                    <Minus size={16} />
                  </Box>
                ) : (
                  <Box className="bg-primary text-text !rounded-none p-1">
                    <Plus size={16} />
                  </Box>
                )}
              </Box>
            </Accordion.Control>
            <Accordion.Panel className="!border-dimmed !border-2 !border-t-0 !px-0 !py-2">
              {item.answer}
            </Accordion.Panel>
          </Accordion.Item>
        ))}
      </Accordion>
    </Box>
  );
};

export default Faq;
