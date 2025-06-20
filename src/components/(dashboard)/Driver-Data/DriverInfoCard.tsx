'use client';

import { Driver } from '@/schema';
import {
  Paper,
  Badge,
  Button,
  Text,
  Title,
  Group,
  Stack,
  Grid,
  Tabs,
  Progress,
  Avatar,
  Box,
  Container,
} from '@mantine/core';
import {
  IconUser,
  IconMail,
  IconPhone,
  IconMapPin,
  IconCar,
  IconCalendar,
  IconFileText,
  IconDownload,
  IconCircleCheck,
  IconStar,
  IconClock,
  IconShield,
  IconExternalLink,
} from '@tabler/icons-react';
import { useState } from 'react';
import { InfoCard } from './InfoCard';
import { ImageCard } from './ImageCard';

interface DriverInformationCardProps {
  readonly data: Driver;
}

export default function DriverInfoCard({ data }: DriverInformationCardProps) {
  const [activeTab, setActiveTab] = useState<string | null>('overview');

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (
      Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
    );
  };

  const handleDownload = (url: string, filename: string) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Box
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #f8fafc 0%, white 50%, #f1f5f9 100%)',
        padding: '1rem',
      }}
    >
      <Container size="xl">
        <Stack gap="xl">
          {/* Hero Section */}
          <Paper
            radius="xl"
            style={{
              background:
                'linear-gradient(135deg, #CB6AA7 0%, #D478B8 50%, #CB6AA7 100%)',
              position: 'relative',
              overflow: 'hidden',
              boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
            }}
          >
            {/* Background decorations */}
            <Box
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: 384,
                height: 384,
                background: 'rgba(255,255,255,0.1)',
                borderRadius: '50%',
                transform: 'translate(192px, -192px)',
              }}
            />
            <Box
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: 256,
                height: 256,
                background: 'rgba(255,255,255,0.05)',
                borderRadius: '50%',
                transform: 'translate(-128px, 128px)',
              }}
            />

            <Box p="xl" style={{ position: 'relative', zIndex: 10 }}>
              <Group justify="space-between" align="flex-start" gap="xl">
                <Group gap="xl">
                  <Box style={{ position: 'relative' }}>
                    <Avatar
                      size={96}
                      radius="lg"
                      style={{
                        background: 'rgba(255,255,255,0.2)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                      }}
                    >
                      <IconUser size={48} color="white" />
                    </Avatar>
                    <Box
                      style={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        width: 24,
                        height: 24,
                        background: '#10b981',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                      }}
                    >
                      <IconCircleCheck size={16} color="white" />
                    </Box>
                  </Box>

                  <Stack gap="xs">
                    <Title order={1} size="h1" c="white" fw={700}>
                      {data.fullName}
                    </Title>
                    <Text size="lg" c="rgba(255,255,255,0.9)" mb="sm">
                      Professional Driver Application
                    </Text>
                    <Group gap="lg">
                      <Group gap="xs">
                        <IconStar size={16} color="white" fill="currentColor" />
                        <Text size="sm" c="white">
                          Verified Profile
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconShield size={16} color="white" />
                        <Text size="sm" c="white">
                          Background Checked
                        </Text>
                      </Group>
                    </Group>
                  </Stack>
                </Group>

                <Group gap="sm">
                  <Button
                    leftSection={<IconExternalLink size={16} />}
                    variant="white"
                    color="dark"
                    size="md"
                    radius="xl"
                    style={{
                      color: '#CB6AA7',
                      fontWeight: 600,
                      transition: 'all 0.3s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.05)';
                      e.currentTarget.style.boxShadow =
                        '0 10px 25px rgba(0,0,0,0.15)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    View Full Profile
                  </Button>
                  <Button
                    leftSection={<IconDownload size={16} />}
                    variant="outline"
                    size="md"
                    radius="xl"
                    style={{
                      borderColor: 'rgba(255,255,255,0.3)',
                      color: 'white',
                      fontWeight: 600,
                      backdropFilter: 'blur(10px)',
                    }}
                  >
                    Download Resume
                  </Button>
                </Group>
              </Group>
            </Box>
          </Paper>

          {/* Navigation Tabs */}
          <Paper
            p="xs"
            radius="xl"
            withBorder
            style={{
              backgroundColor: 'white',
              boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
            }}
          >
            <Tabs
              value={activeTab}
              onChange={setActiveTab}
              variant="pills"
              radius="lg"
            >
              <Tabs.List>
                <Tabs.Tab
                  value="overview"
                  leftSection={<IconUser size={16} />}
                  style={{
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Overview
                </Tabs.Tab>
                <Tabs.Tab
                  value="vehicle"
                  leftSection={<IconCar size={16} />}
                  style={{
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Vehicle
                </Tabs.Tab>
                <Tabs.Tab
                  value="documents"
                  leftSection={<IconFileText size={16} />}
                  style={{
                    fontWeight: 500,
                    transition: 'all 0.3s ease',
                  }}
                >
                  Documents
                </Tabs.Tab>
              </Tabs.List>

              {/* Overview Tab */}
              <Tabs.Panel value="overview" pt="xl">
                <Grid>
                  <Grid.Col span={{ base: 12, lg: 8 }}>
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
                          background:
                            'linear-gradient(90deg, #CB6AA7 0%, #D478B8 100%)',
                        }}
                      />
                      <Box p="xl">
                        <Group gap="md" mb="xl">
                          <Box
                            style={{
                              width: 32,
                              height: 32,
                              borderRadius: 8,
                              background: 'rgba(203, 106, 167, 0.1)',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <IconUser size={16} color="#CB6AA7" />
                          </Box>
                          <Title order={2} size="h2" c="dark">
                            Contact Information
                          </Title>
                        </Group>

                        <Grid>
                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <InfoCard
                              icon={IconMail}
                              label="Email"
                              value={data.email}
                            />
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <InfoCard
                              icon={IconPhone}
                              label="Phone"
                              value={data.phone}
                            />
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <InfoCard
                              icon={IconMapPin}
                              label="City/Province"
                              value={data.cityProvince ?? ''}
                            />
                          </Grid.Col>
                          <Grid.Col span={{ base: 12, md: 6 }}>
                            <InfoCard
                              icon={IconMapPin}
                              label="Address"
                              value={data?.shippingAddress ?? ''}
                            />
                          </Grid.Col>
                        </Grid>
                      </Box>
                    </Paper>
                  </Grid.Col>

                  <Grid.Col span={{ base: 12, lg: 4 }}>
                    <Stack gap="xl">
                      {/* Ride Share Info */}
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
                            background:
                              'linear-gradient(90deg, #CB6AA7 0%, #D478B8 100%)',
                          }}
                        />
                        <Box p="xl">
                          <Group gap="md" mb="xl">
                            <Box
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: 'rgba(203, 106, 167, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <IconCalendar size={16} color="#CB6AA7" />
                            </Box>
                            <Title order={3} size="h3" c="dark">
                              Ride Share
                            </Title>
                          </Group>

                          <Stack gap="lg">
                            <Box>
                              <Text size="sm" fw={500} c="dimmed" mb="sm">
                                Platforms
                              </Text>
                              <Group gap="xs">
                                {data?.rideSharePlatforms ??
                                  [].map((platform) => (
                                    <Badge
                                      key={platform}
                                      size="lg"
                                      radius="lg"
                                      style={{
                                        background:
                                          'linear-gradient(135deg, #CB6AA7 0%, #D478B8 100%)',
                                        color: 'white',
                                        fontWeight: 500,
                                      }}
                                    >
                                      {platform}
                                    </Badge>
                                  ))}
                              </Group>
                            </Box>

                            <Box>
                              <Text size="sm" fw={500} c="dimmed" mb="sm">
                                Schedule
                              </Text>
                              <Paper
                                p="md"
                                radius="lg"
                                style={{
                                  background:
                                    'linear-gradient(135deg, rgba(203, 106, 167, 0.05) 0%, rgba(212, 120, 184, 0.05) 100%)',
                                  borderLeft: '4px solid #CB6AA7',
                                }}
                              >
                                <Group gap="xs" mb="xs">
                                  <IconClock size={16} color="#CB6AA7" />
                                  <Text size="sm" fw={500} c="#CB6AA7">
                                    Weekly Schedule
                                  </Text>
                                </Group>
                                <Text c="dark">
                                  {data.weeklyDrivingSchedule}
                                </Text>
                              </Paper>
                            </Box>
                          </Stack>
                        </Box>
                      </Paper>

                      {/* Status Card */}
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
                            background:
                              'linear-gradient(90deg, #10b981 0%, #059669 100%)',
                          }}
                        />
                        <Box p="xl">
                          <Group gap="md" mb="xl">
                            <Box
                              style={{
                                width: 32,
                                height: 32,
                                borderRadius: 8,
                                background: 'rgba(16, 185, 129, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                              }}
                            >
                              <IconCircleCheck size={16} color="#10b981" />
                            </Box>
                            <Title order={3} size="h3" c="dark">
                              Status
                            </Title>
                          </Group>

                          <Stack gap="md">
                            <Group justify="space-between">
                              <Text size="sm" fw={500} c="dimmed">
                                Application Progress
                              </Text>
                              <Text size="sm" fw={700} c="#10b981">
                                100%
                              </Text>
                            </Group>
                            <Progress
                              value={100}
                              size="lg"
                              radius="xl"
                              color="green"
                            />
                            <Group justify="center" pt="sm">
                              <Badge
                                color="green"
                                size="lg"
                                radius="lg"
                                variant="light"
                              >
                                ✓ Under Review
                              </Badge>
                            </Group>
                          </Stack>
                        </Box>
                      </Paper>
                    </Stack>
                  </Grid.Col>
                </Grid>
              </Tabs.Panel>

              {/* Vehicle Tab */}
              <Tabs.Panel value="vehicle" pt="xl">
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
                      background:
                        'linear-gradient(90deg, #CB6AA7 0%, #D478B8 100%)',
                    }}
                  />
                  <Box p="xl">
                    <Group gap="md" mb="xl">
                      <Box
                        style={{
                          width: 32,
                          height: 32,
                          borderRadius: 8,
                          background: 'rgba(203, 106, 167, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <IconCar size={16} color="#CB6AA7" />
                      </Box>
                      <Title order={2} size="h2" c="dark">
                        Vehicle Information
                      </Title>
                    </Group>

                    <Grid>
                      <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Grid mb="xl">
                          {[
                            {
                              label: 'Make',
                              value: data.vehicleMake,
                            },
                            {
                              label: 'Model',
                              value: data.vehicleModel,
                            },
                            {
                              label: 'Year',
                              value: data.vehicleYear,
                            },
                          ].map((item, index) => (
                            <Grid.Col span={{ base: 12, sm: 4 }} key={index}>
                              <Paper
                                p="xl"
                                radius="xl"
                                withBorder
                                ta="center"
                                style={{
                                  background:
                                    'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                                  transition: 'all 0.3s ease',
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.transform =
                                    'translateY(-4px)';
                                  e.currentTarget.style.boxShadow =
                                    '0 10px 25px rgba(0,0,0,0.1)';
                                  e.currentTarget.style.borderColor = '#CB6AA7';
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.transform =
                                    'translateY(0)';
                                  e.currentTarget.style.boxShadow = 'none';
                                  e.currentTarget.style.borderColor = '#e9ecef';
                                }}
                              >
                                <Text size="sm" fw={500} c="dimmed" mb="xs">
                                  {item.label}
                                </Text>
                                <Text size="xl" fw={700} c="dark">
                                  {item.value}
                                </Text>
                              </Paper>
                            </Grid.Col>
                          ))}
                        </Grid>
                      </Grid.Col>

                      <Grid.Col span={{ base: 12, lg: 6 }}>
                        <Stack gap="md">
                          <Title order={4} c="dark">
                            Vehicle Photos
                          </Title>
                          <Grid>
                            {data?.vehiclePhotos!.length > 0 ? (
                              data?.vehiclePhotos?.map((photo, index) => (
                                <Grid.Col
                                  span={{ base: 12, sm: 6 }}
                                  key={photo.key ?? index} // fallback key if photo.key is missing
                                >
                                  <ImageCard
                                    src={
                                      photo.url ||
                                      '/placeholder.svg?height=200&width=300'
                                    }
                                    alt={`Vehicle photo ${index + 1}`}
                                    name={photo.name}
                                    size={photo.size}
                                  />
                                </Grid.Col>
                              ))
                            ) : (
                              <Grid.Col span={12}>
                                <Text c="dimmed" ta="center">
                                  No vehicle photos available.
                                </Text>
                              </Grid.Col>
                            )}
                          </Grid>
                        </Stack>
                      </Grid.Col>
                    </Grid>
                  </Box>
                </Paper>
              </Tabs.Panel>

              {/* Documents Tab */}
              <Tabs.Panel value="documents" pt="xl">
                <Stack gap="xl">
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
                        background:
                          'linear-gradient(90deg, #CB6AA7 0%, #D478B8 100%)',
                      }}
                    />
                    <Box p="xl">
                      <Group gap="md" mb="xl">
                        <Box
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: 'rgba(203, 106, 167, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconFileText size={16} color="#CB6AA7" />
                        </Box>
                        <Title order={2} size="h2" c="dark">
                          Verification Documents
                        </Title>
                      </Group>

                      <Grid>
                        {[
                          {
                            title: "Driver's License",
                            docs: data.driversLicense,
                          },
                          {
                            title: 'Profile Photo',
                            docs: data.driverProfile,
                          },
                          {
                            title: 'Trip History',
                            docs: data.tripHistory,
                          },
                        ].map((section, sectionIndex) => (
                          <Grid.Col
                            span={{ base: 12, lg: 4 }}
                            key={sectionIndex}
                          >
                            <Stack gap="md">
                              <Group gap="xs">
                                <Box
                                  style={{
                                    width: 8,
                                    height: 8,
                                    borderRadius: '50%',
                                    backgroundColor: '#CB6AA7',
                                  }}
                                />
                                <Title order={4} c="dark">
                                  {section.title}
                                </Title>
                              </Group>
                              <Stack gap="md">
                                <ImageCard
                                  src={
                                    section.docs?.url ??
                                    '/placeholder.svg?height=200&width=300'
                                  }
                                  alt={section.title}
                                  name={section.docs?.name ?? ''}
                                  size={section.docs?.size ?? 0}
                                />
                              </Stack>
                            </Stack>
                          </Grid.Col>
                        ))}
                      </Grid>
                    </Box>
                  </Paper>

                  {/* Additional Files */}
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
                        background:
                          'linear-gradient(90deg, #CB6AA7 0%, #D478B8 100%)',
                      }}
                    />
                    <Box p="xl">
                      <Group gap="md" mb="xl">
                        <Box
                          style={{
                            width: 32,
                            height: 32,
                            borderRadius: 8,
                            background: 'rgba(203, 106, 167, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <IconFileText size={16} color="#CB6AA7" />
                        </Box>
                        <Title order={3} size="h3" c="dark">
                          Void Cheque
                        </Title>
                      </Group>

                      <Stack gap="md">
                        <Paper
                          p="lg"
                          radius="xl"
                          withBorder
                          style={{
                            background:
                              'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                            transition: 'all 0.3s ease',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.transform =
                              'translateY(-2px)';
                            e.currentTarget.style.boxShadow =
                              '0 10px 25px rgba(0,0,0,0.1)';
                            e.currentTarget.style.borderColor =
                              'rgba(203, 106, 167, 0.3)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.transform = 'translateY(0)';
                            e.currentTarget.style.boxShadow = 'none';
                            e.currentTarget.style.borderColor = '#e9ecef';
                          }}
                        >
                          <Group justify="space-between">
                            <Group gap="md">
                              <Box
                                style={{
                                  width: 48,
                                  height: 48,
                                  borderRadius: 8,
                                  background:
                                    'linear-gradient(135deg, #CB6AA7 0%, #D478B8 100%)',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  boxShadow:
                                    '0 4px 12px rgba(203, 106, 167, 0.3)',
                                }}
                              >
                                <IconFileText size={24} color="white" />
                              </Box>
                              <Box>
                                <Text fw={600} c="dark">
                                  {data.voidCheque?.name}
                                </Text>
                                <Text size="sm" c="dimmed">
                                  {data.voidCheque?.type} •{' '}
                                  {formatFileSize(data.voidCheque?.size ?? 0)}
                                </Text>
                              </Box>
                            </Group>
                            <Button
                              leftSection={<IconDownload size={16} />}
                              onClick={() =>
                                handleDownload(
                                  data.voidCheque?.url ?? '',
                                  data.voidCheque?.name ?? ''
                                )
                              }
                              radius="xl"
                              style={{
                                background:
                                  'linear-gradient(135deg, #CB6AA7 0%, #D478B8 100%)',
                                transition: 'all 0.3s ease',
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background =
                                  'linear-gradient(135deg, #B85A96 0%, #CB6AA7 100%)';
                                e.currentTarget.style.transform = 'scale(1.05)';
                                e.currentTarget.style.boxShadow =
                                  '0 8px 25px rgba(203, 106, 167, 0.4)';
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background =
                                  'linear-gradient(135deg, #CB6AA7 0%, #D478B8 100%)';
                                e.currentTarget.style.transform = 'scale(1)';
                                e.currentTarget.style.boxShadow = 'none';
                              }}
                            >
                              Download
                            </Button>
                          </Group>
                        </Paper>
                      </Stack>
                    </Box>
                  </Paper>
                </Stack>
              </Tabs.Panel>
            </Tabs>
          </Paper>
        </Stack>
      </Container>
    </Box>
  );
}
