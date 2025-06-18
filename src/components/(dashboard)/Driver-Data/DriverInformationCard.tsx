'use client';

import { FileHandlerRes } from '@/components/FileManager/components/FileHandler';
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  Group,
  Image,
  SimpleGrid,
  Text,
  Title,
} from '@mantine/core';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Car,
  Calendar,
  FileText,
  Download,
} from 'lucide-react';

interface DriverApplicationData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    cityProvince: string;
    shippingAddress: string;
  };
  vehicleInfo: {
    vehicleMake: string;
    vehicleModel: string;
    vehicleYear: string;
    vehiclePhotos: FileHandlerRes[];
  };
  rideShareInfo: {
    rideSharePlatforms: string[];
    weeklyDrivingSchedule: string;
  };
  documents: {
    driversLicense: FileHandlerRes[];
    driverProfile: FileHandlerRes[];
    tripHistory: FileHandlerRes[];
  };
  additionalFiles: FileHandlerRes[];
}

export default function DriverInformationCard() {
  const applicationData: DriverApplicationData = {
    personalInfo: {
      fullName: 'Saepe quis labore om',
      email: 'new@gmail.com',
      phone: '01770054720',
      cityProvince: 'Cumque harum volupta',
      shippingAddress: 'Consequatur veritat',
    },
    vehicleInfo: {
      vehicleMake: 'Atque sint providen',
      vehicleModel: 'Rerum reiciendis ea',
      vehicleYear: '2020',
      vehiclePhotos: [
        {
          key: 'image/1750219534066-Content.webp',
          url: 'https://pub-ccf3ac7f79c147e492ae517bbec2ffbb.r2.dev/image/1750219534066-Content.webp',
          size: 83866,
          type: 'image/webp',
          name: 'Content.webp',
        },
        {
          key: 'image/1750219543208-image 1.webp',
          url: 'https://pub-ccf3ac7f79c147e492ae517bbec2ffbb.r2.dev/image/1750219543208-image 1.webp',
          size: 94230,
          type: 'image/webp',
          name: 'image 1.webp',
        },
      ],
    },
    rideShareInfo: {
      rideSharePlatforms: ['Uber'],
      weeklyDrivingSchedule: 'Eos lorem ipsam sed',
    },
    documents: {
      driversLicense: [
        {
          key: 'image/1749896844622-low-poly-grid-haikei.webp',
          url: 'https://pub-ccf3ac7f79c147e492ae517bbec2ffbb.r2.dev/image/1749896844622-low-poly-grid-haikei.webp',
          size: 20462,
          type: 'image/webp',
          name: 'low-poly-grid-haikei.webp',
        },
      ],
      driverProfile: [
        {
          key: 'image/1749896855375-colorkit.webp',
          url: 'https://pub-ccf3ac7f79c147e492ae517bbec2ffbb.r2.dev/image/1749896855375-colorkit.webp',
          size: 13686,
          type: 'image/webp',
          name: 'colorkit.webp',
        },
      ],
      tripHistory: [
        {
          key: 'image/1749896866823-Desktop - 33.webp',
          url: 'https://pub-ccf3ac7f79c147e492ae517bbec2ffbb.r2.dev/image/1749896866823-Desktop - 33.webp',
          size: 67274,
          type: 'image/webp',
          name: 'Desktop - 33.webp',
        },
      ],
    },
    additionalFiles: [
      {
        key: 'document/1750219555002-SHAKIB ANWAR NIBIR.pdf',
        url: 'https://pub-ccf3ac7f79c147e492ae517bbec2ffbb.r2.dev/document/1750219555002-SHAKIB ANWAR NIBIR.pdf',
        size: 630405,
        type: 'application/pdf',
        name: 'SHAKIB ANWAR NIBIR.pdf',
      },
    ],
  };

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
    <Box mx={'auto'} maw={896} p={24} className="space-y-6">
      <Card className="border-t-primary border-t-4">
        <Card.Section>
          <Title
            mt={16}
            fw={700}
            fz={24}
            c={'var(--color-primary-5)'}
            className="text-center"
          >
            Driver Application Summary
          </Title>
        </Card.Section>
        <Card.Section className="space-y-6">
          {/* Personal Information */}
          <Box>
            <Text
              component="h3"
              className="mb-3 flex items-center gap-2 text-lg font-semibold"
              style={{ color: '#CB6AA7' }}
            >
              <User className="h-5 w-5" style={{ color: '#CB6AA7' }} />
              Personal Information
            </Text>
            <SimpleGrid mt={20} spacing={16} cols={{ base: 1, md: 2 }}>
              <Flex align={'center'} gap={8}>
                <User className="text-muted-foreground h-4 w-4" />
                <span className="font-medium">Name:</span>
                <span>{applicationData.personalInfo.fullName}</span>
              </Flex>
              <Flex align={'center'} gap={8}>
                <Mail className="text-muted-foreground h-4 w-4" />
                <span className="font-medium">Email:</span>
                <span>{applicationData.personalInfo.email}</span>
              </Flex>
              <Flex align={'center'} gap={8}>
                <Phone className="text-muted-foreground h-4 w-4" />
                <span className="font-medium">Phone:</span>
                <span>{applicationData.personalInfo.phone}</span>
              </Flex>
              <Flex align={'center'} gap={8}>
                <MapPin className="text-muted-foreground h-4 w-4" />
                <span className="font-medium">City/Province:</span>
                <span>{applicationData.personalInfo.cityProvince}</span>
              </Flex>
              <Flex align={'center'} gap={8} className="md:col-span-2">
                <MapPin className="text-muted-foreground h-4 w-4" />
                <span className="font-medium">Address:</span>
                <span>{applicationData.personalInfo.shippingAddress}</span>
              </Flex>
            </SimpleGrid>
          </Box>

          <Divider c={'#CB6AA7'} />

          {/* Vehicle Information */}
          <Box>
            <Flex
              align={'center'}
              gap={8}
              mb={12}
              className="text-lg font-semibold"
              style={{ color: '#CB6AA7' }}
            >
              <Car className="h-5 w-5" style={{ color: '#CB6AA7' }} />
              Vehicle Information
            </Flex>
            <SimpleGrid mb={16} cols={{ base: 1, md: 3 }} spacing={16}>
              <Box>
                <Text component="span" fw={500}>
                  Make:
                </Text>
                <Text component="p">
                  {applicationData.vehicleInfo.vehicleMake}
                </Text>
              </Box>
              <Box>
                <Text fw={500} component="span">
                  Model:
                </Text>
                <Text>{applicationData.vehicleInfo.vehicleModel}</Text>
              </Box>
              <Box>
                <Text component="span" fw={500} className="font-medium">
                  Year:
                </Text>
                <Text>{applicationData.vehicleInfo.vehicleYear}</Text>
              </Box>
            </SimpleGrid>

            {/* Vehicle Photos */}
            <Box>
              <Text component="h4" mb={8} fw={500}>
                Vehicle Photos
              </Text>
              <SimpleGrid spacing={16} cols={{ base: 1, md: 2 }}>
                {applicationData.vehicleInfo.vehiclePhotos.map(
                  (photo, index) => (
                    <Box
                      key={photo.key}
                      className="rounded-lg border border-[#CB6AA7]/30 p-2"
                    >
                      <Image
                        src={photo.url || '/placeholder.svg'}
                        alt={`Vehicle photo ${index + 1}`}
                        width={300}
                        height={200}
                        className="h-48 w-full rounded object-cover"
                      />
                      <Box className="text-muted-foreground mt-2 text-sm">
                        <Text component="p">{photo.name}</Text>
                        <Text component="p">{formatFileSize(photo.size)}</Text>
                      </Box>
                    </Box>
                  )
                )}
              </SimpleGrid>
            </Box>
          </Box>

          <Divider c={'#CB6AA7'} />

          {/* Ride Share Information */}
          <Box>
            <Flex
              align={'center'}
              gap={8}
              mb={12}
              fz={18}
              fw={600}
              c={'#CB6AA7'}
            >
              <Calendar className="h-5 w-5" style={{ color: '#CB6AA7' }} />
              Ride Share Information
            </Flex>
            <Box className="space-y-3">
              <Box>
                <Text component="span" fw={500}>
                  Platforms:
                </Text>
                <Group mt={4} gap={8}>
                  {applicationData.rideShareInfo.rideSharePlatforms.map(
                    (platform) => (
                      <Badge key={platform}>{platform}</Badge>
                    )
                  )}
                </Group>
              </Box>
              <Box>
                <Text component="span" fw={500}>
                  Weekly Driving Schedule:
                </Text>
                <Text mt={4}>
                  {applicationData.rideShareInfo.weeklyDrivingSchedule}
                </Text>
              </Box>
            </Box>
          </Box>

          <Divider c={'#CB6AA7'} />

          {/* Documents */}
          <Box>
            <Flex
              align={'center'}
              gap={8}
              mb={12}
              className="text-lg font-semibold"
              style={{ color: '#CB6AA7' }}
            >
              <FileText className="h-5 w-5" style={{ color: '#CB6AA7' }} />
              Documents
            </Flex>
            <Box className="space-y-4">
              {/* Driver's License */}
              <div>
                <Text
                  component="h4"
                  mb={8}
                  fw={500}
                  className="mb-2 font-medium"
                >
                  Driver&apos;s License
                </Text>
                <SimpleGrid spacing={16} cols={{ base: 1, md: 2 }}>
                  {applicationData.documents.driversLicense.map((doc) => (
                    <Box
                      key={doc.key}
                      className="rounded-lg border border-[#CB6AA7]/30 p-2"
                    >
                      <Image
                        src={doc.url || '/placeholder.svg'}
                        alt="Driver's License"
                        width={200}
                        height={150}
                        className="h-32 w-full rounded object-cover"
                      />
                      <Box className="mt-2 text-sm">
                        <p>{doc.name}</p>
                        <p className="text-muted-foreground">
                          {formatFileSize(doc.size)}
                        </p>
                      </Box>
                    </Box>
                  ))}
                </SimpleGrid>
              </div>

              {/* Driver Profile */}
              <div>
                <h4 className="mb-2 font-medium">Driver Profile Photo</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {applicationData.documents.driverProfile.map((doc) => (
                    <div
                      key={doc.key}
                      className="rounded-lg border border-[#CB6AA7]/30 p-2"
                    >
                      <Image
                        src={doc.url || '/placeholder.svg'}
                        alt="Driver Profile"
                        width={200}
                        height={150}
                        className="h-32 w-full rounded object-cover"
                      />
                      <div className="mt-2 text-sm">
                        <p>{doc.name}</p>
                        <p className="text-muted-foreground">
                          {formatFileSize(doc.size)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trip History */}
              <div>
                <h4 className="mb-2 font-medium">Trip History</h4>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {applicationData.documents.tripHistory.map((doc) => (
                    <div
                      key={doc.key}
                      className="rounded-lg border border-[#CB6AA7]/30 p-2"
                    >
                      <Image
                        src={doc.url || '/placeholder.svg'}
                        alt="Trip History"
                        width={200}
                        height={150}
                        className="h-32 w-full rounded object-cover"
                      />
                      <div className="mt-2 text-sm">
                        <p>{doc.name}</p>
                        <p className="text-muted-foreground">
                          {formatFileSize(doc.size)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Box>
          </Box>

          <Divider c={'#CB6AA7'} />

          {/* Additional Files */}
          <Box>
            <Flex
              align={'center'}
              gap={8}
              mb={12}
              className="text-lg font-semibold"
              style={{ color: '#CB6AA7' }}
            >
              <FileText className="h-5 w-5" style={{ color: '#CB6AA7' }} />
              Additional Files
            </Flex>
            <div className="space-y-2">
              {applicationData.additionalFiles.map((file) => (
                <Flex
                  p={12}
                  align={'center'}
                  justify={'space-between'}
                  bd={'1px solid #CB6AA7'}
                  key={file.key}
                  className="rounded-lg"
                >
                  <Flex align={'center'} gap={12}>
                    <FileText className="text-muted-foreground h-8 w-8" />
                    <Group>
                      <p className="font-medium">{file.name}</p>
                      <p className="text-muted-foreground text-sm">
                        {file.type} • {formatFileSize(file.size)}
                      </p>
                    </Group>
                  </Flex>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownload(file.url, file.name)}
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </Flex>
              ))}
            </div>
          </Box>
        </Card.Section>
      </Card>
    </Box>
  );
}
