'use client';

import { useForm, zodResolver } from '@mantine/form';
import { Button, TextInput, Stack, Checkbox, Text, Flex } from '@mantine/core';
import { z } from 'zod';
import '@mantine/core/styles.css';
import { useEffect, useState } from 'react';
import { getAllCampaigns } from '@/app/(protected)/(dashboard)/admin/spin-control/action/getAllCampaign';
import { SpinnerCampaign } from '@/schema';

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
  readonly onSubmit: (data: ParticipantData) => void;
  // Prop to disable the form while an action is in progress
  readonly isLoading?: boolean;
}

// --- THE COMPONENT ---
export default function ParticipationForm({
  onSubmit,
  isLoading = false,
}: ParticipationFormProps) {
  const [campaign, setCampaign] = useState<SpinnerCampaign | null>(null);
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

  useEffect(() => {
    const fetchCampaign = async () => {
      const res = await getAllCampaigns();
      if (res.success) {
        setCampaign(res.data?.records[0] as SpinnerCampaign);
      }
    };

    fetchCampaign();
  }, []);

  console.log(campaign);

  return (
    // In your actual app, the MantineProvider would likely be in your root layout file
    // and not needed inside every component. It is included here for completeness.

    <form className="relative" onSubmit={form.onSubmit(onSubmit)}>
      <Flex justify={'center'} align={'center'}>
        <Text className="!text-center" fz={16} fw={600} mb={30} mt={16}>
          Before you spin, please fill out the form so that{' '}
          <span className="!text-primary"> {campaign?.companyName ?? ''}</span>{' '}
          can send you your rewards!
        </Text>
      </Flex>
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
          label={
            <Text fz={12}>
              I agree to receive email updates and promotional offers from
              <span className="!text-primary">
                {campaign?.companyName ?? ''}
              </span>
              .
            </Text>
          }
        />
        <Button type="submit" fullWidth mt="md" size="md" loading={isLoading}>
          I&apos;m Ready to Spin!
        </Button>
      </Stack>
    </form>
  );
}
