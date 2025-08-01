/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useFormSubmission } from '@/contexts/FormSubmissionContext';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Input,
  Loader,
  Menu,
  MultiSelect,
  Paper,
  SimpleGrid,
  Space,
  Stack,
  TextInput,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { FileHandlerRes, MultiFileImageHandler } from '../FileManager';
import { Icon } from '@iconify/react/dist/iconify.js';
import { deleteFile } from '../FileManager/actions/fileActions';
import { useLanguage } from '@/providers/languageToggleContext';

// Zod validation schema

type Language = 'en' | 'fr';

const validationMessages = {
  fullName: {
    en: 'Full name is required',
    fr: 'Le nom complet est requis',
  },
  email: {
    en: 'Invalid email address',
    fr: 'Adresse e-mail invalide',
  },
  phone: {
    en: 'Phone number is required',
    fr: 'Le numéro de téléphone est requis',
  },
  cityProvince: {
    en: 'City is required',
    fr: 'La ville est requise',
  },
  shippingAddress: {
    en: 'Shipping address is required',
    fr: "L'adresse de livraison est requise",
  },
  vehicleMake: {
    en: 'Vehicle make is required',
    fr: 'La marque du véhicule est requise',
  },
  vehicleModel: {
    en: 'Vehicle model is required',
    fr: 'Le modèle du véhicule est requis',
  },
  vehicleYear: {
    en: 'Vehicle year must be a 4-digit number',
    fr: "L'année du véhicule doit comporter 4 chiffres",
  },
  vehiclePhotos: {
    min: {
      en: 'Please upload both front, side and back vehicle photos',
      fr: 'Veuillez télécharger les photos avant, latérale et arrière du véhicule',
    },
    max: {
      en: 'Only front, side and back vehicle photos are allowed',
      fr: 'Seules les photos avant, latérale et arrière du véhicule sont autorisées',
    },
  },
  rideSharePlatforms: {
    en: 'At least one ride-share platform is required',
    fr: 'Au moins une plateforme de covoiturage est requise',
  },
  weeklyDrivingSchedule: {
    en: 'Weekly driving schedule is required',
    fr: 'L’horaire de conduite hebdomadaire est requis',
  },
};

export const fileHandlerResSchema = z
  .object({
    key: z.string(),
    url: z.string().url(),
    size: z.number(),
    type: z.string(),
    name: z.string(),
  })
  .catchall(z.unknown()); // allows additional properties of unknown type

const schema = (lang: Language) => {
  return z.object({
    fullName: z.string().min(1, validationMessages.fullName[lang]),
    email: z.string().email(validationMessages.email[lang]),
    phone: z.string().min(1, validationMessages.phone[lang]),
    cityProvince: z.string().min(1, validationMessages.cityProvince[lang]),
    vehicleMake: z.string().min(1, validationMessages.vehicleMake[lang]),
    vehicleModel: z.string().min(1, validationMessages.vehicleModel[lang]),
    vehicleYear: z
      .string()
      .regex(/^\d{4}$/, validationMessages.vehicleYear[lang]),
    vehiclePhotos: z
      .array(fileHandlerResSchema)
      .min(2, validationMessages.vehiclePhotos.min[lang])
      .max(4, validationMessages.vehiclePhotos.max[lang]),
    rideSharePlatforms: z
      .array(z.string())
      .min(1, validationMessages.rideSharePlatforms[lang]),
    weeklyDrivingSchedule: z
      .string()
      .min(1, validationMessages.weeklyDrivingSchedule[lang]),
  });
};

interface Step1DriverInformationFormValues {
  fullName: string;
  email: string;
  phone: string;
  cityProvince: string;
  vehicleMake: string;
  vehicleModel: string;
  vehicleYear: string;
  vehiclePhotos: FileHandlerRes[];
  rideSharePlatforms: string[];
  weeklyDrivingSchedule: string;
}

interface Step1DriverInformationProps {
  onNext: () => void;
  onPrev: () => void;
  step1FormLabel: any;
}

