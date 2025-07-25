'use client';
import { useFormSubmission } from '@/contexts/FormSubmissionContext';
import {
  Box,
  Button,
  Group,
  Input,
  MultiSelect,
  SimpleGrid,
  Space,
  Stack,
  TextInput,
  Title,
  Divider,
  ScrollArea,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import {
  FileHandlerRes,
  MultiFileImageHandler,
  ImageHandler,
} from '../FileManager';
import { useLanguage } from '@/providers/languageToggleContext';
import { steppingForm } from '@/contents/drive/steppingForm';
import {
  DriverApplication,
  getDriverApplicationFromLocalStorage,
  sendDriverApplicationEmail,
} from '@/app/(main)/drive/action/driverApplication';
import { CheckCircle } from 'lucide-react';

// Type definitions
type Language = 'en' | 'fr';

// Validation messages
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
    fr: "L'horaire de conduite hebdomadaire est requis",
  },
  driversLicense: {
    min: {
      en: "Driver's license is required",
      fr: 'Le permis de conduire est requis',
    },
    max: {
      en: "Only one driver's license image is allowed",
      fr: 'Une seule image de permis de conduire est autorisée',
    },
  },
  driverProfile: {
    min: {
      en: 'Driver profile is required',
      fr: 'Le profil du chauffeur est requis',
    },
    max: {
      en: 'Only one driver profile image is allowed',
      fr: 'Une seule image de profil du chauffeur est autorisée',
    },
  },
  tripHistory: {
    min: {
      en: 'Trip history is required',
      fr: "L'historique des trajets est requis",
    },
    max: {
      en: 'Only one trip history image is allowed',
      fr: "Une seule image d'historique des trajets est autorisée",
    },
  },
};

// File handler schema
export const fileHandlerResSchema = z
  .object({
    key: z.string(),
    url: z.string().url(),
    size: z.number(),
    type: z.string(),
    name: z.string(),
  })
  .catchall(z.unknown());

// Combined validation schema
const schema = (lang: Language) => {
  return z.object({
    // Step 1 fields
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
    // Step 2 fields
    driversLicense: z
      .array(fileHandlerResSchema)
      .min(1, validationMessages.driversLicense.min[lang])
      .max(1, validationMessages.driversLicense.max[lang]),
    driverProfile: z
      .array(fileHandlerResSchema)
      .min(1, validationMessages.driverProfile.min[lang])
      .max(1, validationMessages.driverProfile.max[lang]),
    tripHistory: z
      .array(fileHandlerResSchema)
      .min(1, validationMessages.tripHistory.min[lang])
      .max(1, validationMessages.tripHistory.max[lang]),
  });
};

// Form values interface
interface SingleSignupFormValues {
  // Step 1 fields
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
  // Step 2 fields
  driversLicense: FileHandlerRes[];
  driverProfile: FileHandlerRes[];
  tripHistory: FileHandlerRes[];
}

