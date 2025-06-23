'use client';
import {
  Modal,
  Text,
  Button,
  Alert,
  List,
  Stack,
  ThemeIcon,
} from '@mantine/core';
import { IconShield, IconRefresh, IconHeart } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

interface AdBlockerNoticeProps {
  readonly opened: boolean;
  readonly onClose: () => void;
}

export function AdBlockerNotice({ opened, onClose }: AdBlockerNoticeProps) {
  const router = useRouter();
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <Modal
      closeOnClickOutside={false}
      opened={opened}
      onClose={onClose}
      title=""
      centered
      size="md"
      withCloseButton={false}
      withOverlay={true}
    >
      <Stack align="center" gap="md">
        <ThemeIcon size={60} radius="xl" variant="light">
          <IconShield size={30} />
        </ThemeIcon>

        <Stack align="center" gap="xs">
          <Text size="xl" fw={600}>
            Ad Blocker Detected
          </Text>
          <Text size="sm" c="dimmed" ta="center">
            We noticed you&apos;re using an ad blocker. We respect your choice,
            but ads help us keep our content free.
          </Text>
        </Stack>

        <Alert
          icon={<IconHeart size={16} />}
          title="Support Our Work"
          variant="light"
          w="100%"
        >
          Our ads are carefully selected and non-intrusive. They help us
          maintain this free service for everyone.
        </Alert>

        <Stack gap="xs" w="100%">
          <Text size="sm" fw={500}>
            Please consider:
          </Text>
          <List size="sm" c="dimmed" spacing="xs">
            <List.Item>Disabling your ad blocker for this site</List.Item>
            <List.Item>Adding us to your whitelist</List.Item>
            <List.Item>Supporting us through other means</List.Item>
          </List>
        </Stack>

        <Stack gap="sm" w="100%">
          <Button
            leftSection={<IconRefresh size={16} />}
            onClick={handleRefresh}
            fullWidth
          >
            I&apos;ve Disabled My Ad Blocker
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              onClose();
              router.push('/');
            }}
            fullWidth
            color="gray"
          >
            Continue with Ad Blocker
          </Button>
        </Stack>

        <Text size="xs" c="dimmed" ta="center">
          Thank you for understanding and supporting our work!
        </Text>
      </Stack>
    </Modal>
  );
}
