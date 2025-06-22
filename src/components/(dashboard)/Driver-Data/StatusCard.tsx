'use client';
import { updateDriverStatus } from '@/app/(protected)/(dashboard)/admin/driver-data/action/updateDriverStatus';

import {
  Badge,
  Box,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCircleCheck } from '@tabler/icons-react';
import { Loader } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export const StatusValues = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  NEEDS_REVIEW: 'needs_review',
} as const;

type Status = (typeof StatusValues)[keyof typeof StatusValues];

interface StatusCardProps {
  status: Status;
  id: number;
}

const statusInfo: Record<Status, { color: string; progress: number }> = {
  pending: { color: 'yellow', progress: 25 },
  approved: { color: 'green', progress: 100 },
  rejected: { color: 'red', progress: 100 },
  needs_review: { color: 'blue', progress: 50 },
};

const statusGradients: Record<Status, string> = {
  pending: 'linear-gradient(90deg, #facc15 0%, #f59e0b 100%)', // yellow → amber
  approved: 'linear-gradient(90deg, #10b981 0%, #059669 100%)', // green → teal
  rejected: 'linear-gradient(90deg, #ef4444 0%, #b91c1c 100%)', // red → dark red
  needs_review: 'linear-gradient(90deg, #3b82f6 0%, #1e40af 100%)', // blue → navy
};

const StatusCard = ({ status, id }: StatusCardProps) => {
  const [driverStatus, setDriverStatus] = useState<Status>(status);
  const [loading, setLoading] = useState(false);
  const { color } = statusInfo[driverStatus];

  const router = useRouter();

  const handleStatusChange = async (newStatus: Status) => {
    setLoading(true);
    const response = await updateDriverStatus(id, newStatus);

    if (!response.success) {
      setDriverStatus(status);
    }
    if (response.success) {
      setDriverStatus(newStatus);
      notifications.show({
        title: 'Status Updated',
        message: `${response.message}`,
        color: 'green',
        autoClose: 3000,
      });
    }
    setLoading(false);
    router.refresh();
  };

  return (
    <Paper
      pos={'relative'}
      radius="xl"
      withBorder
      style={{
        overflow: 'hidden',
        boxShadow: '0 10px 25px rgba(0,0,0,0.08)',
      }}
    >
      <Box
        style={{
          height: 4,
          background: statusGradients[driverStatus],
        }}
      />
      <Box p="xl">
        <Group justify="space-between" gap="md" mb="xl">
          <Group>
            <Box
              bg={color}
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {loading ? (
                <Loader className="animate-spin" size={16} color={'white'} />
              ) : (
                <IconCircleCheck size={16} color={'white'} />
              )}
            </Box>
            <Title order={3} size="h3" c="dark">
              Status
            </Title>
          </Group>
          <Select
            w={150}
            data={[
              { value: 'pending', label: 'Pending' },
              { value: 'approved', label: 'Approved' },
              { value: 'rejected', label: 'Rejected' },
              { value: 'needs_review', label: 'Needs Review' },
            ]}
            value={driverStatus}
            onChange={(value) => handleStatusChange(value as Status)}
          />
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <Text size="sm" fw={500} c="dimmed">
              Application Progress
            </Text>
            <Badge color={color} size="lg" radius="lg" variant="light">
              {driverStatus.replace('_', ' ')}
            </Badge>
          </Group>
        </Stack>
      </Box>
    </Paper>
  );
};

export default StatusCard;