const Step1_DriverInformation = ({
  onNext,
  onPrev,
  step1FormLabel,
}: Step1DriverInformationProps) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);

  console.log(step1FormLabel);

  const [changeVehiclePhotos, setChangeVehiclePhotos] = useState(false);
  const { setIsDriverInfoSubmitted } = useFormSubmission();

  // Load initial values from localStorage
  const getInitialValues = (): Step1DriverInformationFormValues => {
    if (typeof window !== 'undefined') {
      const savedValues = localStorage.getItem('step1FormValues');
      if (savedValues) {
        try {
          const parsed = JSON.parse(savedValues);
          return {
            ...parsed,
          };
        } catch (e) {
          console.error('Error parsing step1FormValues from localStorage:', e);
        }
      }
    }
    return {
      fullName: '',
      email: '',
      phone: '',
      cityProvince: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehiclePhotos: [],
      rideSharePlatforms: [],
      weeklyDrivingSchedule: '',
    };
  };

  const form = useForm<Step1DriverInformationFormValues>({
    mode: 'uncontrolled',
    initialValues: getInitialValues(),
    validate: zodResolver(schema(language)),
  });

  // Update form values when localStorage changes (e.g., on mount)
  useEffect(() => {
    const savedValues = getInitialValues();
    form.setValues(savedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: Step1DriverInformationFormValues) => {
    // Save values to localStorage (excluding files)
    if (typeof window !== 'undefined') {
      const valuesToSave = {
        ...values,
        // vehiclePhotos: [], // Files can't be stored in localStorage
      };
      localStorage.setItem('step1FormValues', JSON.stringify(valuesToSave));
    }

    // Simulate form submission (e.g., API call)

    setIsDriverInfoSubmitted(true); // Mark form as submitted
    notifications.show({
      title: 'Form Submitted',
      message: 'Driver Information submitted successfully!',
      color: 'green',
      autoClose: 3000,
    });
    onNext();
  };

  const handleBulkDelete = async () => {
    setLoading(true);
    const vehiclePhotos = form.values.vehiclePhotos;

    try {
      const results = await Promise.all(
        vehiclePhotos.map((file) =>
          deleteFile(file.key).then((res) => ({ key: file.key, ...res }))
        )
      );

      // Check if all deletions were successful
      if (results.every((result) => result.success)) {
        notifications.show({
          title: 'Success',
          message: 'All vehicle photos deleted successfully!',
          color: 'green',
          autoClose: 3000,
        });

        // Clear the form field and show ImageHandler
        form.setFieldValue('vehiclePhotos', []);
        setChangeVehiclePhotos(true);

        // ✅ Update localStorage
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('step1FormValues');
          if (stored) {
            const parsed = JSON.parse(stored);
            parsed.vehiclePhotos = [];
            localStorage.setItem('step1FormValues', JSON.stringify(parsed));
          }
        }
      } else {
        // Some deletions failed
        const failedDeletions = results.filter((result) => !result.success);
        console.error('Failed deletions:', failedDeletions);

        notifications.show({
          title: 'Partial Failure',
          message: `${failedDeletions.length} file(s) could not be deleted. Please try again.`,
          color: 'yellow',
          autoClose: 5000,
        });

        // Only remove successfully deleted files from the form
        const successfullyDeleted = results
          .filter((result) => result.success)
          .map((result) => result.key);

        const remainingPhotos = vehiclePhotos.filter(
          (photo) => !successfullyDeleted.includes(photo.key)
        );

        form.setFieldValue('vehiclePhotos', remainingPhotos);

        // Only show ImageHandler if all photos were removed
        if (remainingPhotos.length === 0) {
          setChangeVehiclePhotos(true);
        }
      }
    } catch (error) {
      console.error('Bulk delete error:', error);

      notifications.show({
        title: 'Error',
        message: 'Failed to delete vehicle photos. Please try again.',
        color: 'red',
        autoClose: 5000,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = (files: FileHandlerRes[]) => {
    // Update form with uploaded files
    form.setFieldValue('vehiclePhotos', files);

    notifications.show({
      title: 'Files Uploaded',
      message: ` files uploaded successfully!`,
      color: 'green',
      autoClose: 3000,
    });
  };

  return (
    <form className="w-full" onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md" w={'100%'}>
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Input.Wrapper
            label={step1FormLabel.fullName[language]}
            withAsterisk
            className="font-inter text-xs font-normal text-[#5E6366]"
          >
            <Space h={4} />
            <TextInput
              variant="filled"
              radius="sm"
              size="md"
              placeholder={language === 'en' ? 'John Doe' : 'Gabriel, Louise'}
              {...form.getInputProps('fullName')}
            />
          </Input.Wrapper>

          <Input.Wrapper
            label={step1FormLabel.email[language]}
            withAsterisk
            className="font-inter text-xs font-normal text-[#5E6366]"
          >
            <Space h={4} />
            <TextInput
              type="email"
              variant="filled"
              radius="sm"
              size="md"
              placeholder={
                language === 'en' ? 'Wd3Y0@example.com' : 'gabriel@ex.com'
              }
              {...form.getInputProps('email')}
            />
          </Input.Wrapper>
        </SimpleGrid>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
          <Input.Wrapper
            label={step1FormLabel.phone[language]}
            withAsterisk
            className="font-inter text-xs font-normal text-[#5E6366]"
          >
            <Space h={4} />
            <TextInput
              variant="filled"
              radius="sm"
              size="md"
              placeholder="+1234567890"
              {...form.getInputProps('phone')}
            />
          </Input.Wrapper>

          <Input.Wrapper
            label={step1FormLabel.cityProvince[language]}
            withAsterisk
            className="font-inter text-xs font-normal text-[#5E6366]"
          >
            <Space h={4} />
            <TextInput
              variant="filled"
              radius="sm"
              size="md"
              placeholder="Toronto, ON"
              {...form.getInputProps('cityProvince')}
            />
          </Input.Wrapper>
        </SimpleGrid>
        <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="md">
          <Input.Wrapper
            label={step1FormLabel.vehicleMake[language]}
            withAsterisk
            className="font-inter text-xs font-normal text-[#5E6366]"
          >
            <Space h={4} />
            <TextInput
              variant="filled"
              radius="sm"
              size="md"
              placeholder="Toyota"
              {...form.getInputProps('vehicleMake')}
            />
          </Input.Wrapper>
          <Input.Wrapper
            label={step1FormLabel.vehicleModel[language]}
            withAsterisk
            className="font-inter text-xs font-normal text-[#5E6366]"
          >
            <Space h={4} />
            <TextInput
              variant="filled"
              radius="sm"
              size="md"
              placeholder="Camry"
              {...form.getInputProps('vehicleModel')}
            />
          </Input.Wrapper>

          <Input.Wrapper
            label={step1FormLabel.vehicleYear[language]}
            withAsterisk
            className="font-inter text-xs font-normal text-[#5E6366]"
          >
            <Space h={4} />
            <TextInput
              variant="filled"
              radius="sm"
              size="md"
              placeholder="2020"
              {...form.getInputProps('vehicleYear')}
            />
          </Input.Wrapper>
        </SimpleGrid>

        <Input.Wrapper
          error={form.errors.vehiclePhotos}
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          {form.values.vehiclePhotos &&
          form.values.vehiclePhotos.length > 0 &&
          changeVehiclePhotos === false ? (
            <SimpleGrid pos={'relative'} cols={3} spacing="md" mb="md">
              {loading && (
                <Box
                  pos={'absolute'}
                  top={0}
                  left={0}
                  right={0}
                  bottom={0}
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.8)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 10,
                  }}
                >
                  <Loader size="lg" />
                </Box>
              )}
              {form.values.vehiclePhotos.map((file) => (
                <Box h={150} key={file.key}>
                  <Image
                    w={'100%'}
                    h={'100%'}
                    src={file.url}
                    alt={`Vehicle Photo ${file.name}`}
                    radius={'md'}
                    fallbackSrc="https://via.placeholder.com/150"
                    style={{ opacity: loading ? 0.5 : 1 }}
                  />
                </Box>
              ))}
              <Box pos={'absolute'} top={0} right={0}>
                <Button
                  loading={loading}
                  variant="subtle"
                  size="md"
                  radius="md"
                  onClick={() => handleBulkDelete()}
                  disabled={loading}
                >
                  <Icon icon={'mingcute:edit-line'} width={20} />
                </Button>
              </Box>
            </SimpleGrid>
          ) : (
            <Box pos={'relative'}>
              <MultiFileImageHandler
                label={step1FormLabel.vehiclePhotos[language]}
                withAsterisk
                description={step1FormLabel.vehiclePhotos.description[language]}
                onUploadSuccess={handleFileUpload}
                maxFiles={2}
              />
              <Box pos={'absolute'} top={20} right={{ base: 8, md: 16 }}>
                <Menu width={300} position="bottom-start">
                  <Menu.Target>
                    <ActionIcon ml={3} variant="subtle" size="sm">
                      <Icon
                        icon="ix:question-filled"
                        className="text-primary"
                      />
                    </ActionIcon>
                  </Menu.Target>
                  <Menu.Dropdown className="scale-75">
                    <Paper
                      p="md"
                      radius="md"
                      withBorder
                      className={'!border-black'}
                    >
                      <Stack gap="md">
                        <Title fz={16} order={3} fw={400}>
                          {language === 'en'
                            ? 'Your vehicle needs to be in good condition'
                            : ' Votre véhicule doit être en bon état.'}
                        </Title>
                      </Stack>
                    </Paper>
                  </Menu.Dropdown>
                </Menu>
              </Box>
            </Box>
          )}
        </Input.Wrapper>

        <Input.Wrapper
          label={step1FormLabel.rideSharePlatforms[language]}
          withAsterisk
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          <Space h={4} />
          <MultiSelect
            data={['Uber', 'Lyft', 'UberEats', 'Other']}
            placeholder={language === 'en' ? 'Select' : 'Choisissez'}
            {...form.getInputProps('rideSharePlatforms')}
          />
        </Input.Wrapper>
        <Input.Wrapper
          label={step1FormLabel.weeklyDrivingSchedule[language]}
          withAsterisk
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          <Space h={4} />
          <TextInput
            variant="filled"
            radius="sm"
            size="md"
            placeholder="e.g., 50 hours, Mon-Fri 9AM-2PM"
            {...form.getInputProps('weeklyDrivingSchedule')}
          />
        </Input.Wrapper>

        <Group
          justify="center"
          mt="lg"
          className="!flex-col-reverse md:!flex-row"
        >
          <Button
            variant="outline"
            size="md"
            radius={12}
            className="!font-inter !w-full !border-2 !border-[#111111] !px-12 !text-sm !font-normal !text-black md:!w-auto"
            onClick={onPrev}
          >
            {language === 'fr' ? 'Annuler' : 'Cancel'}
          </Button>
          <Button
            type="submit"
            size="md"
            radius={12}
            className="!font-inter !w-full !px-16 !text-sm !font-normal !text-white md:!w-auto"
          >
            {language === 'fr' ? 'Continuer' : 'Continue'}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default Step1_DriverInformation;
