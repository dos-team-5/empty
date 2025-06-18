'use client';

import { useForm, zodResolver } from '@mantine/form';
import { Button, TextInput } from '@mantine/core';
import { z } from 'zod';

// Define the UserData type
interface UserData {
  name: string;
  phoneNumber: string;
  email: string;
}

// Define Zod schema for validation
const userSchema = z.object({
  name: z.string().trim().min(1, { message: 'Name is required' }),
  phoneNumber: z
    .string()
    .min(1, { message: 'Phone number is required' })
    .regex(/^\+\d[\d\s-]{8,}$/, { message: 'Invalid phone number format' }),
  email: z.string().email({ message: 'Invalid email address' }),
});

interface UserFormProps {
  onSubmit: (data: UserData) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  // Initialize Mantine form with Zod resolver
  const form = useForm<UserData>({
    validate: zodResolver(userSchema),
    initialValues: {
      name: '',
      phoneNumber: '+1',
      email: '',
    },
  });

  const handleSubmit = (values: UserData) => {
    onSubmit(values);
  };

  return (
    <form
      onSubmit={form.onSubmit(handleSubmit)}
      style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
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

      <Button
        type="submit"
        fullWidth
       
      >
        Email Me! 
      </Button>
    </form>
  );
}
