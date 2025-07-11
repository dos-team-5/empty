/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useState } from 'react';
import {
  Container,
  Paper,
  Badge,
  Button,
  Tabs,
  Text,
  Title,
  Group,
  Stack,
  Box,
  Grid,
  Card,
  rem,
  Image,
  ActionIcon,
  LoadingOverlay,
} from '@mantine/core';
import {
  Calendar,
  Clock,
  Coffee,
  Gift,
  Users,
  Edit,
  Eye,
  Plus,
} from 'lucide-react';
import ReusableFormModal from './reusable-form-modal';
import { SpinnerCampaign } from '@/schema';
import { createCampaign } from '@/app/(protected)/(dashboard)/admin/spin-control/action/createCampaign';
import { notifications } from '@mantine/notifications';
import { updateCampaign } from '@/app/(protected)/(dashboard)/admin/spin-control/action/updateCampaign';
import Link from 'next/link';

const PRIMARY_COLOR = '#CB6AA7';

export default function SpinCampaignCard({
  data,
}: {
  readonly data: SpinnerCampaign;
}) {
  const [activeTab, setActiveTab] = useState<string | null>('details');
  const [modalOpened, setModalOpened] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit'>('create');
  const [createLoading, setCreateLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // Sample campaign data
  const [campaign, setCampaign] = useState<SpinnerCampaign>(data);

  const handleCreateCampaign = () => {
    setModalMode('create');
    setModalOpened(true);
  };

  const handleEditCampaign = () => {
    setModalMode('edit');
    setModalOpened(true);
  };

  const handleFormSubmit = async (data: any, mode: 'create' | 'edit') => {
    if (mode === 'create') {
      setCreateLoading(true);

      const res = await createCampaign(data);
      if (res.success) {
        notifications.show({
          title: 'Campaign Created',
          message: `${res.message}`,
          color: 'green',
          autoClose: 3000,
        });
      }
      setCreateLoading(false);

      // Handle create logic here
    } else {
      setEditLoading(true);

      const res = await updateCampaign({ id: campaign?.id, data });
      if (res.success) {
        notifications.show({
          title: 'Campaign Updated',
          message: `${res.message}`,
          color: 'green',
          autoClose: 3000,
        });
      }
      setEditLoading(false);

      // Update local state for demo
      setCampaign((prev) => ({
        ...prev,
        title: data.title,
        companyName: data.companyName,
        description: data.description,
        deadline: data.deadline.toISOString(),
        options: data.options,
        userLimit: data.userLimit,
        attemptConfiguration: data.attemptConfiguration,
      }));
    }
  };

  const getInitialFormData = () => {
    if (modalMode === 'edit') {
      return {
        title: campaign.title,
        companyName: campaign.companyName,
        deadline: new Date(campaign.deadline),
        options: campaign.options.map((option) => ({
          ...option,
          coupon: option.coupon ?? '',
        })),
        userLimit: campaign.userLimit ?? undefined,
        attemptConfiguration: {
          ...campaign.attemptConfiguration,
          timePeriod: campaign.attemptConfiguration.timePeriod ?? '', // Ensure timePeriod is always a string
        },
      };
    }
    return undefined;
  };

  if (!data) {
    return <LoadingOverlay visible />; // or fallback UI
  }

  return (
    <Container
      mx={{ base: 8, md: 0 }}
      px={0}
      size="100%"
      mt={{ base: 24, md: 0 }}
      py="xl"
    >
      <Stack gap="xl">
        {/* Header Actions */}
        <Group justify="space-between" align="center">
          <Title order={1} fz={{ base: 20, xl: 32 }} c={PRIMARY_COLOR}>
            Campaign Management
          </Title>
          <Button
            hidden
            leftSection={<Plus size={18} />}
            onClick={handleCreateCampaign}
            size="md"
            style={{
              backgroundColor: PRIMARY_COLOR,
            }}
            styles={{
              root: {
                '&:hover': {
                  backgroundColor: `${PRIMARY_COLOR}dd`,
                },
              },
            }}
          >
            Create New Campaign
          </Button>
        </Group>

        {/* Main Campaign Card - Full Width */}
        <Card
          withBorder
          style={{
            width: '100%',
            overflow: 'hidden',
            borderColor: `${PRIMARY_COLOR}30`,
          }}
        >
          {/* Header Section */}
          <Box
            style={{
              background: `linear-gradient(135deg, ${PRIMARY_COLOR}15 0%, ${PRIMARY_COLOR}25 100%)`,
              borderBottom: `2px solid ${PRIMARY_COLOR}30`,
              padding: rem(24),
            }}
            pos={'relative'}
          >
            {/* preview */}
            <ActionIcon
              variant="light"
              size="md"
              pos="absolute"
              top={rem(16)}
              right={rem(16)}
              component={Link}
              href={`/scan&spin?campaignId=${campaign.id}`}
            >
              <Eye size={18} style={{ color: PRIMARY_COLOR }} />
            </ActionIcon>

            <Grid align="center">
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Group align="center" gap="xl">
                  <Paper
                    shadow="md"
                    p={{ base: 8, md: 'md' }}
                    bg="white"
                    radius="lg"
                  >
                    <Image
                      title="Company Logo"
                      w={{ base: 40, md: 80 }}
                      h={{ base: 40, md: 80 }}
                      src={campaign.companyLogo?.url}
                      fallbackSrc="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/Starbucks_Corporation_Logo_2011.svg/1200px-Starbucks_Corporation_Logo_2011.svg.png"
                      alt={campaign.companyName}
                      style={{ objectFit: 'contain' }}
                    />
                  </Paper>
                  <Stack gap="xs">
                    <Title
                      order={2}
                      fz={{ base: 16, xl: 28 }}
                      fw={700}
                      c={PRIMARY_COLOR}
                    >
                      {campaign.title}
                    </Title>
                    <Text size="lg" c="dimmed" fw={500}>
                      {campaign.companyName}
                    </Text>
                  </Stack>
                </Group>
              </Grid.Col>
              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="sm" align="flex-end">
                  <Badge
                    variant="light"
                    size="lg"
                    leftSection={<Calendar size={16} />}
                    color="gray"
                    style={{
                      backgroundColor: `${PRIMARY_COLOR}15`,
                      color: PRIMARY_COLOR,
                    }}
                  >
                    Created {new Date(campaign.createdAt).toLocaleDateString()}
                  </Badge>
                </Stack>
              </Grid.Col>
            </Grid>
          </Box>

          {/* Tabs Section */}
          <Tabs
            value={activeTab}
            onChange={setActiveTab}
            variant="default"
            styles={{
              tab: {
                '&[dataActive]': {
                  color: PRIMARY_COLOR,
                  borderColor: PRIMARY_COLOR,
                },
                '&:hover': {
                  backgroundColor: `${PRIMARY_COLOR}10`,
                },
              },
            }}
          >
            <Tabs.List grow>
              <Tabs.Tab value="details">Campaign Details</Tabs.Tab>
              <Tabs.Tab value="prizes">Prize Options</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel
              value="details"
              pt="xl"
              px={{ base: 'sm', xl: 'xl' }}
              pb="md"
            >
              <Grid>
                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Group align="flex-start" gap="md">
                    <Box
                      style={{
                        color: PRIMARY_COLOR,
                        marginTop: rem(2),
                      }}
                    >
                      <Clock size={24} />
                    </Box>
                    <Stack gap="xs">
                      <Text fw={600} size="md" c={PRIMARY_COLOR}>
                        Deadline
                      </Text>
                      <Text size="sm" c="dimmed">
                        {
                          new Date(campaign.deadline)
                            .toISOString()
                            .split('T')[0]
                        }
                      </Text>
                    </Stack>
                  </Group>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Group align="flex-start" gap="md">
                    <Box
                      style={{
                        color: PRIMARY_COLOR,
                        marginTop: rem(2),
                      }}
                    >
                      <Users size={24} />
                    </Box>
                    <Stack gap="xs">
                      <Text fw={600} size="md" c={PRIMARY_COLOR}>
                        Participation Limit
                      </Text>
                      <Text size="sm" c="dimmed">
                        {campaign.userLimit} participants
                      </Text>
                    </Stack>
                  </Group>
                </Grid.Col>

                <Grid.Col span={{ base: 12, md: 4 }}>
                  <Group align="flex-start" gap="md">
                    <Box
                      style={{
                        color: PRIMARY_COLOR,
                        marginTop: rem(2),
                      }}
                    >
                      <Coffee size={24} />
                    </Box>
                    <Stack gap="xs">
                      <Text fw={600} size="md" c={PRIMARY_COLOR}>
                        Attempt Configuration
                      </Text>
                      <Text size="sm" c="dimmed">
                        {campaign.attemptConfiguration.attemptsPerPeriod}{' '}
                        attempt per {campaign.attemptConfiguration.timePeriod},{' '}
                        {campaign.attemptConfiguration.totalAttempts} total
                        attempts
                      </Text>
                    </Stack>
                  </Group>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel
              value="prizes"
              pt="xl"
              px={{ base: 'sm', xl: 'xl' }}
              pb="md"
            >
              <Grid>
                {campaign.options.map((option, index) => (
                  <Grid.Col key={index} span={{ base: 12, sm: 6, md: 4 }}>
                    <Paper
                      p="lg"
                      withBorder
                      radius="lg"
                      style={{
                        backgroundColor: `${PRIMARY_COLOR}08`,
                        borderColor: `${PRIMARY_COLOR}20`,
                        height: '100%',
                      }}
                    >
                      <Stack gap="md" align="center">
                        <Box
                          style={{
                            backgroundColor: `${PRIMARY_COLOR}20`,
                            padding: rem(12),
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <Gift size={24} style={{ color: PRIMARY_COLOR }} />
                        </Box>
                        <Text fw={600} ta="center" c={PRIMARY_COLOR}>
                          {option.label}
                        </Text>
                        <Badge
                          variant="light"
                          color="gray"
                          style={{
                            fontFamily: 'monospace',
                            backgroundColor: `${PRIMARY_COLOR}15`,
                            color: PRIMARY_COLOR,
                          }}
                        >
                          {option.coupon}
                        </Badge>
                      </Stack>
                    </Paper>
                  </Grid.Col>
                ))}
              </Grid>
            </Tabs.Panel>
          </Tabs>

          {/* Footer Actions */}
          <Box
            style={{
              borderTop: `2px solid ${PRIMARY_COLOR}20`,
              padding: rem(24),
              backgroundColor: `${PRIMARY_COLOR}05`,
            }}
          >
            <Group justify="space-between">
              <Button
                variant="outline"
                leftSection={<Edit size={18} />}
                onClick={handleEditCampaign}
                size="md"
                style={{
                  borderColor: PRIMARY_COLOR,
                  color: PRIMARY_COLOR,
                }}
                styles={{
                  root: {
                    '&:hover': {
                      backgroundColor: `${PRIMARY_COLOR}15`,
                    },
                  },
                }}
              >
                Edit Campaign
              </Button>
            </Group>
          </Box>
        </Card>
      </Stack>

      {/* Reusable Form Modal */}
      <ReusableFormModal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        onSubmit={handleFormSubmit}
        mode={modalMode}
        initialData={getInitialFormData()}
        entityId={modalMode === 'edit' ? campaign.id : undefined}
        title={modalMode === 'create' ? 'Create New Campaign' : 'Edit Campaign'}
        size={'xl'}
      />
    </Container>
  );
}
