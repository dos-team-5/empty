'use client';

import { useState } from 'react';
import {
  Paper,
  Badge,
  Button,
  Tabs,
  Text,
  Title,
  Group,
  Stack,
  Box,
  Container,
} from '@mantine/core';
import { Calendar, Clock, Coffee, Gift, Users } from 'lucide-react';
import Image from 'next/image';

interface CampaignOption {
  label: string;
  coupon: string;
}

interface CampaignProps {
  id: number;
  title: string;
  companyName: string;
  companyLogo: {
    url: string;
    name: string;
  };
  deadline: string;
  options: CampaignOption[];
  userLimit: number;
  attemptConfiguration: {
    timePeriod: string;
    totalAttempts: number;
    attemptsPerPeriod: number;
  };
  createdAt: string;
}

export default function CampaignCard() {
  const [activeTab, setActiveTab] = useState<string | null>('details');

  // Campaign data from the JSON response
  const campaign: CampaignProps = {
    id: 1,
    title: 'Summer Spin Fest 2025',
    companyName: 'The Local Coffee Shop',
    companyLogo: {
      url: 'https://storage.example.com/logos/coffee_shop_logo.png',
      name: 'coffee_shop_logo.png',
    },
    deadline: '2025-09-01T17:59:59.000Z',
    options: [
      {
        label: 'Free Espresso',
        coupon: 'FREE-ESPRESSO-2025',
      },
      {
        label: '15% Off Any Purchase',
        coupon: 'SUMMER-SAVE-15',
      },
      {
        label: 'Try Again Tomorrow!',
        coupon: 'TRY-AGAIN',
      },
      {
        label: 'Buy One, Get One Free',
        coupon: 'BOGO-DRINK-25',
      },
    ],
    userLimit: 1000,
    attemptConfiguration: {
      timePeriod: 'day',
      totalAttempts: 10,
      attemptsPerPeriod: 1,
    },
    createdAt: '2025-06-18T13:34:48.746Z',
  };

  // Format the deadline date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(date);
  };

  return (
    <Container size="md" px="md">
      <Paper shadow="md" radius="lg" withBorder style={{ overflow: 'hidden' }}>
        {/* Header Section */}
        <Box
          style={{
            // background: 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
            borderBottom: '1px solid #e5e7eb',
            padding: '1.5rem',
          }}
        >
          <Group justify="space-between" align="flex-start">
            <Group align="center" gap="lg">
              <Paper shadow="sm" p="sm" bg="white" radius="md">
                <Image
                  src="/placeholder.svg?height=60&width=60"
                  alt={campaign.companyName}
                  width={60}
                  height={60}
                  style={{ objectFit: 'contain' }}
                />
              </Paper>
              <Stack gap="xs">
                <Title order={2} size="xl" fw={700}>
                  {campaign.title}
                </Title>
                <Text size="lg" c="dimmed">
                  {campaign.companyName}
                </Text>
              </Stack>
            </Group>
            <Badge
              variant="outline"
              size="md"
              leftSection={<Calendar size={14} />}
            >
              Created {new Date(campaign.createdAt).toLocaleDateString()}
            </Badge>
          </Group>
        </Box>

        {/* Tabs Section */}
        <Tabs value={activeTab} onChange={setActiveTab} variant="default">
          <Tabs.List grow>
            <Tabs.Tab value="details">Campaign Details</Tabs.Tab>
            <Tabs.Tab value="prizes">Prize Options</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="details" pt="xl" px="xl" pb="md">
            <Stack gap="xl">
              <Group align="flex-start" gap="md">
                <Box
                  style={{
                    color: '#d97706',
                    marginTop: '2px',
                  }}
                >
                  <Clock size={20} style={{ color: '#CB6AA7' }} />
                </Box>
                <Stack gap="xs">
                  <Text fw={500} size="sm">
                    Deadline
                  </Text>
                  <Text size="sm" c="dimmed">
                    {formatDate(campaign.deadline)}
                  </Text>
                </Stack>
              </Group>

              <Group align="flex-start" gap="md">
                <Box
                  style={{
                    color: '#d97706',
                    marginTop: '2px',
                  }}
                >
                  <Users size={20} style={{ color: '#CB6AA7' }} />
                </Box>
                <Stack gap="xs">
                  <Text fw={500} size="sm">
                    User Limit
                  </Text>
                  <Text size="sm" c="dimmed">
                    {campaign.userLimit.toLocaleString()} participants
                  </Text>
                </Stack>
              </Group>

              <Group align="flex-start" gap="md">
                <Box
                  style={{
                    color: '#d97706',
                    marginTop: '2px',
                  }}
                >
                  <Coffee size={20} style={{ color: '#CB6AA7' }} />
                </Box>
                <Stack gap="xs">
                  <Text fw={500} size="sm">
                    Attempt Configuration
                  </Text>
                  <Text size="sm" c="dimmed">
                    {campaign.attemptConfiguration.attemptsPerPeriod} attempt
                    per {campaign.attemptConfiguration.timePeriod},{' '}
                    {campaign.attemptConfiguration.totalAttempts} total attempts
                  </Text>
                </Stack>
              </Group>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="prizes" pt="xl" px="xl" pb="md">
            <Stack gap="md">
              {campaign.options.map((option, index) => (
                <Paper
                  key={index}
                  p="md"
                  withBorder
                  radius="md"
                  style={{ backgroundColor: '#fafafa' }}
                >
                  <Group justify="space-between" align="center">
                    <Group align="center" gap="md">
                      <Box
                        style={{
                          backgroundColor: '#FFF0FA',
                          padding: '8px',
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Gift size={20} style={{ color: '#CB6AA7' }} />
                      </Box>
                      <Text fw={500}>{option.label}</Text>
                    </Group>
                    <Badge
                      variant="light"
                      color="gray"
                      style={{ fontFamily: 'monospace' }}
                    >
                      {option.coupon}
                    </Badge>
                  </Group>
                </Paper>
              ))}
            </Stack>
          </Tabs.Panel>
        </Tabs>

        {/* Footer Section */}
        <Box
          style={{
            borderTop: '1px solid #e5e7eb',
            padding: '1rem 1.5rem',
            backgroundColor: '#f8fafc',
          }}
        >
          <Group justify="space-between">
            <Button>Edit Campaign</Button>
          </Group>
        </Box>
      </Paper>
    </Container>
  );
}
