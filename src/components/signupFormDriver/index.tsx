'use client';
import React, { useState } from 'react';
import {
  Box,
  TextInput,
  Select,
  NumberInput,
  Button,
  Space,
  Modal,
  Text,
  List,
  Notification,
  Anchor,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { memo } from 'react';
import emailjs from '@emailjs/browser';

// Zod schema for driver validation
const driverSchema = z.object({
  name: z.string().min(1, { message: 'Full Name is required' }),
  car: z.string().min(1, { message: 'Car model is required' }),
  hoursPerWeek: z
    .number()
    .min(1, { message: 'Hours per week must be at least 1' })
    .positive({ message: 'Hours per week must be positive' }),
  preferredTime: z.string().min(1, { message: 'Preferred time is required' }),
  phone: z
    .string()
    .regex(/^\+?[\d\s\-()]{10,}$/, { message: 'Invalid phone number format' })
    .refine(
      (value) => {
        const digits = value.replace(/[^\d]/g, '');
        return digits.length >= 10 && digits.length <= 15;
      },
      { message: 'Phone number must contain 10–15 digits' }
    ),
  email: z.string().email({ message: 'Invalid email address' }),
  shippingAddress: z
    .string()
    .min(1, { message: 'Shipping address is required' }),
  cityOfOperation: z
    .string()
    .min(1, { message: 'City of operation is required' }),
});

type DriverFormValues = z.infer<typeof driverSchema>;

// Memoized TitleSection to prevent re-rendering
const TitleSection = memo(() => (
  <div className="-mt-16 w-full lg:w-1/2">
    <Text
      ff={'var(--font-poppins)'}
      fw={400}
      c="#333333"
      className="!text-sm xl:!text-base 2xl:!text-lg"
    >
      Before you can begin earning passive income with our platform, we need to
      verify your identity and banking information to ensure timely and secure
      payments via direct deposit. <br /> <br />
      Once your information is verified, you’ll be officially onboarded to our
      network and eligible to receive advertising campaign offers, which you may
      choose to accept or decline. <br /> <br />
      Please note: the time it takes to be assigned to a campaign can vary from
      as little as one day to several weeks or months. This depends on campaign
      availability, location, and advertiser demand. Don’t worry if you’re not
      placed immediately.
    </Text>
    <Space className="h-4 md:h-6" />
    <div
      className={`font-poppins !text-sm font-bold !text-[#333333] xl:!text-base 2xl:!text-lg`}
    >
      Your Role: Drive as you normally do. We’ll provide a decal to place on
      your car. <br />
      <br />
      Campaign Matching: We match you with advertisers based on your location
      and driving habits.
      <br />
      <br />
      Earnings: You’re paid monthly by direct deposit. Payment varies by
      campaign.
      <br />
      <br />
      Commitment: Once the decal is installed, you’ll be expected to provide
      regular updates on its condition and keep your full-time driving hours
      updated through your account dashboard on our website.{' '}
      <Anchor variant="text" size="md" className="!ml-1 underline">
        Sign In
      </Anchor>
    </div>
  </div>
));

TitleSection.displayName = 'TitleSection';

const DriverSignupSection: React.FC = () => {
  // Form setup with Zod validation
  const form = useForm<DriverFormValues>({
    validate: zodResolver(driverSchema),
    initialValues: {
      name: '',
      car: '',
      hoursPerWeek: 0,
      preferredTime: '',
      phone: '',
      email: '',
      shippingAddress: '',
      cityOfOperation: '',
    },
  });

  // State for controlling modal visibility and error notification
  const [opened, setOpened] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Initialize EmailJS with your Public Key
  React.useEffect(() => {
    emailjs.init('your_public_key'); // Replace with your EmailJS Public Key
  }, []);

  // Handle form submission
  const handleSubmit = async (values: DriverFormValues) => {
    try {
      // Send form data via EmailJS
      await emailjs.send('service_xxxxxx', 'template_xxxxxx', {
        name: values.name,
        car: values.car,
        hoursPerWeek: values.hoursPerWeek,
        preferredTime: values.preferredTime,
        phone: values.phone,
        email: values.email,
        shippingAddress: values.shippingAddress,
        cityOfOperation: values.cityOfOperation,
      });
      console.log('Driver Signup Data:', values); // Keep for debugging
      form.reset();
      setOpened(true); // Open the modal on successful submission
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('EmailJS error:', err);
      setError('Failed to send submission. Please try again later.');
    }
  };

  return (
    <Box className="relative">
      <Box
        maw={1800}
        mx="auto"
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        id="signUpDriver"
      >
        <Box className="flex min-h-dvh flex-col justify-start">
          <Box className="relative flex flex-col items-center justify-center lg:flex-row lg:justify-between">
            <TitleSection /> {/* Render memoized title section */}
            <motion.div
              initial={{ scale: 0.3, opacity: 0 }}
              whileInView={{
                scale: 1,
                opacity: 1,
                transition: {
                  duration: 0.7,
                  delay: 0.3,
                  ease: 'easeInOut',
                },
              }}
              viewport={{ once: true }}
              className="w-full lg:w-1/2"
            >
              <Box
                className="mb-16 rounded-2xl !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff] xl:scale-112 2xl:scale-120"
                px="lg"
                pt="md"
                mx="auto"
                maw={400}
              >
                <form
                  onSubmit={form.onSubmit(handleSubmit)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') e.preventDefault(); // Prevent Enter submission
                  }}
                  className="mx-auto max-w-3xl rounded-lg pt-2 pb-6"
                >
                  <TextInput
                    label="Full Name"
                    placeholder="Enter your full name"
                    size={'xs'}
                    {...form.getInputProps('name')}
                    mb="xs"
                    styles={{
                      label: { color: 'var(--color-text)' },
                      error: { color: 'var(--color-error)' },
                      input: {
                        backgroundColor: 'var(--color-default)',
                        color: 'var(--color-text)',
                      },
                    }}
                  />
                  <TextInput
                    label="Car Model (Brand, Model, Year)"
                    placeholder="Enter car model"
                    size={'xs'}
                    {...form.getInputProps('car')}
                    mb="xs"
                    styles={{
                      label: { color: 'var(--color-text)' },
                      error: { color: 'var(--color-error)' },
                      input: {
                        backgroundColor: 'var(--color-default)',
                        color: 'var(--color-text)',
                      },
                    }}
                  />
                  <NumberInput
                    label="Hours Driven Per Week"
                    placeholder="Enter hours"
                    size={'xs'}
                    min={1}
                    {...form.getInputProps('hoursPerWeek')}
                    mb="xs"
                    styles={{
                      label: { color: 'var(--color-text)' },
                      error: { color: 'var(--color-error)' },
                      input: {
                        backgroundColor: 'var(--color-default)',
                        color: 'var(--color-text)',
                      },
                    }}
                  />
                  <Select
                    label="Preferred Time"
                    placeholder="Select time"
                    size={'xs'}
                    data={['Day', 'Night', 'Both']}
                    {...form.getInputProps('preferredTime')}
                    mb="xs"
                    styles={{
                      label: { color: 'var(--color-text)' },
                      error: { color: 'var(--color-error)' },
                      input: {
                        backgroundColor: 'var(--color-default)',
                        color: 'var(--color-text)',
                      },
                      dropdown: {
                        backgroundColor: 'var(--color-default)',
                        color: 'var(--color-text)',
                      },
                    }}
                  />
                  <TextInput
                    label="Shipping Address"
                    placeholder="Enter shipping address"
                    size={'xs'}
                    {...form.getInputProps('shippingAddress')}
                    mb="xs"
                    styles={{
                      label: { color: 'var(--color-text)' },
                      error: { color: 'var(--color-error)' },
                      input: {
                        backgroundColor: 'var(--color-default)',
                        color: 'var(--color-text)',
                      },
                    }}
                  />
                  <TextInput
                    label="City of Operation"
                    placeholder="Enter city of operation"
                    size={'xs'}
                    {...form.getInputProps('cityOfOperation')}
                    mb="xs"
                    styles={{
                      label: { color: 'var(--color-text)' },
                      error: { color: 'var(--color-error)' },
                      input: {
                        backgroundColor: 'var(--color-default)',
                        color: 'var(--color-text)',
                      },
                    }}
                  />
                  <TextInput
                    label="Phone Number"
                    placeholder="Enter phone number"
                    size={'xs'}
                    {...form.getInputProps('phone')}
                    mb="xs"
                    styles={{
                      label: { color: 'var(--color-text)' },
                      error: { color: 'var(--color-error)' },
                      input: {
                        backgroundColor: 'var(--color-default)',
                        color: 'var(--color-text)',
                      },
                    }}
                  />
                  <TextInput
                    label="Email"
                    placeholder="Enter email"
                    size={'xs'}
                    type="email"
                    {...form.getInputProps('email')}
                    mb="xs"
                    styles={{
                      label: { color: 'var(--color-text)' },
                      error: { color: 'var(--color-error)' },
                      input: {
                        backgroundColor: 'var(--color-default)',
                        color: 'var(--color-text)',
                      },
                    }}
                  />

                  <Button
                    mt="xs"
                    type="submit"
                    radius={6}
                    rightSection={
                      <span className="relative inline-block overflow-hidden">
                        <ArrowRight
                          size={16}
                          className="group-hover:animate-slide-in transform stroke-[2.5]"
                        />
                      </span>
                    }
                    variant="filled"
                    className="group !w-fit !border-2 !font-medium !uppercase duration-150 ease-in-out"
                  >
                    Submit
                  </Button>
                </form>
                {error && (
                  <Notification
                    color="red"
                    title="Submission Error"
                    mt="md"
                    onClose={() => setError(null)}
                  >
                    {error}
                  </Notification>
                )}
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>

      {/* Modal for post-submission message */}
      <Modal
        opened={opened}
        padding={'lg'}
        onClose={() => setOpened(false)}
        title={
          <Text
            fw={700}
            c="#333333"
            ff={'var(--font-poppins)'}
            className="capitalize md:!text-[32px] lg:!text-[28px] xl:!text-[32px] 2xl:!text-[36px]"
          >
            Thank You for Signing Up!
          </Text>
        }
        centered
        size="xl"
        styles={{
          title: {
            marginBottom: '0px',
          },
          content: {
            borderRadius: '16px',
            boxShadow: '20px 20px 60px #bebebe, -20px -20px 60px #ffffff',
          },
        }}
      >
        <Text
          size="lg"
          fw={700}
          c="#5E5E5E"
          ff={'var(--font-poppins)'}
          className="!text-lg capitalize md:!text-xl lg:!text-lg xl:!text-xl 2xl:!text-2xl"
        >
          You’re almost done. Please check your email for the next steps. To
          complete your onboarding, you’ll be asked to do the following:
        </Text>
        <List
          withPadding
          spacing="xs"
          size="md"
          mt="sm"
          styles={{
            item: {
              color: '#333333',
              fontFamily: 'var(--font-poppins)',
              lineHeight: '1.5',
            },
          }}
          className="!text-md lg:!text-md font-medium md:!text-lg xl:!text-lg 2xl:!text-xl"
        >
          <List.Item>
            Confirm your identity (by uploading your driver’s license)
          </List.Item>
          <List.Item>
            Provide proof that you drive for a rideshare platform (screenshot of
            your rideshare profile and recent trip history)
          </List.Item>
          <List.Item>Confirm shipping address</List.Item>
          <List.Item>Submit your banking details for direct deposit</List.Item>
        </List>
        <Text
          size="md"
          c="#5E5E5E"
          ff={'var(--font-poppins)'}
          mt="md"
          className="!text-md lg:!text-md md:!text-lg xl:!text-lg 2xl:!text-xl"
        >
          You should receive the email within a few minutes. If it doesn’t
          appear in your inbox, be sure to check your spam or promotions folder.
        </Text>
        <Text
          size="md"
          c="#5E5E5E"
          ff={'var(--font-poppins)'}
          mt="sm"
          className="!text-md lg:!text-md md:!text-lg xl:!text-lg 2xl:!text-xl"
        >
          If you have any questions, feel free to contact us at any time by
          reaching out to{' '}
          <a
            href="mailto:contact@emptyad.com"
            style={{ color: '#007bff', textDecoration: 'underline' }}
          >
            contact@emptyad.com
          </a>
          .
        </Text>
        <Button
          mt="lg"
          onClick={() => setOpened(false)}
          variant="filled"
          radius={6}
          className="group !w-fit !border-2 !font-medium !uppercase duration-150 ease-in-out"
          rightSection={
            <span className="relative inline-block overflow-hidden">
              <ArrowRight
                size={16}
                className="group-hover:animate-slide-in transform stroke-[2.5]"
              />
            </span>
          }
        >
          Close
        </Button>
      </Modal>
    </Box>
  );
};

export default DriverSignupSection;
