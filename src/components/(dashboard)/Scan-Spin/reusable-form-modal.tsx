/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import {
  Modal,
  Button,
  TextInput,
  NumberInput,
  Select,
  Group,
  Stack,
  Box,
  Text,
  ActionIcon,
  Paper,
  Divider,
  Container,
  Card,
  rem,
  Flex,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { DateTimePicker } from '@mantine/dates';
import { Plus, Trash2, Save } from 'lucide-react';
import { useEffect } from 'react';
import { FileHandlerRes, ImageHandler } from '@/components/FileManager';
import { notifications } from '@mantine/notifications';
import { FileAttachment } from '@/schema';

interface FormOption {
  id: string; // Unique identifier for the option, can be used for editing/removing
  label: string;
  coupon: string;
  ratio?: number; // Percentage or ratio for the option, e.g., 0.
}

interface FormData {
  title: string;
  companyName: string;
  companyLogo: FileAttachment | null;
  deadline: Date | null;
  options: FormOption[];
  userLimit: number;
  attemptConfiguration: {
    totalAttempts: number;
    timePeriod: string;
    attemptsPerPeriod: number;
  };
}

interface ReusableFormModalProps {
  readonly opened: boolean;
  readonly onClose: () => void;
  readonly onSubmit: (data: FormData, mode: 'create' | 'edit') => void;
  readonly mode: 'create' | 'edit';
  readonly initialData?: Partial<FormData>;
  readonly entityId?: number | string;
  readonly title?: string;
  readonly size?: 'sm' | 'md' | 'lg' | 'xl';
}

const defaultFormValues: FormData = {
  title: '',
  companyName: '',
  companyLogo: null,
  deadline: null,
  options: [
    {
      id: crypto.randomUUID(),
      label: '',
      coupon: '',
      ratio: 0,
    },
  ],
  userLimit: 1000,
  attemptConfiguration: {
    totalAttempts: 10,
    timePeriod: 'day',
    attemptsPerPeriod: 1,
  },
};

const PRIMARY_COLOR = '#CB6AA7';

export default function ReusableFormModal({
  opened,
  onClose,
  onSubmit,
  mode,
  initialData,
  title,
  size = 'lg',
}: ReusableFormModalProps) {
  const form = useForm<FormData>({
    initialValues: defaultFormValues,
    validate: {
      title: (value) =>
        value.length < 2 ? 'Title must have at least 2 characters' : null,
      companyName: (value) =>
        value.length < 2
          ? 'Company name must have at least 2 characters'
          : null,
      deadline: (value) => (!value ? 'Deadline is required' : null),
      userLimit: (value) =>
        value < 1 ? 'Participant limit must be at least 1' : null,
      options: {
        id: (value) => (value ? null : 'Option ID is required'),
        label: (value) =>
          value.length < 1 ? 'Option label is required' : null,
        coupon: (_value) => null,
        ratio: (value) =>
          value !== undefined && (value < 0 || value > 100)
            ? 'Ratio must be between 0 and 100'
            : null,
      },
      attemptConfiguration: {
        totalAttempts: (value) =>
          value < 1 ? 'Total attempts must be at least 1' : null,
        attemptsPerPeriod: (value) =>
          value < 1 ? 'Attempts per period must be at least 1' : null,
      },
    },
  });

  // Update form values when initialData changes or modal opens
  useEffect(() => {
    if (opened) {
      if (mode === 'edit' && initialData) {
        form.setValues({
          title: initialData.title ?? '',
          companyName: initialData.companyName ?? '',
          companyLogo: null,
          deadline: initialData.deadline ?? null,
          options:
            initialData.options && initialData.options.length > 0
              ? initialData.options
              : [
                  {
                    id: crypto.randomUUID(),
                    label: '',
                    coupon: '',
                    ratio: 0,
                  },
                ],
          userLimit: initialData.userLimit ?? 1000,
          attemptConfiguration: {
            totalAttempts:
              initialData.attemptConfiguration?.totalAttempts ?? 10,
            timePeriod: initialData.attemptConfiguration?.timePeriod ?? 'day',
            attemptsPerPeriod:
              initialData.attemptConfiguration?.attemptsPerPeriod ?? 1,
          },
        });
      } else {
        form.setValues(defaultFormValues);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [opened, mode, initialData]);

  const handleSubmit = (values: FormData) => {
    onSubmit(values, mode);
    onClose();
    form.reset();
  };

  const handleClose = () => {
    onClose();
    form.reset();
  };

  const addOption = () => {
    form.insertListItem('options', {
      id: crypto.randomUUID(),
      label: '',
      coupon: '',
      ratio: 0,
    });
  };

  const removeOption = (index: number) => {
    form.removeListItem('options', index);
  };

  const getModalTitle = () => {
    if (title) return title;
    return mode === 'create' ? 'Create New Item' : 'Edit Item';
  };

  const getSubmitButtonText = () => {
    return mode === 'create' ? 'Create' : 'Update';
  };

  const getSubmitIcon = () => {
    return mode === 'create' ? <Plus size={16} /> : <Save size={16} />;
  };

  const handleFileUpload = (files: FileHandlerRes[]) => {
    const file = files?.[0] ?? null;

    form.setFieldValue('companyLogo', file);

    console.log('File uploaded:', file);

    notifications.show({
      title: 'File Uploaded',
      message: `1 file uploaded successfully!`,
      color: 'green',
      autoClose: 3000,
    });
  };

  return (
    <Modal
      opened={opened}
      onClose={handleClose}
      title={getModalTitle()}
      size={size}
      centered
      styles={{
        title: {
          fontSize: rem(24),
          fontWeight: 700,
          color: PRIMARY_COLOR,
        },
        header: {
          borderBottom: `2px solid ${PRIMARY_COLOR}20`,
          paddingBottom: rem(16),
        },
        body: {
          padding: 0,
        },
      }}
    >
      <Container size="100%" p={0}>
        <Card
          shadow="none"
          p={{ base: 'md', xl: 'xl' }}
          radius={0}
          style={{
            width: '100%',
            minHeight: '60vh',
          }}
        >
          <form onSubmit={form.onSubmit(handleSubmit)}>
            <Stack gap="xl">
              {/* form error  */}
              {form.errors && Object.keys(form.errors).length > 0 && (
                <Box>
                  <Text color="red" size="sm">
                    {Object.values(form.errors)
                      .map((error) => (typeof error === 'string' ? error : ''))
                      .join(', ')}
                  </Text>
                </Box>
              )}
              {/* Basic Information Section */}
              <Box>
                <Group align="center" mb="md">
                  <Box
                    style={{
                      width: rem(4),
                      height: rem(24),
                      backgroundColor: PRIMARY_COLOR,
                      borderRadius: rem(2),
                    }}
                  />
                  <Text size="lg" fw={600} c={PRIMARY_COLOR}>
                    BASIC INFORMATION
                  </Text>
                </Group>
                <Stack gap="md">
                  <Group grow>
                    <TextInput
                      label="Title"
                      placeholder="Enter title"
                      required
                      size="md"
                      styles={{
                        label: { fontWeight: 500, marginBottom: rem(8) },
                        input: {
                          '&:focus': {
                            borderColor: PRIMARY_COLOR,
                          },
                        },
                      }}
                      {...form.getInputProps('title')}
                    />

                    {mode === 'create' && (
                      <TextInput
                        label="Company Name"
                        placeholder="Enter company name"
                        required
                        size="md"
                        styles={{
                          label: { fontWeight: 500, marginBottom: rem(8) },
                          input: {
                            '&:focus': {
                              borderColor: PRIMARY_COLOR,
                            },
                          },
                        }}
                        {...form.getInputProps('companyName')}
                      />
                    )}
                  </Group>

                  {mode === 'create' && (
                    <>
                      <ImageHandler onUploadSuccess={handleFileUpload} />

                      <Text size="sm" c="dimmed" mt={rem(-8)}>
                        Leave empty to keep current logo
                      </Text>
                    </>
                  )}
                </Stack>
              </Box>

              <Divider color={`${PRIMARY_COLOR}30`} />

              {/* Campaign Settings Section */}
              <Box>
                <Group align="center" mb="md">
                  <Box
                    style={{
                      width: rem(4),
                      height: rem(24),
                      backgroundColor: PRIMARY_COLOR,
                      borderRadius: rem(2),
                    }}
                  />
                  <Text size="lg" fw={600} c={PRIMARY_COLOR}>
                    SETTINGS
                  </Text>
                </Group>
                <Stack gap="md">
                  <Flex
                    direction={{ base: 'column', md: 'row' }}
                    gap={{ base: 16, md: 32 }}
                  >
                    <DateTimePicker
                      w={'100%'}
                      label="Deadline"
                      placeholder="Select deadline"
                      required
                      size="md"
                      styles={{
                        label: { fontWeight: 500, marginBottom: rem(8) },
                        input: {
                          '&:focus': {
                            borderColor: PRIMARY_COLOR,
                          },
                        },
                      }}
                      {...form.getInputProps('deadline')}
                    />

                    <NumberInput
                      w={'100%'}
                      label="Participation Limit"
                      placeholder="Maximum participants"
                      min={1}
                      required
                      size="md"
                      styles={{
                        label: { fontWeight: 500, marginBottom: rem(8) },
                        input: {
                          '&:focus': {
                            borderColor: PRIMARY_COLOR,
                          },
                        },
                      }}
                      {...form.getInputProps('userLimit')}
                    />
                  </Flex>
                </Stack>
              </Box>

              <Divider color={`${PRIMARY_COLOR}30`} />

              {/* Attempt Configuration Section */}
              <Box>
                <Group align="center" mb="md">
                  <Box
                    style={{
                      width: rem(4),
                      height: rem(24),
                      backgroundColor: PRIMARY_COLOR,
                      borderRadius: rem(2),
                    }}
                  />
                  <Text size="lg" fw={600} c={PRIMARY_COLOR}>
                    ATTEMPT CONFIGURATION (Per User)
                  </Text>
                </Group>
                <Flex
                  direction={{ base: 'column', md: 'row' }}
                  gap={{ base: 16, md: 32 }}
                >
                  <NumberInput
                    w={'100%'}
                    label="Total Attempts"
                    placeholder="Total attempts"
                    min={1}
                    required
                    size="md"
                    styles={{
                      label: { fontWeight: 500, marginBottom: rem(8) },
                      input: {
                        '&:focus': {
                          borderColor: PRIMARY_COLOR,
                        },
                      },
                    }}
                    {...form.getInputProps(
                      'attemptConfiguration.totalAttempts'
                    )}
                  />

                  <Select
                    w={'100%'}
                    label="Time Period"
                    placeholder="Select period"
                    data={[
                      { value: 'hour', label: 'Hour' },
                      { value: 'day', label: 'Day' },
                      { value: 'week', label: 'Week' },
                      { value: 'month', label: 'Month' },
                    ]}
                    required
                    size="md"
                    styles={{
                      label: { fontWeight: 500, marginBottom: rem(8) },
                      input: {
                        '&:focus': {
                          borderColor: PRIMARY_COLOR,
                        },
                      },
                    }}
                    {...form.getInputProps('attemptConfiguration.timePeriod')}
                  />

                  <NumberInput
                    w={'100%'}
                    label="Attempts Per Period"
                    placeholder="Per period"
                    min={1}
                    required
                    size="md"
                    styles={{
                      label: { fontWeight: 500, marginBottom: rem(8) },
                      input: {
                        '&:focus': {
                          borderColor: PRIMARY_COLOR,
                        },
                      },
                    }}
                    {...form.getInputProps(
                      'attemptConfiguration.attemptsPerPeriod'
                    )}
                  />
                </Flex>
              </Box>

              <Divider color={`${PRIMARY_COLOR}30`} />

              {/* Dynamic Options Section */}
              <Box>
                <Group justify="space-between" align="center" mb="md">
                  <Group align="center">
                    <Box
                      style={{
                        width: rem(4),
                        height: rem(24),
                        backgroundColor: PRIMARY_COLOR,
                        borderRadius: rem(2),
                      }}
                    />
                    <Text size="lg" fw={600} c={PRIMARY_COLOR}>
                      PRIZE OPTIONS
                    </Text>
                  </Group>
                  <Button
                    size="sm"
                    variant="light"
                    leftSection={<Plus size={16} />}
                    onClick={addOption}
                    style={{
                      backgroundColor: `${PRIMARY_COLOR}15`,
                      color: PRIMARY_COLOR,
                      border: `1px solid ${PRIMARY_COLOR}30`,
                    }}
                    styles={{
                      root: {
                        '&:hover': {
                          backgroundColor: `${PRIMARY_COLOR}25`,
                        },
                      },
                    }}
                  >
                    Add Option
                  </Button>
                </Group>

                <Stack gap="md">
                  {form.values.options.map((option, index) => (
                    <Paper
                      key={index}
                      p="lg"
                      withBorder
                      radius="md"
                      style={{
                        backgroundColor: `${PRIMARY_COLOR}08`,
                        borderColor: `${PRIMARY_COLOR}20`,
                      }}
                    >
                      <Stack gap="md">
                        <Group justify="space-between" align="center">
                          <Text size="sm" fw={500} c={PRIMARY_COLOR}>
                            Option {index + 1}
                          </Text>
                          {form.values.options.length > 1 && (
                            <ActionIcon
                              color="red"
                              variant="light"
                              onClick={() => removeOption(index)}
                              size="sm"
                            >
                              <Trash2 size={14} />
                            </ActionIcon>
                          )}
                        </Group>
                        <Group grow>
                          <TextInput
                            label="Prize Label"
                            placeholder="e.g., Free Coffee"
                            required
                            size="md"
                            styles={{
                              label: { fontWeight: 500, marginBottom: rem(8) },
                              input: {
                                '&:focus': {
                                  borderColor: PRIMARY_COLOR,
                                },
                              },
                            }}
                            {...form.getInputProps(`options.${index}.label`)}
                          />

                          <TextInput
                            label="Coupon Code"
                            placeholder="e.g., FREE-COFFEE-2025"
                            size="md"
                            styles={{
                              label: { fontWeight: 500, marginBottom: rem(8) },
                              input: {
                                '&:focus': {
                                  borderColor: PRIMARY_COLOR,
                                },
                              },
                            }}
                            {...form.getInputProps(`options.${index}.coupon`)}
                          />

                          <NumberInput
                            label="Winning Ratio (%)"
                            placeholder="e.g., 10"
                            min={0}
                            max={100}
                            size="md"
                            styles={{
                              label: { fontWeight: 500, marginBottom: rem(8) },
                              input: {
                                '&:focus': {
                                  borderColor: PRIMARY_COLOR,
                                },
                              },
                            }}
                            {...form.getInputProps(`options.${index}.ratio`)}
                          />
                        </Group>
                      </Stack>
                    </Paper>
                  ))}
                </Stack>
              </Box>

              {/* Form Actions */}
              <Group
                justify="flex-end"
                mt="xl"
                pt="md"
                style={{ borderTop: `1px solid ${PRIMARY_COLOR}20` }}
              >
                <Button
                  variant="outline"
                  onClick={handleClose}
                  size="md"
                  color="gray"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  size="md"
                  leftSection={getSubmitIcon()}
                  style={{
                    backgroundColor: PRIMARY_COLOR,
                  }}
                  styles={{
                    root: {
                      '&:hover': {
                        backgroundColor: `${PRIMARY_COLOR}dd`,
                      },
                    },
                  }}
                >
                  {getSubmitButtonText()}
                </Button>
              </Group>
            </Stack>
          </form>
        </Card>
      </Container>
    </Modal>
  );
}
