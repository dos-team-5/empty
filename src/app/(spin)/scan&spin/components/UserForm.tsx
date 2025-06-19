'use client';

import { useForm, zodResolver } from '@mantine/form';
import { Button, TextInput, Checkbox } from '@mantine/core';
import { z } from 'zod';
import '@mantine/core/styles.css';
import { Prize } from '../page';

// Define the UserData type
interface UserData {
  name: string;
  phoneNumber: string;
  email: string;
  agreeToEmails: boolean;
}

// Define Zod schema for validation
const userSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  phoneNumber: z.string().min(1, { message: 'Phone number is required' }),

  email: z.string().email({ message: 'Invalid email address' }),
  agreeToEmails: z.literal(true, {
    message: 'You must agree to receive email updates',
  }),
});

interface UserFormProps {
  onSubmit: (data: UserData) => void;
  spinResult: Prize | null;
}

export default function UserForm({ onSubmit, spinResult }: UserFormProps) {
  // Initialize Mantine form with Zod resolver
  const form = useForm<UserData>({
    validate: zodResolver(userSchema),
    initialValues: {
      name: '',
      phoneNumber: '+1',
      email: '',
      agreeToEmails: true,
    },
  });

  const handleSubmit = (values: UserData) => {
    onSubmit(values);
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
      className=""
    >
      <TextInput
        label="Name"
        id="name"
        {...form.getInputProps('name')}
        placeholder="Enter your name"
        required
      />

      <TextInput
        label="Phone Number"
        id="phoneNumber"
        type="tel"
        {...form.getInputProps('phoneNumber')}
        placeholder="+1 (555) 123-4567"
        required
      />

      <TextInput
        label="Email"
        id="email"
        type="email"
        {...form.getInputProps('email')}
        placeholder="your@email.com"
        required
      />

      {spinResult?.isWinning && (
        <Checkbox
          checked
          id="agreeToEmails"
          {...form.getInputProps('agreeToEmails', { type: 'checkbox' })}
          label="I agree to receive email updates and promotional offers about similar contests and products"
          required
        />
      )}

      <Button type="submit" fullWidth mt={'sm'}>
        {spinResult?.isWinning ? 'Email Me!' : 'Count Me In!'}
      </Button>
    </form>
  );
}
