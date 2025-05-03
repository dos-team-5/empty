// components/DriverSignupSection.tsx
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

// Zod schema for driver validation
const driverSchema = z.object({
  name: z.string().min(1, { message: 'Name is required' }),
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
});

type DriverFormValues = z.infer<typeof driverSchema>;

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
    },
  });

  // Handle form submission
  const handleSubmit = (values: DriverFormValues) => {
    console.log('Driver Signup Data:', values); // Replace with API call
    form.reset();
  };

  return (
    <Box
      className="relative"
      // className="from-default to-primary-100 relative h-dvh bg-gradient-to-b from-55%"
    >
      <Box
        maw={1800}
        mx="auto"
        className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
        id="signUpDriver"
      >
        <Box className="flex min-h-dvh flex-col justify-start">
          <Box className="relative flex items-center justify-between pt-16">
            <div className="-mt-20 w-1/2">
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
                  className="text-start text-[40px]"
                >
                  Join our growing network
                </TextAnimate>
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  startOnView
                  duration={0.5}
                  once
                  className="text-start text-[40px]"
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
                  delay={0.5}
                  once
                  className="text-start text-lg"
                >
                  After registration, we’ll provide a comprehensive
                </TextAnimate>
                <TextAnimate
                  animation="blurInUp"
                  by="word"
                  startOnView
                  duration={0.5}
                  delay={0.5}
                  once
                  className="text-start text-lg"
                >
                  overview of the platform and applicable terms
                </TextAnimate>
              </Title>
            </div>
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
              className="w-1/2"
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
                    label="Name"
                    placeholder="Enter your name"
                    required
                    size={'md'}
                    {...form.getInputProps('name')}
                    mb="sm"
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
                    label="Car Model"
                    placeholder="Enter car model"
                    required
                    size={'md'}
                    {...form.getInputProps('car')}
                    mb="sm"
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
                    size={'md'}
                    min={1}
                    {...form.getInputProps('hoursPerWeek')}
                    mb="sm"
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
                    size={'md'}
                    data={['Day', 'Night', 'Both']}
                    {...form.getInputProps('preferredTime')}
                    mb="sm"
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
                    label="Phone Number"
                    placeholder="Enter phone number"
                    required
                    size={'md'}
                    {...form.getInputProps('phone')}
                    mb="sm"
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
                    size={'md'}
                    type="email"
                    {...form.getInputProps('email')}
                    mb="md"
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
              </Box>{' '}
            </motion.div>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default DriverSignupSection;
