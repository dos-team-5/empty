'use client';
import NextImage from 'next/image';
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
  Card,
  Loader,
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
import { deleteFile } from '../FileManager/actions/fileActions';

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
  const [loading, setLoading] = useState<boolean>(false);
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

  const voidChequeFiles = form.values.voidCheque ?? [];
  const isImage =
    voidChequeFiles.length > 0 && voidChequeFiles[0]?.type?.startsWith('image');

  const handleDelete = async (key: string) => {
    setLoading(true);
    const result = await deleteFile(key);

    if (result.success) {
      const updatedFiles =
        form.values.voidCheque?.filter((file) => file.key !== key) ?? [];
      form.setFieldValue('voidCheque', updatedFiles);
      notifications.show({
        title: 'Success',
        message: 'File deleted successfully',
        color: 'green',
      });
    } else {
      notifications.show({
        title: 'Error',
        message: result.error,
        color: 'red',
      });
    }
    setLoading(false);
    setChangeVoidChequePhotos(true);
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
          {(() => {
            let voidChequeContent = null;
            if (voidChequeFiles.length > 0 && !changeVoidChequePhotos) {
              if (isImage) {
                voidChequeContent = (
                  <SimpleGrid pos="relative" cols={1} spacing="md" mb="md">
                    {voidChequeFiles.map((file) => (
                      <Box h={150} key={file.key}>
                        <Image
                          fill
                          component={NextImage}
                          w={'100%'}
                          h={'100%'}
                          src={file.url}
                          alt={`Vehicle Photo ${file.name}`}
                          radius={'md'}
                          fallbackSrc="https://via.placeholder.com/150"
                        />
                      </Box>
                    ))}
                    <Box pos="absolute" top={0} right={0}>
                      <Button
                        variant="subtle"
                        size="md"
                        radius="md"
                        onClick={() => handleDelete(voidChequeFiles[0].key)}
                      >
                        {loading ? (
                          <Loader size="xs" />
                        ) : (
                          <Icon icon={'mingcute:edit-line'} width={20} />
                        )}
                      </Button>
                    </Box>
                  </SimpleGrid>
                );
              } else {
                voidChequeContent = (
                  <Stack gap="sm" mt="sm">
                    {voidChequeFiles.map((file) => (
                      <Card
                        key={file.key}
                        shadow="sm"
                        padding="sm"
                        radius="md"
                        withBorder
                      >
                        <Group justify="space-between">
                          <Box>
                            <Text fw={500} truncate maw={250}>
                              {file.name}
                            </Text>
                            <Text size="sm" c="dimmed">
                              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
                            </Text>
                            <Text size="sm" c="dimmed">
                              Type: {file.type}
                            </Text>
                          </Box>
                          <ActionIcon
                            onClick={() => handleDelete(file.key)}
                            variant="light"
                            color="red"
                            size="lg"
                          >
                            {loading ? (
                              <Loader size="xs" />
                            ) : (
                              <Icon icon="mingcute:edit-line" width={20} />
                            )}
                          </ActionIcon>
                        </Group>
                        <Button
                          component="a"
                          href={file.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          variant="light"
                          mt="sm"
                          fullWidth
                        >
                          View File
                        </Button>
                      </Card>
                    ))}
                  </Stack>
                );
              }
            } else {
              voidChequeContent = (
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
                      }}
                    />
                  </Box>
                  <Box hidden={selectedFileType !== 'image'}>
                    <ImageHandler
                      multiple={false}
                      onUploadSuccess={(files: FileHandlerRes[]) => {
                        form.setFieldValue('voidCheque', files);
                      }}
                    />
                  </Box>
                </>
              );
            }
            return voidChequeContent;
          })()}
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
