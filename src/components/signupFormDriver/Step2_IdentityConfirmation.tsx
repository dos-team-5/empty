'use client';
import { useFormSubmission } from '@/contexts/FormSubmissionContext';
import { Button, Group, Input, Space, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect } from 'react';
import { z } from 'zod';

// Zod validation schema
const schema = z.object({
  driversLicense: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith('image/'),
      'Driver’s license must be an image'
    ),
  driverProfile: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith('image/'),
      'Driver profile must be an image'
    ),
  tripHistory: z
    .instanceof(File)
    .refine(
      (file) => file.type.startsWith('image/'),
      'Trip history must be an image'
    ),
});

interface Step2_IdentityConfirmationFormValues {
  driversLicense: File | null;
  driverProfile: File | null;
  tripHistory: File | null;
}

interface Step2_IdentityConfirmationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Step2_IdentityConfirmation = ({
  onNext,
  onPrev,
}: Step2_IdentityConfirmationProps) => {
  const { setIsIdentityConfirmationSubmitted } = useFormSubmission();

  // Load initial values from localStorage
  const getInitialValues = (): Step2_IdentityConfirmationFormValues => {
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

  const form = useForm<Step2_IdentityConfirmationFormValues>({
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

  const handleSubmit = (values: Step2_IdentityConfirmationFormValues) => {
    // Save values to localStorage (excluding files)
    if (typeof window !== 'undefined') {
      const valuesToSave = {
        driversLicense: null,
        driverProfile: null,
        tripHistory: null,
      };
      localStorage.setItem('step2FormValues', JSON.stringify(valuesToSave));
    }

    // Simulate form submission (e.g., API call)
    console.log('Step 2 submitted:', {
      driversLicense: values.driversLicense?.name,
      driverProfile: values.driverProfile?.name,
      tripHistory: values.tripHistory?.name,
    });
    setIsIdentityConfirmationSubmitted(true); // Mark form as submitted
    notifications.show({
      title: 'Form Submitted',
      message: 'Identity Confirmation submitted successfully!',
      color: 'green',
      autoClose: 3000,
    });
    onNext();
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
          <Input
            type="file"
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files ? event.target.files[0] : null;
              form.setFieldValue('driversLicense', file);
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Screenshot of Driver Profile (Uber, Lyft, etc.)"
          withAsterisk
          error={form.errors.driverProfile}
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          <Space h={4} />
          <Input
            type="file"
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files ? event.target.files[0] : null;
              form.setFieldValue('driverProfile', file);
            }}
          />
        </Input.Wrapper>

        <Input.Wrapper
          label="Screenshot of Recent Trip History/Driven Hours"
          withAsterisk
          error={form.errors.tripHistory}
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          <Space h={4} />
          <Input
            type="file"
            accept="image/*"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files ? event.target.files[0] : null;
              form.setFieldValue('tripHistory', file);
            }}
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
