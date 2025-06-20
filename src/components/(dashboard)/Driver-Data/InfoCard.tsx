import { Paper, Text, Group, Box } from '@mantine/core';

export const InfoCard = ({
  icon: Icon,
  label,
  value,
}: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: any;
  label: string;
  value: string;
}) => (
  <Paper
    p="lg"
    radius="xl"
    withBorder
    style={{
      background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
      border: '1px solid #e9ecef',
      transition: 'all 0.2s ease',
      cursor: 'pointer',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
      e.currentTarget.style.borderColor = '#CB6AA7';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = 'none';
      e.currentTarget.style.borderColor = '#e9ecef';
    }}
  >
    <Group gap="md">
      <Box
        style={{
          width: 40,
          height: 40,
          borderRadius: 8,
          background: 'linear-gradient(135deg, #CB6AA7 0%, #B85A96 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Icon size={16} color="white" />
      </Box>
      <Box style={{ flex: 1, minWidth: 0 }}>
        <Text size="sm" fw={500} c="dimmed" mb={4}>
          {label}
        </Text>
        <Text fw={600} c="dark" style={{ wordBreak: 'break-word' }}>
          {value}
        </Text>
      </Box>
    </Group>
  </Paper>
);
