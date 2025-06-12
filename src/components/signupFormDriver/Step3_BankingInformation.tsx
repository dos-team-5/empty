'use client';
import { useFormSubmission } from '@/contexts/FormSubmissionContext';
import {
  Button,
  Group,
  Image,
  Input,
  SimpleGrid,
  Space,
  Stack,
  Box,
  Select,
  Menu,
  ActionIcon,
  Paper,
  Title,
  Text,
  List,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useForm, zodResolver } from '@mantine/form';
import { useEffect, useState } from 'react';
import { z } from 'zod';
import { fileHandlerResSchema } from './Step1_DriverInformation';
import { FileHandler, FileHandlerRes, ImageHandler } from '../FileManager';
import { Icon } from '@iconify/react/dist/iconify.js';
import {
  DriverApplication,
  getDriverApplicationFromLocalStorage,
  greetDrivers,
  sendDriverApplicationEmail,
} from '@/app/drive/action/driverApplication';

// Zod validation schema
const schema = z.object({
  voidCheque: z
    .array(fileHandlerResSchema)
    .max(1, 'Only one void cheque doc is allowed'),
});

interface Step3BankingInformationFormValues {
  voidCheque: FileHandlerRes[] | null;
}

interface Step3BankingInformationProps {
  onNext: () => void;
  onPrev: () => void;
}

const Step3_BankingInformation = ({
  onNext,
  onPrev,
}: Step3BankingInformationProps) => {
  const [selectedFileType, setSelectedFileType] = useState<'image' | 'pdf'>(
    'pdf'
  );
  const [changeVoidChequePhotos, setChangeVoidChequePhotos] =
    useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const { setIsBankingInfoSubmitted } = useFormSubmission();

  // Load initial values from localStorage
  const getInitialValues = (): Step3BankingInformationFormValues => {
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

  const form = useForm<Step3BankingInformationFormValues>({
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

  const handleSubmit = async (values: Step3BankingInformationFormValues) => {
    setSubmitting(true);
    // Save values to localStorage (excluding files)
    if (typeof window !== 'undefined') {
      const valuesToSave = {
        ...values,
      };
      localStorage.setItem('step3FormValues', JSON.stringify(valuesToSave));
    }

    // Simulate form submission (e.g., API call)
    try {
      const driverApplication: DriverApplication | null =
        getDriverApplicationFromLocalStorage();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const greetingMsg: any = greetDrivers();

      if (!driverApplication) {
        notifications.show({
          title: 'Missing Data',
          message: 'Driver application data not found in local storage.',
          color: 'red',
        });
        return;
      }

      const { success, message } =
        await sendDriverApplicationEmail(driverApplication);

      if (success) {
        const { success: greetingSuccess } =
          await sendDriverApplicationEmail(greetingMsg);
        if (greetingSuccess) {
          setIsBankingInfoSubmitted(true); // Mark form as submitted
          notifications.show({
            title: 'Form Submitted. Please check you Email for confirmation',
            message,
            color: 'green',
            autoClose: 3000,
          });
          onNext();
        }
      } else {
        notifications.show({
          title: 'Submission Failed',
          message,
          color: 'red',
          autoClose: 5000,
        });
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error('Submission error:', err);
      notifications.show({
        title: 'Unexpected Error',
        message: err.message ?? 'Something went wrong.',
        color: 'red',
        autoClose: 5000,
      });
    }

    setSubmitting(false);
  };

  return (
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Stack>
        <Input.Wrapper
          pos={'relative'}
          label="Void Cheque (Image or PDF)"
          withAsterisk
          description="Upload a void cheque or direct deposit form from your bank."
          error={form.errors.voidCheque}
          className="font-inter text-xs font-normal text-[#5E6366]"
        >
          <Menu width={300} position="bottom-end">
            <Menu.Target>
              <ActionIcon
                top={-2}
                left={204}
                pos={'absolute'}
                variant="subtle"
                size="sm"
              >
                <Icon icon="ix:question-filled" />
              </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
              <Paper p="md" radius="md" withBorder>
                <Stack gap="md">
                  <Title fz={16} order={3}>
                    How to Find and Upload a Void Cheque from Your Banking App
                  </Title>

                  <Text size="sm" c="dimmed">
                    Most major Canadian banks allow you to download or take a
                    screenshot of a void cheque directly from their mobile app.
                    Here&apos;s how:
                  </Text>

                  <List listStyleType="disc" size="xs" type="ordered">
                    <List.Item>Log in to your banking app.</List.Item>

                    <List.Item>
                      Go to your account details or direct deposit information
                      section.
                    </List.Item>

                    <List.Item>
                      Look for an option called &quot;Void Cheque,&quot;
                      &quot;Pre-Authorized Debit Form,&quot; or &quot;Direct
                      Deposit Form.&quot;
                    </List.Item>

                    <List.Item>
                      Download or take a screenshot of the document showing:
                      <List
                        withPadding
                        ml="md"
                        mt="xs"
                        type="unordered"
                        spacing="xs"
                        size="sm"
                        listStyleType="revert"
                      >
                        <List.Item>Your full name</List.Item>
                        <List.Item>Transit number</List.Item>
                        <List.Item>Institution number</List.Item>
                        <List.Item>Account number</List.Item>
                      </List>
                    </List.Item>
                  </List>
                </Stack>
              </Paper>
            </Menu.Dropdown>
          </Menu>
          <Space h={4} />

          {(getInitialValues().voidCheque ?? []).length > 0 &&
          changeVoidChequePhotos === false ? (
            <SimpleGrid pos={'relative'} cols={1} spacing="md" mb="md">
              {(getInitialValues().voidCheque ?? []).map((file) => (
                <Image
                  key={file.key}
                  src={file.url}
                  alt={`Vehicle Photo ${file.name}`}
                  width={200}
                  height={100}
                  style={{ objectFit: 'cover', borderRadius: '8px' }}
                />
              ))}
              <Box pos={'absolute'} top={0} right={0}>
                <Button
                  variant="subtle"
                  size="md"
                  radius="md"
                  onClick={() => setChangeVoidChequePhotos(true)}
                >
                  <Icon icon="mingcute:edit-line" width={20} />
                </Button>
              </Box>
            </SimpleGrid>
          ) : (
            <>
              <Select
                value={selectedFileType}
                onChange={(value) =>
                  setSelectedFileType(value as 'image' | 'pdf')
                }
                data={[
                  { value: 'image', label: 'Image' },
                  { value: 'pdf', label: 'PDF' },
                ]}
              />
              <Box hidden={selectedFileType !== 'pdf'}>
                <FileHandler
                  multiple={false}
                  onUploadSuccess={(files: FileHandlerRes[]) => {
                    form.setFieldValue('voidCheque', files);
                    console.log('Files uploaded:', files);
                  }}
                />
              </Box>
              <Box hidden={selectedFileType !== 'image'}>
                <ImageHandler
                  multiple={false}
                  onUploadSuccess={(files: FileHandlerRes[]) => {
                    form.setFieldValue('voidCheque', files);
                    console.log('Files uploaded:', files);
                  }}
                />
              </Box>
            </>
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
            loading={submitting}
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
