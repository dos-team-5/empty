'use client';
import { useFormSubmission } from '@/contexts/FormSubmissionContext';
import { Button, Group, Input, Space, Stack } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect } from 'react';
import { z } from 'zod';

// Zod validation schema
const schema = z.object({
  voidCheque: z
    .instanceof(File)
    .refine(
      (file) => file.type === 'image/*' || file.type === 'application/pdf',
      'Void cheque must be an image or PDF'
    ),
});

interface Step3_BankingInformationFormValues {
  voidCheque: File | null;
}

interface Step3_BankingInformationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Step3_BankingInformation = ({
  onNext,
  onPrev,
}: Step3_BankingInformationProps) => {
  const { setIsBankingInfoSubmitted } = useFormSubmission();

  // Load initial values from localStorage
  const getInitialValues = (): Step3_BankingInformationFormValues => {
    if (typeof window !== 'undefined') {
      const savedValues = localStorage.getItem('step3FormValues');
      if (savedValues) {
        try {
          return JSON.parse(savedValues);
        } catch (e) {
          console.error('Error parsing step3FormValues from localStorage:', e);
        }
      }
    }
    return {
      voidCheque: null,
    };
  };

  const form = useForm<Step3_BankingInformationFormValues>({
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

  const handleSubmit = (values: Step3_BankingInformationFormValues) => {
    // Save values to localStorage (excluding files)
    if (typeof window !== 'undefined') {
      const valuesToSave = {
        voidCheque: null,
      };
      localStorage.setItem('step3FormValues', JSON.stringify(valuesToSave));
    }

    // Simulate form submission (e.g., API call)
    console.log('Step 3 submitted:', {
      voidCheque: values.voidCheque?.name,
    });
    setIsBankingInfoSubmitted(true); // Mark form as submitted
    notifications.show({
      title: 'Form Submitted',
      message: 'Banking Information submitted successfully!',
      color: 'green',
      autoClose: 3000,
    });
    onNext();
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Input.Wrapper
          label="Void Cheque (Image or PDF)"
          withAsterisk
          description="Upload a void cheque or direct deposit form from your bank."
          error={form.errors.voidCheque}
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          <Space h={4} />
          <Input
            type="file"
            accept="image/*,application/pdf"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              const file = event.target.files ? event.target.files[0] : null;
              form.setFieldValue('voidCheque', file);
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

export default Step3_BankingInformation;
