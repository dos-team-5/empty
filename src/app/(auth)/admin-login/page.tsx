'use client';

import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import {
  Button,
  TextInput,
  Text,
  Title,
  Stack,
  Paper,
  PasswordInput,
} from '@mantine/core';

// SVG Icon for the branding panel
const IconLock = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="64"
    height="64"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-white opacity-90"
  >
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
  </svg>
);

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    // Using your exact signIn logic
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (result?.error) {
      // You can customize error messages here if you want
      if (result.error === 'CredentialsSignin') {
        setError('Invalid email or password. Please try again.');
      } else {
        setError(result.error);
      }
    } else {
      router.push('/admin/spin-control');
    }
  };

  return (
    // Main container using Tailwind for background and centering
    <div className="flex min-h-screen items-center justify-center">
      {/* Card container with shadow, rounded corners, and responsive layout */}
      <div className="mx-auto flex w-full max-w-4xl flex-col overflow-hidden rounded-2xl shadow-2xl md:flex-row">
        {/* Left Panel: Branding & Information */}
        <div className="flex w-full flex-col items-center justify-center bg-gradient-to-br from-[var(--mantine-primary-color-6)] to-[var(--mantine-primary-color-7)] p-8 text-center text-white sm:p-12 md:w-5/12">
          <IconLock />
          <Title order={1} className="mt-4 !text-4xl font-bold !text-white">
            Admin Panel
          </Title>
          <Text className="mt-2 !text-lg leading-relaxed !opacity-90">
            Secure access for authorized personnel only.
          </Text>
        </div>

        {/* Right Panel: Login Form using Mantine components */}
        <div className="w-full p-8 sm:p-12 md:w-7/12">
          <Paper
            withBorder={false}
            shadow="none"
            p={0}
            radius="md"
            bg={'transparent'}
          >
            <Title order={2} className="mb-2 !text-3xl !font-semibold">
              Welcome Back
            </Title>
            <Text c="dimmed" mb={30}>
              Please enter your credentials to login.
            </Text>

            <form onSubmit={handleSubmit}>
              <Stack gap="lg">
                <TextInput
                  label="Email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.currentTarget.value)}
                  required
                  size="md"
                  radius="md"
                />
                <PasswordInput
                  label="Password"
                  placeholder="Your password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.currentTarget.value)}
                  required
                  size="md"
                  radius="md"
                />
                {error && (
                  <Text
                    c="red.6"
                    size="sm"
                    ta="center"
                    className="rounded-md bg-red-50 p-2 dark:bg-red-900/20"
                  >
                    {error}
                  </Text>
                )}
                <Button
                  type="submit"
                  fullWidth
                  size="md"
                  radius="md"
                  disabled={loading}
                >
                  Login
                </Button>
              </Stack>
            </form>
          </Paper>
        </div>
      </div>
    </div>
  );
}
