/* eslint-disable @typescript-eslint/no-explicit-any */
// components/SignupModal.tsx
'use client';
import {
  Modal,
  TextInput,
  Select,
  NumberInput,
  Button,
  Group,
  Text,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { ArrowRight } from 'lucide-react';

// Zod schemas for validation
const clientSchema = z.object({
  companyName: z.string().min(1, { message: 'Company name is required' }),
  representativeName: z
    .string()
    .min(1, { message: 'Representative name is required' }),
  numberOfCars: z
    .number()
    .min(1, { message: 'Number of cars must be at least 1' })
    .int({ message: 'Number of cars must be an integer' }),
  contractDuration: z
    .string()
    .min(1, { message: 'Contract duration is required' }),
  area: z.string().min(1, { message: 'Area is required' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

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
    .regex(/^\+?[\d\s-]{10,}$/, { message: 'Invalid phone number' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

interface SignupModalProps {
  opened: boolean;
  onClose: () => void;
  type: 'client' | 'driver';
}

const SignupModal = ({ opened, onClose, type }: SignupModalProps) => {
  // Form setup with Zod validation
  const form = useForm({
    validate: zodResolver(type === 'client' ? clientSchema : driverSchema),
    initialValues:
      type === 'client'
        ? {
            companyName: '',
            representativeName: '',
            numberOfCars: undefined,
            contractDuration: '',
            area: '',
            email: '',
          }
        : {
            name: '',
            car: '',
            hoursPerWeek: undefined,
            preferredTime: '',
            phone: '',
            email: '',
          },
  });

  // Handle form submission
  const handleSubmit = (values: any) => {
    // Replace with API call
    form.reset();
    onClose();
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Text size="lg" fw={600} style={{ color: 'var(--color-text)' }}>
          {type === 'client' ? 'Client Signup' : 'Driver Signup'}
        </Text>
      }
      centered
      size="md"
      className="bg-[var(--color-default)]"
      overlayProps={{ backgroundOpacity: 0.5 }}
    >
      <Text size="sm" c="dimmed" mb="lg">
        {type === 'client'
          ? 'EMPTY works with diverse businesses across sectors. Connect with us to be quoted as per your specific needs.'
          : 'Join our expanding network of drivers as soon as today. Shortly after signing up, we will contact you with more information.'}
      </Text>

      <form onSubmit={form.onSubmit(handleSubmit)}>
        {type === 'client' ? (
          <>
            <TextInput
              label="Company Name"
              placeholder="Enter company name"
              required
              {...form.getInputProps('companyName')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <TextInput
              label="Representative Name"
              placeholder="Enter representative name"
              required
              {...form.getInputProps('representativeName')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <NumberInput
              label="Number of Cars"
              placeholder="Enter number of cars"
              required
              min={1}
              {...form.getInputProps('numberOfCars')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <Select
              label="Contract Duration"
              placeholder="Select duration"
              required
              data={['1 Month', '3 Months', '6 Months', '12 Months']}
              {...form.getInputProps('contractDuration')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <TextInput
              label="Area to Advertise In"
              placeholder="Enter area"
              required
              {...form.getInputProps('area')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <TextInput
              label="Email"
              placeholder="Enter email"
              required
              type="email"
              {...form.getInputProps('email')}
              mb="md"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
          </>
        ) : (
          <>
            <TextInput
              label="Name"
              placeholder="Enter your name"
              required
              {...form.getInputProps('name')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <TextInput
              label="Car Model"
              placeholder="Enter car model"
              required
              {...form.getInputProps('car')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <NumberInput
              label="Hours Driven Per Week"
              placeholder="Enter hours"
              required
              min={1}
              {...form.getInputProps('hoursPerWeek')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <Select
              label="Preferred Time"
              placeholder="Select time"
              required
              data={['Day', 'Night', 'Both']}
              {...form.getInputProps('preferredTime')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <TextInput
              label="Phone Number"
              placeholder="Enter phone number"
              required
              {...form.getInputProps('phone')}
              mb="sm"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
            <TextInput
              label="Email"
              placeholder="Enter email"
              required
              type="email"
              {...form.getInputProps('email')}
              mb="md"
              styles={{
                label: { color: 'var(--color-text)' },
                error: { color: 'var(--color-error)' },
              }}
            />
          </>
        )}

        <Group justify="flex-end" mt="md">
          <Button
            variant="outline"
            onClick={onClose}
            style={{
              color: 'var(--color-text)',
              borderColor: 'var(--color-text)',
            }}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="outline"
            rightSection={
              <span className="relative inline-block overflow-hidden">
                <ArrowRight
                  size={16}
                  className="group-hover:animate-slide-in transform stroke-[2.5]"
                  style={{ color: 'var(--color-primary)' }}
                />
              </span>
            }
            style={{
              color: 'var(--color-text)',
              borderColor: 'var(--color-text)',
            }}
            className="group hover:!border-text/30 !border-2 !font-medium duration-100 ease-linear hover:!border-[1.5px] hover:!bg-transparent"
          >
            Submit
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default SignupModal;
