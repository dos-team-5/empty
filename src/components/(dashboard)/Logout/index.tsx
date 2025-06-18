'use client';
import { Button } from '@mantine/core';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const Logout = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };
  return (
    <Button unstyled onClick={handleLogout} color="red">
      Logout
    </Button>
  );
};

export default Logout;
