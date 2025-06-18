'use client';
import { Button } from '@mantine/core';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const AdminPage = () => {
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };
  return (
    <div className="flex h-screen items-center justify-center">
      admin
      <Button onClick={handleLogout} color="red">
        Logout
      </Button>
    </div>
  );
};

export default AdminPage;
