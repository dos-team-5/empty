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
import { IconCircleCheck } from '@tabler/icons-react';

export const StatusValues = {
  PENDING: 'pending',
  APPROVED: 'approved',
  REJECTED: 'rejected',
  NEEDS_REVIEW: 'needs_review',
} as const;

type Status = (typeof StatusValues)[keyof typeof StatusValues];

interface StatusCardProps {
  status: Status;
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

const StatusCard = ({ status }: StatusCardProps) => {
  const { color } = statusInfo[status];

  return (
    <Paper
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
          background: statusGradients[status],
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
              <IconCircleCheck size={16} color={'white'} />
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
            defaultValue={status}
          />
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <Text size="sm" fw={500} c="dimmed">
              Application Progress
            </Text>
            <Badge color={color} size="lg" radius="lg" variant="light">
              {status.replace('_', ' ')}
            </Badge>
          </Group>
        </Stack>
      </Box>
    </Paper>
  );
};

export default StatusCard;
