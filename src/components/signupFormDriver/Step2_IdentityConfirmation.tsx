/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';
import { useFormSubmission } from '@/contexts/FormSubmissionContext';
import {
  Box,
  Button,
  Group,
  Image,
  Input,
  Loader,
  SimpleGrid,
  Space,
  Stack,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { fileHandlerResSchema } from './Step1_DriverInformation';
import { FileHandlerRes, ImageHandler } from '../FileManager';
import { Icon } from '@iconify/react/dist/iconify.js';
import { deleteFile } from '../FileManager/actions/fileActions';
import { useLanguage } from '@/providers/languageToggleContext';
import { steppingForm } from '@/contents/drive/steppingForm';

// Zod validation schema
export const schema = (lang: 'en' | 'fr') => {
  const errors = steppingForm.step2FormLabel.driverFormErrors[lang];

  return z.object({
    driversLicense: z
      .array(fileHandlerResSchema)
      .min(1, errors.driversLicense.min)
      .max(1, errors.driversLicense.max),
    driverProfile: z
      .array(fileHandlerResSchema)
      .min(1, errors.driverProfile.min)
      .max(1, errors.driverProfile.max),
    tripHistory: z
      .array(fileHandlerResSchema)
      .min(1, errors.tripHistory.min)
      .max(1, errors.tripHistory.max),
  });
};

interface Step2IdentityConfirmationFormValues {
  driversLicense: FileHandlerRes[] | null;
  driverProfile: FileHandlerRes[] | null;
  tripHistory: FileHandlerRes[] | null;
}

interface Step2IdentityConfirmationProps {
  onNext: () => void;
  onPrev: () => void;
  step2FormLabel: any;
}

const Step2_IdentityConfirmation = ({
  onNext,
  onPrev,
  step2FormLabel,
}: Step2IdentityConfirmationProps) => {
  const { language } = useLanguage();
  // Separate loading states for each section
  const [loadingDriversLicense, setLoadingDriversLicense] =
    useState<boolean>(false);
  const [loadingDriverProfile, setLoadingDriverProfile] =
    useState<boolean>(false);
  const [loadingTripHistory, setLoadingTripHistory] = useState<boolean>(false);

  const [changeDriverProfilePhotos, setChangeDriverProfilePhotos] =
    useState<boolean>(false);
  const [changeDriverLicensePhotos, setChangeDriverLicensePhotos] =
    useState<boolean>(false);
  const [changeTripHistoryPhotos, setChangeTripHistoryPhotos] =
    useState<boolean>(false);
  const { setIsIdentityConfirmationSubmitted } = useFormSubmission();

  // Load initial values from localStorage
  const getInitialValues = (): Step2IdentityConfirmationFormValues => {
    if (typeof window !== 'undefined') {
      const savedValues = localStorage.getItem('step2FormValues');
      if (savedValues) {
        try {
          return JSON.parse(savedValues);
        } catch (e) {
          console.error('Error parsing step2FormValues from localStorage:', e);
        }
      }
    }
    return {
      driversLicense: [],
      driverProfile: [],
      tripHistory: [],
    };
  };

  const form = useForm<Step2IdentityConfirmationFormValues>({
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

  const handleSubmit = (values: Step2IdentityConfirmationFormValues) => {
    // Save values to localStorage
    if (typeof window !== 'undefined') {
      const valuesToSave = {
        ...values,
      };
      localStorage.setItem('step2FormValues', JSON.stringify(valuesToSave));
    }

    setIsIdentityConfirmationSubmitted(true);
    notifications.show({
      title: 'Form Submitted',
      message: 'Identity Confirmation submitted successfully!',
      color: 'green',
      autoClose: 3000,
    });
    onNext();
  };

  const handleBulkDelete = async (
    key: keyof Step2IdentityConfirmationFormValues
  ) => {
    // Set the appropriate loading state
    const setLoadingForKey = (loading: boolean) => {
      switch (key) {
        case 'driversLicense':
          setLoadingDriversLicense(loading);
          break;
        case 'driverProfile':
          setLoadingDriverProfile(loading);
          break;
        case 'tripHistory':
          setLoadingTripHistory(loading);
          break;
      }
    };

    setLoadingForKey(true);
    const dataArray = form.values[key] ?? [];

    try {
      const results = await Promise.all(
        dataArray.map((file) =>
          deleteFile(file.key).then((res) => ({ key: file.key, ...res }))
        )
      );

      console.log('Bulk delete results:', results);

      // Check if all deletions were successful
      if (results.every((result) => result.success)) {
        notifications.show({
          title: 'Success',
          message: 'File deleted successfully!',
          color: 'green',
          autoClose: 3000,
        });

        // IMPORTANT: Clear the form field FIRST, then set change state
        form.setFieldValue(key, []);

        // ✅ Update localStorage
        if (typeof window !== 'undefined') {
          const stored = localStorage.getItem('step2FormValues');
          if (stored) {
            const parsed = JSON.parse(stored);
            parsed[key] = [];
            localStorage.setItem('step2FormValues', JSON.stringify(parsed));
          }
        }

        // Force form to re-render with empty array
        setTimeout(() => {
          switch (key) {
            case 'driversLicense':
              setChangeDriverLicensePhotos(true);
              break;
            case 'driverProfile':
              setChangeDriverProfilePhotos(true);
              break;
            case 'tripHistory':
              setChangeTripHistoryPhotos(true);
              break;
          }
        }, 100);
      } else {
        notifications.show({
          title: 'Error',
          message: 'Failed to delete file. Please try again.',
          color: 'red',
          autoClose: 5000,
        });
      }
    } catch (error) {
      console.error('Delete error:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to delete file. Please try again.',
        color: 'red',
        autoClose: 5000,
      });
    } finally {
      setLoadingForKey(false);
    }
  };

  // Helper function to render image section
  const renderImageSection = (
    fieldName: keyof Step2IdentityConfirmationFormValues,
    label: string,
    changeState: boolean,
    loadingState: boolean
  ) => {
    // CRITICAL: Get current form values, not initial values
    const currentFiles = form.getValues()[fieldName] ?? [];

    return (
      <Input.Wrapper
        label={label}
        withAsterisk
        error={form.errors[fieldName]}
        className="font-inter text-xs font-normal text-[#5E6366]"
      >
        <Space h={4} />
        {currentFiles.length > 0 && !changeState ? (
          <SimpleGrid pos={'relative'} cols={1} spacing="md" mb="md">
            {/* Loading overlay */}
            {loadingState && (
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
                  borderRadius: '8px',
                }}
              >
                <Loader size="lg" />
              </Box>
            )}

            {currentFiles.map((file) => (
              <Box h={150} key={`${fieldName}-${file.key}`}>
                <Image
                  w={'100%'}
                  h={'100%'}
                  src={file.url}
                  alt={`${fieldName} ${file.name}`}
                  radius={'md'}
                  fallbackSrc="https://via.placeholder.com/150"
                  style={{ opacity: loadingState ? 0.5 : 1 }}
                />
              </Box>
            ))}

            <Box pos={'absolute'} top={0} right={0}>
              <Button
                variant="subtle"
                size="md"
                radius="md"
                disabled={loadingState}
                onClick={() => handleBulkDelete(fieldName)}
              >
                {loadingState ? (
                  <Loader size="xs" />
                ) : (
                  <Icon icon={'mingcute:edit-line'} width={20} />
                )}
              </Button>
            </Box>
          </SimpleGrid>
        ) : (
          <ImageHandler
            key={`${fieldName}-handler-${changeState}`} // Force re-render when changeState changes
            onUploadSuccess={(files: FileHandlerRes[]) => {
              console.log(`Uploading new ${fieldName} files:`, files);

              // Set the new files immediately
              form.setFieldValue(fieldName, files);

              // Reset change state to show images instead of handler
              switch (fieldName) {
                case 'driversLicense':
                  setChangeDriverLicensePhotos(false);
                  break;
                case 'driverProfile':
                  setChangeDriverProfilePhotos(false);
                  break;
                case 'tripHistory':
                  setChangeTripHistoryPhotos(false);
                  break;
              }

              // Force form to acknowledge the new values
              form.validateField(fieldName);

              console.log(
                `Updated ${fieldName} form values:`,
                form.getValues()[fieldName]
              );

              notifications.show({
                title: 'Success',
                message: 'New file uploaded successfully!',
                color: 'green',
                autoClose: 3000,
              });
            }}
          />
        )}
      </Input.Wrapper>
    );
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        {renderImageSection(
          'driversLicense',
          step2FormLabel.driversLicense[language],
          changeDriverLicensePhotos,
          loadingDriversLicense
        )}

        {renderImageSection(
          'driverProfile',
          step2FormLabel.driverProfile[language],
          changeDriverProfilePhotos,
          loadingDriverProfile
        )}

        {renderImageSection(
          'tripHistory',
          step2FormLabel.tripHistory[language],
          changeTripHistoryPhotos,
          loadingTripHistory
        )}

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
            Back
          </Button>
          <Button
            type="submit"
            size="md"
            radius={12}
            className="!font-inter !w-full !px-16 !text-sm !font-normal !text-white md:!w-auto"
            disabled={
              loadingDriversLicense ||
              loadingDriverProfile ||
              loadingTripHistory
            }
          >
            Continue
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default Step2_IdentityConfirmation;
