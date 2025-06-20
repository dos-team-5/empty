'use client';

import { useForm, zodResolver } from '@mantine/form';
import { Button, TextInput, Stack, Checkbox } from '@mantine/core';
import { z } from 'zod';
import '@mantine/core/styles.css';

// --- TYPE DEFINITIONS ---
// This is the data captured from the form
export interface ParticipantData {
  name: string;
  email: string;
  phone: string;
  agreeToEmails?: boolean;
}

// --- ZOD SCHEMA ---
// Defines the validation rules for the form fields
const participantSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Name must be at least 2 characters long' }),
  email: z.string().email({ message: 'Please enter a valid email address' }),
  phone: z.string().min(10, { message: 'Please enter a valid phone number' }),
});

// --- COMPONENT PROPS ---
interface ParticipationFormProps {
  // A function that will be called with the form data when submission is successful
  onSubmit: (data: ParticipantData) => void;
  // Prop to disable the form while an action is in progress
  isLoading?: boolean;
}

// --- THE COMPONENT ---
export default function ParticipationForm({
  onSubmit,
  isLoading = false,
}: ParticipationFormProps) {
  // Initialize Mantine form with Zod resolver for validation
  const form = useForm<ParticipantData>({
    validate: zodResolver(participantSchema),
    initialValues: {
      name: '',
      email: '',
      phone: '',
      agreeToEmails: true,
    },
  });

  return (
    // In your actual app, the MantineProvider would likely be in your root layout file
    // and not needed inside every component. It is included here for completeness.
    <>
      <form onSubmit={form.onSubmit(onSubmit)}>
        <Stack gap="md">
          <TextInput
            withAsterisk
            label="Full Name"
            placeholder="Enter your full name"
            {...form.getInputProps('name')}
          />
          <TextInput
            withAsterisk
            label="Email Address"
            type="email"
            placeholder="your.email@example.com"
            {...form.getInputProps('email')}
          />
          <TextInput
            withAsterisk
            label="Phone Number"
            type="tel"
            placeholder="+1 (555) 123-4567"
            {...form.getInputProps('phone')}
          />
          <Checkbox
            id="agreeToEmails"
            {...form.getInputProps('agreeToEmails', { type: 'checkbox' })}
            label="I agree to receive email updates and promotional offers."
          />
          <Button type="submit" fullWidth mt="md" size="md" loading={isLoading}>
            I'm Ready to Spin!
          </Button>
        </Stack>
      </form>
    </>
  );
}
