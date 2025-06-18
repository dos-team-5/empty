'use client';
import { Icon } from '@iconify/react/dist/iconify.js';
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
    <Button
      c={'black'}
      variant="subtle"
      leftSection={<Icon icon="material-symbols:logout-rounded" />}
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