const SingleSignupForm = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { setIsDriverInfoSubmitted, setIsIdentityConfirmationSubmitted } =
    useFormSubmission();

  // Get initial values from localStorage
  const getInitialValues = (): SingleSignupFormValues => {
    if (typeof window !== 'undefined') {
      const step1Values = localStorage.getItem('step1FormValues');
      const step2Values = localStorage.getItem('step2FormValues');

      let parsedStep1 = {};
      let parsedStep2 = {};

      try {
        if (step1Values) parsedStep1 = JSON.parse(step1Values);
        if (step2Values) parsedStep2 = JSON.parse(step2Values);
      } catch (e) {
        console.error('Error parsing form values from localStorage:', e);
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
        driversLicense: [],
        driverProfile: [],
        tripHistory: [],
        ...parsedStep1,
        ...parsedStep2,
      };
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
      driversLicense: [],
      driverProfile: [],
      tripHistory: [],
    };
  };

  const form = useForm<SingleSignupFormValues>({
    mode: 'uncontrolled',
    initialValues: getInitialValues(),
    validate: zodResolver(schema(language)),
  });

  // Get validation errors count
  const getErrorCount = () => {
    return Object.keys(form.errors).length;
  };

  // Load saved values on mount
  useEffect(() => {
    const savedValues = getInitialValues();
    form.setValues(savedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Manual validation trigger
  const triggerValidation = () => {
    form.validate();
  };

  // Handle form submission
  const handleSubmit = async (values: SingleSignupFormValues) => {
    setLoading(true);

    try {
      // Save to localStorage
      if (typeof window !== 'undefined') {
        const step1Values = {
          fullName: values.fullName,
          email: values.email,
          phone: values.phone,
          cityProvince: values.cityProvince,
          vehicleMake: values.vehicleMake,
          vehicleModel: values.vehicleModel,
          vehicleYear: values.vehicleYear,
          vehiclePhotos: values.vehiclePhotos,
          rideSharePlatforms: values.rideSharePlatforms,
          weeklyDrivingSchedule: values.weeklyDrivingSchedule,
        };

        const step2Values = {
          driversLicense: values.driversLicense,
          driverProfile: values.driverProfile,
          tripHistory: values.tripHistory,
        };

        localStorage.setItem('step1FormValues', JSON.stringify(step1Values));
        localStorage.setItem('step2FormValues', JSON.stringify(step2Values));
      }

      // Set submission states
      setIsDriverInfoSubmitted(true);
      setIsIdentityConfirmationSubmitted(true);

      // Send email
      const driverApplication: DriverApplication | null =
        getDriverApplicationFromLocalStorage();

      if (!driverApplication) {
        notifications.show({
          title: 'Missing Data',
          message:
            'Driver application data not found. Please fill all the forms',
          color: 'red',
        });
        return;
      }

      const { success, message } =
        await sendDriverApplicationEmail(driverApplication);

      if (success) {
        notifications.show({
          title: language === 'fr' ? 'Formulaire soumis' : 'Form Submitted',
          message:
            language === 'fr'
              ? 'Candidature de chauffeur soumise avec succès!'
              : 'Driver application submitted successfully!',
          color: 'green',
        });
        setIsSubmitted(true);
      } else {
        notifications.show({
          title: 'Error',
          message: message || 'Failed to submit application',
          color: 'red',
        });
      }
    } catch (error) {
      console.error('Submission error:', error);
      notifications.show({
        title: 'Error',
        message: 'An error occurred while submitting the form',
        color: 'red',
      });
    } finally {
      setLoading(false);
    }
  };

  // Platform options
  const platformOptions = [
    { value: 'Uber', label: 'Uber' },
    { value: 'Lyft', label: 'Lyft' },
    { value: 'UberEats', label: 'UberEats' },
  ];

  // Show success message if submitted
  if (isSubmitted) {
    return (
      <Stack align="center" gap="md" p="xl">
        <CheckCircle className="text-primary-400 flex-shrink-0 rounded-md text-6xl" />
        <Title order={2} className="font-inter text-center">
          {language === 'fr'
            ? 'Merci de vous inscrire comme chauffeur!!'
            : 'Thank you for signing up as a Driver!!'}
        </Title>
      </Stack>
    );
  }

  return (
    <Box pr={8}>
      <ScrollArea h={740} scrollbars="y">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="xl">
            {/* Main Form Title */}
            <Title
              order={2}
              mb="xl"
              className="font-inter sticky top-0 z-10 bg-white py-4 text-center"
            >
              {language === 'fr'
                ? 'Inscription Chauffeur'
                : 'Driver Registration'}
            </Title>

            {/* Driver Information Section */}
            <Box>
              <SimpleGrid cols={{ base: 1, md: 2 }} spacing="md">
                <TextInput
                  label={steppingForm.step1Form1Labels.fullName[language]}
                  placeholder={steppingForm.step1Form1Labels.fullName[language]}
                  key={form.key('fullName')}
                  {...form.getInputProps('fullName')}
                  required
                />

                <TextInput
                  label={steppingForm.step1Form1Labels.email[language]}
                  placeholder={steppingForm.step1Form1Labels.email[language]}
                  type="email"
                  key={form.key('email')}
                  {...form.getInputProps('email')}
                  required
                />

                <TextInput
                  label={steppingForm.step1Form1Labels.phone[language]}
                  placeholder={steppingForm.step1Form1Labels.phone[language]}
                  key={form.key('phone')}
                  {...form.getInputProps('phone')}
                  required
                />

                <TextInput
                  label={steppingForm.step1Form1Labels.cityProvince[language]}
                  placeholder={
                    steppingForm.step1Form1Labels.cityProvince[language]
                  }
                  key={form.key('cityProvince')}
                  {...form.getInputProps('cityProvince')}
                  required
                />

                <TextInput
                  label={steppingForm.step1Form1Labels.vehicleMake[language]}
                  placeholder={
                    steppingForm.step1Form1Labels.vehicleMake[language]
                  }
                  key={form.key('vehicleMake')}
                  {...form.getInputProps('vehicleMake')}
                  required
                />

                <TextInput
                  label={steppingForm.step1Form1Labels.vehicleModel[language]}
                  placeholder={
                    steppingForm.step1Form1Labels.vehicleModel[language]
                  }
                  key={form.key('vehicleModel')}
                  {...form.getInputProps('vehicleModel')}
                  required
                />

                <TextInput
                  label={steppingForm.step1Form1Labels.vehicleYear[language]}
                  placeholder="2020"
                  key={form.key('vehicleYear')}
                  {...form.getInputProps('vehicleYear')}
                  required
                />
              </SimpleGrid>

              <Space h="md" />

              <MultiSelect
                label={
                  steppingForm.step1Form1Labels.rideSharePlatforms[language]
                }
                placeholder={
                  steppingForm.step1Form1Labels.rideSharePlatforms[language]
                }
                data={platformOptions}
                key={form.key('rideSharePlatforms')}
                {...form.getInputProps('rideSharePlatforms')}
                required
              />

              <Space h="md" />

              <TextInput
                label={
                  steppingForm.step1Form1Labels.weeklyDrivingSchedule[language]
                }
                placeholder={
                  steppingForm.step1Form1Labels
                    .weeklyDrivingSchedulePlaceholder[language]
                }
                key={form.key('weeklyDrivingSchedule')}
                {...form.getInputProps('weeklyDrivingSchedule')}
                required
              />

              <Space h="md" />

              {/* Vehicle Photos */}
              <Input.Wrapper
                label={steppingForm.step1Form1Labels.vehiclePhotos[language]}
                description={
                  steppingForm.step1Form1Labels.vehiclePhotosDescription[
                    language
                  ]
                }
                error={form.errors.vehiclePhotos}
                required
              >
                <Box
                  className={`rounded-md border-2 p-4 ${
                    form.errors.vehiclePhotos
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200'
                  }`}
                >
                  <MultiFileImageHandler
                    onUploadSuccess={(files: FileHandlerRes[]) =>
                      form.setFieldValue('vehiclePhotos', files)
                    }
                    maxFiles={2}
                  />
                </Box>
              </Input.Wrapper>
            </Box>

            <Divider size="md" />

            {/* Identity Confirmation Section */}
            <Box>
              {/* Driver's License */}
              <Input.Wrapper
                label={steppingForm.step2FormLabel.driversLicense[language]}
                error={form.errors.driversLicense}
                required
                mb="md"
              >
                <Box
                  className={`rounded-md border-2 p-4 ${
                    form.errors.driversLicense
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200'
                  }`}
                >
                  <ImageHandler
                    onUploadSuccess={(files: FileHandlerRes[]) =>
                      form.setFieldValue('driversLicense', files)
                    }
                  />
                </Box>
              </Input.Wrapper>

              {/* Driver Profile */}
              <Input.Wrapper
                label={steppingForm.step2FormLabel.driverProfile[language]}
                error={form.errors.driverProfile}
                required
                mb="md"
              >
                <Box
                  className={`rounded-md border-2 p-4 ${
                    form.errors.driverProfile
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200'
                  }`}
                >
                  <ImageHandler
                    onUploadSuccess={(files: FileHandlerRes[]) =>
                      form.setFieldValue('driverProfile', files)
                    }
                  />
                </Box>
              </Input.Wrapper>

              {/* Trip History */}
              <Input.Wrapper
                label={steppingForm.step2FormLabel.tripHistory[language]}
                error={form.errors.tripHistory}
                required
                mb="md"
              >
                <Box
                  className={`rounded-md border-2 p-4 ${
                    form.errors.tripHistory
                      ? 'border-red-300 bg-red-50'
                      : 'border-gray-200'
                  }`}
                >
                  <ImageHandler
                    onUploadSuccess={(files: FileHandlerRes[]) =>
                      form.setFieldValue('tripHistory', files)
                    }
                  />
                </Box>
              </Input.Wrapper>
            </Box>

            {/* Submit Button */}
            <Group justify="center" mt="xl">
              <Stack align="center" gap="sm">
                <Button
                  type={getErrorCount() > 0 ? 'button' : 'submit'}
                  size="lg"
                  radius={12}
                  loading={loading}
                  onClick={getErrorCount() > 0 ? triggerValidation : undefined}
                  className={`!font-inter !px-16 !text-sm !font-normal ${
                    getErrorCount() > 0
                      ? '!bg-red-500 !text-white hover:!bg-red-600'
                      : '!bg-[var(--mantine-primary-color-5)] !text-white'
                  }`}
                >
                  {language === 'fr' ? 'Soumettre' : 'Submit'}
                </Button>
              </Stack>
            </Group>
          </Stack>
        </form>
      </ScrollArea>
    </Box>
  );
};

export default SingleSignupForm;
