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

// Zod validation schema
const schema = z.object({
  driversLicense: z
    .array(fileHandlerResSchema)
    .min(1, 'Driver’s license is required')
    .max(1, 'Only one driver’s license image is allowed'),
  driverProfile: z
    .array(fileHandlerResSchema)
    .min(1, 'Driver profile is required')
    .max(1, 'Only one driver profile image is allowed'),
  tripHistory: z
    .array(fileHandlerResSchema)
    .min(1, 'Trip history is required')
    .max(1, 'Only one trip history image is allowed'),
});

interface Step2IdentityConfirmationFormValues {
  driversLicense: FileHandlerRes[] | null;
  driverProfile: FileHandlerRes[] | null;
  tripHistory: FileHandlerRes[] | null;
}

interface Step2IdentityConfirmationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Step2_IdentityConfirmation = ({
  onNext,
  onPrev,
}: Step2IdentityConfirmationProps) => {
  const [loading, setLoading] = useState<boolean>(false);
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
      driversLicense: null,
      driverProfile: null,
      tripHistory: null,
    };
  };

  const form = useForm<Step2IdentityConfirmationFormValues>({
    mode: 'uncontrolled',
    initialValues: getInitialValues(),
    validate: zodResolver(schema),
  });

  // Update form values when localStorage changes (e.g., on mount)
  useEffect(() => {
    const savedValues = getInitialValues();
    form.setValues(savedValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: Step2IdentityConfirmationFormValues) => {
    // Save values to localStorage (excluding files)
    if (typeof window !== 'undefined') {
      const valuesToSave = {
        ...values,
      };
      localStorage.setItem('step2FormValues', JSON.stringify(valuesToSave));
    }

    setIsIdentityConfirmationSubmitted(true); // Mark form as submitted
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
    setLoading(true);
    const dataArray = form.values[key] ?? [];

    const results = await Promise.all(
      dataArray.map((file) =>
        deleteFile(file.key).then((res) => ({ key: file.key, ...res }))
      )
    );
    console.log('Bulk delete results:', results);
    await new Promise((resolve) => setTimeout(resolve, 5000));

    setLoading(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Input.Wrapper
          label="Picture of Driver's License"
          withAsterisk
          error={form.errors.driversLicense}
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          <Space h={4} />
          {(getInitialValues().driversLicense ?? []).length > 0 &&
          changeDriverLicensePhotos === false &&
          loading === false ? (
            <SimpleGrid pos={'relative'} cols={1} spacing="md" mb="md">
              {loading && <Loader pos={'absolute'} top={0} right={0} />}
              {(getInitialValues().driverProfile ?? []).map((file) => (
                <Box h={150} key={file.key}>
                  <Image
                    w={'100%'}
                    h={'100%'}
                    src={file.url}
                    alt={`Vehicle Photo ${file.name}`}
                    radius={'md'}
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                </Box>
              ))}
              <Box pos={'absolute'} top={0} right={0}>
                <Button
                  variant="subtle"
                  size="md"
                  radius="md"
                  onClick={() => {
                    setChangeDriverLicensePhotos(true);
                    form.setFieldValue('driversLicense', null);
                    handleBulkDelete('driversLicense');
                  }}
                >
                  {loading ? (
                    <Loader size="xs" />
                  ) : (
                    <Icon icon={'mingcute:edit-line'} width={20} />
                  )}
                </Button>
              </Box>
            </SimpleGrid>
          ) : (
            <ImageHandler
              onUploadSuccess={(files: FileHandlerRes[]) => {
                form.setFieldValue('driversLicense', files);
                console.log('Files uploaded:', files);
              }}
            />
          )}
        </Input.Wrapper>

        <Input.Wrapper
          label="Screenshot of Driver Profile (Uber, Lyft, etc.)"
          withAsterisk
          error={form.errors.driverProfile}
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          <Space h={4} />
          {(getInitialValues().driverProfile ?? []).length > 0 &&
          changeDriverProfilePhotos === false &&
          loading === false ? (
            <SimpleGrid pos={'relative'} cols={1} spacing="md" mb="md">
              {(getInitialValues().driverProfile ?? []).map((file) => (
                <Box h={150} key={file.key}>
                  <Image
                    w={'100%'}
                    h={'100%'}
                    src={file.url}
                    alt={`Vehicle Photo ${file.name}`}
                    radius={'md'}
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                </Box>
              ))}
              <Box pos={'absolute'} top={0} right={0}>
                <Button
                  variant="subtle"
                  size="md"
                  radius="md"
                  onClick={() => {
                    setChangeDriverProfilePhotos(true);
                    form.setFieldValue('driverProfile', null);
                    handleBulkDelete('driverProfile');
                  }}
                >
                  {loading ? (
                    <Loader size="xs" />
                  ) : (
                    <Icon icon={'mingcute:edit-line'} width={20} />
                  )}
                </Button>
              </Box>
            </SimpleGrid>
          ) : (
            <ImageHandler
              onUploadSuccess={(files: FileHandlerRes[]) => {
                form.setFieldValue('driverProfile', files);
                console.log('Files uploaded:', files);
              }}
            />
          )}
        </Input.Wrapper>

        <Input.Wrapper
          label="Screenshot of Recent Trip History/Driven Hours"
          withAsterisk
          error={form.errors.tripHistory}
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          <Space h={4} />
          {(getInitialValues().tripHistory ?? []).length > 0 &&
          changeTripHistoryPhotos === false &&
          loading === false ? (
            <SimpleGrid pos={'relative'} cols={1} spacing="md" mb="md">
              {(getInitialValues().tripHistory ?? []).map((file) => (
                <Box h={150} key={file.key}>
                  <Image
                    w={'100%'}
                    h={'100%'}
                    src={file.url}
                    alt={`Vehicle Photo ${file.name}`}
                    radius={'md'}
                    fallbackSrc="https://via.placeholder.com/150"
                  />
                </Box>
              ))}
              <Box pos={'absolute'} top={0} right={0}>
                <Button
                  variant="subtle"
                  size="md"
                  radius="md"
                  onClick={() => {
                    setChangeTripHistoryPhotos(true);
                    form.setFieldValue('tripHistory', null);
                    handleBulkDelete('tripHistory');
                  }}
                >
                  {loading ? (
                    <Loader size="xs" />
                  ) : (
                    <Icon icon={'mingcute:edit-line'} width={20} />
                  )}
                </Button>
              </Box>
            </SimpleGrid>
          ) : (
            <ImageHandler
              onUploadSuccess={(files: FileHandlerRes[]) => {
                form.setFieldValue('tripHistory', files);
                console.log('Files uploaded:', files);
              }}
            />
          )}
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
            Back
          </Button>
          <Button
            type="submit"
            size="md"
            radius={12}
            className="!font-inter !w-full !px-16 !text-sm !font-normal !text-black md:!w-auto"
          >
            Continue
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default Step2_IdentityConfirmation;
