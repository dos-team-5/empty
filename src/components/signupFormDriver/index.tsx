'use client';
import React from 'react';
import {
  Box,
  Title,
  TextInput,
  Select,
  NumberInput,
  Button,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';
import { TextAnimate } from '../TextAnimation';
import { motion } from 'motion/react';
import { memo } from 'react';

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
  <div className="-mt-20 w-full lg:w-1/2">
    <Title
      order={1}
      fw={500}
      style={{
        color: 'var(--color-text)',
        fontFamily: 'var(--font-poppins)',
      }}
    >
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        once
        className="text-center text-3xl md:text-4xl lg:text-start lg:text-[40px] 2xl:text-5xl"
      >
        Join our growing network
      </TextAnimate>
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        delay={0.5}
        once
        className="text-center text-3xl md:text-4xl lg:text-start lg:text-[40px] 2xl:text-5xl"
      >
        of drivers today
      </TextAnimate>
    </Title>
    <Title
      order={2}
      fw={400}
      mt="md"
      style={{
        color: 'var(--color-text)',
        fontFamily: 'var(--font-poppins)',
      }}
      className="text-lg"
    >
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        delay={1}
        once
        className="text-center text-base md:text-lg lg:text-start lg:text-xl 2xl:text-2xl"
      >
        After registration, we’ll provide a comprehensive
      </TextAnimate>
      <TextAnimate
        animation="blurInUp"
        by="word"
        startOnView
        duration={0.5}
        delay={1.5}
        once
        className="text-center text-base md:text-lg lg:text-start lg:text-xl 2xl:text-2xl"
      >
        overview of the platform and applicable terms
      </TextAnimate>
    </Title>
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

  // Handle form submission
  const handleSubmit = (values: DriverFormValues) => {
    console.log('Driver Signup Data:', values); // Replace with API call
    form.reset();
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
          <Box className="relative flex flex-col items-center justify-center pt-16 lg:flex-row lg:justify-between">
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
                className="mt-12 mb-16 rounded-2xl !shadow-[20px_20px_60px_#bebebe,-20px_-20px_60px_#ffffff]"
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    required
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
                    radius={15}
                    rightSection={
                      <span className="relative inline-block overflow-hidden">
                        <ArrowRight
                          size={16}
                          className="group-hover:animate-slide-in transform stroke-[2.5]"
                        />
                      </span>
                    }
                    variant="filled"
                    className="group !w-fit !border-2 !font-medium duration-150 ease-in-out"
                  >
                    Submit
                  </Button>
                </form>
              </Box>
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DriverSignupSection;
