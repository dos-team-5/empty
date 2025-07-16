/* eslint-disable @typescript-eslint/no-explicit-any */
// Step1_DriverInformation.tsx (refactored with lang-aware validation)
'use client';
import {
  Box,
  Button,
  Group,
  Input,
  Loader,
  MultiSelect,
  SimpleGrid,
  Space,
  Stack,
  TextInput,
  Image,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { useFormSubmission } from '@/contexts/FormSubmissionContext';
import { useLanguage } from '@/providers/languageToggleContext';
import { deleteFile } from '@/components/FileManager/actions/fileActions';
import { step1FormConfig } from './step1-form-config';
import { FileHandlerRes, ImageHandler } from '@/components/FileManager';
import { schemaForm1 } from './validation';

const Step1_DriverInformationNew = ({
  onNext,
  onPrev,
  step1FormLabel,
}: any) => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(false);
  const [changeVehiclePhotos, setChangeVehiclePhotos] = useState(false);
  const { setIsDriverInfoSubmitted } = useFormSubmission();

  const getInitialValues = () => {
    if (typeof window !== 'undefined') {
      const savedValues = localStorage.getItem('step1FormValues');
      if (savedValues) {
        try {
          return JSON.parse(savedValues);
        } catch (e) {
          console.error('Error parsing step1FormValues from localStorage:', e);
        }
      }
    }
    return {
      name: '',
      email: '',
      phone: '',
      password: '',
      city: '',
      postalCode: '',
      streetAddress1: '',
      streetAddress2: '',
      vehicleMake: '',
      vehicleModel: '',
      vehicleYear: '',
      vehiclePhotos: [],
      rideSharePlatforms: [],
      weeklyDrivingHours: '',
    };
  };

  const form = useForm({
    mode: 'uncontrolled',
    initialValues: getInitialValues(),
    validate: zodResolver(schemaForm1(language)),
  });

  useEffect(() => {
    form.setValues(getInitialValues());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (values: any) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('step1FormValues', JSON.stringify(values));
    }
    setIsDriverInfoSubmitted(true);
    notifications.show({
      title: 'Form Submitted',
      message: 'Success',
      color: 'green',
    });
    onNext();
  };

  const handleBulkDelete = async () => {
    setLoading(true);
    const vehiclePhotos = form.values.vehiclePhotos;

    try {
      const results = await Promise.all(
        vehiclePhotos.map((file: FileHandlerRes) =>
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
          (photo: FileHandlerRes) => !successfullyDeleted.includes(photo.key)
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

  const handleFileUpload = (files: any) => {
    form.setFieldValue('vehiclePhotos', files);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack gap="md">
        {step1FormConfig(step1FormLabel, language).map((section, index) =>
          section.group ? (
            <SimpleGrid key={index} cols={section.cols} spacing="md">
              {section.fields.map((field) => (
                <Input.Wrapper
                  key={field.name}
                  label={field.label}
                  withAsterisk={field.required}
                  className="font-inter text-xs font-normal text-[#5E6366]"
                >
                  <Space h={4} />
                  <TextInput
                    type={field.type}
                    placeholder={field.placeholder}
                    variant="filled"
                    radius="sm"
                    size="md"
                    {...form.getInputProps(field.name)}
                  />
                </Input.Wrapper>
              ))}
            </SimpleGrid>
          ) : (
            <SimpleGrid key={index} cols={{ base: 1, sm: 2 }} spacing="md">
              {section.fields.map((field) => (
                <Input.Wrapper
                  key={field.name}
                  label={field.label}
                  withAsterisk={field.required}
                  className="font-inter text-xs font-normal text-[#5E6366]"
                >
                  <Space h={4} />
                  <TextInput
                    type={field.type}
                    placeholder={field.placeholder}
                    variant="filled"
                    radius="sm"
                    size="md"
                    {...form.getInputProps(field.name)}
                  />
                </Input.Wrapper>
              ))}
            </SimpleGrid>
          )
        )}

        {/* Special case: Vehicle Photos */}
        <Input.Wrapper error={form.errors.vehiclePhotos}>
          {form.values.vehiclePhotos.length > 0 && !changeVehiclePhotos ? (
            <SimpleGrid cols={3} spacing="md">
              {loading && <Loader />}
              {form.values.vehiclePhotos.map((file: any) => (
                <Box h={150} key={file.key}>
                  <Image
                    src={file.url}
                    alt={file.name}
                    style={{ width: '100%', height: '100%' }}
                  />
                </Box>
              ))}
              <Box pos="absolute" top={0} right={0}>
                <Button
                  variant="subtle"
                  onClick={handleBulkDelete}
                  disabled={loading}
                >
                  <Icon icon="mingcute:edit-line" width={20} />
                </Button>
              </Box>
            </SimpleGrid>
          ) : (
            <ImageHandler
              label={step1FormLabel.vehiclePhotos[language]}
              description={step1FormLabel.vehiclePhotos.description[language]}
              withAsterisk
              onUploadSuccess={handleFileUpload}
              multiple
            />
          )}
        </Input.Wrapper>

        {/* Special case: RideShare */}
        <Input.Wrapper
          label={step1FormLabel.rideSharePlatforms[language]}
          withAsterisk
        >
          <Space h={4} />
          <MultiSelect
            data={['Uber', 'Lyft', 'UberEats', 'Other']}
            placeholder={language === 'en' ? 'Select' : 'Choisissez'}
            {...form.getInputProps('rideSharePlatforms')}
          />
        </Input.Wrapper>

        {/* Special case: Weekly Driving Schedule */}
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
            placeholder={
              step1FormLabel.weeklyDrivingSchedulePlaceholder[language]
            }
            {...form.getInputProps('weeklyDrivingSchedule')}
          />
        </Input.Wrapper>

        <Group
          px={'lg'}
          justify="space-between"
          mt="lg"
          className="!flex-col-reverse md:!flex-row"
        >
          <Button variant="outline" onClick={onPrev}>
            {step1FormLabel.buttons.cancel[language]}
          </Button>
          <Button type="submit">
            {step1FormLabel.buttons.continue[language]}
          </Button>
        </Group>
      </Stack>
    </form>
  );
};

export default Step1_DriverInformationNew;
