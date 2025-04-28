import React from 'react';
import { Title, Text, SimpleGrid, Card, Group, Box } from '@mantine/core';
import { Monitor, Maximize2, BarChart2, TrendingUp } from 'lucide-react';
import PrimaryBtn from '../PrimaryBtn';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <Card
      padding="xl"
      radius={0}
      className="border border-dimmed transition-shadow duration-300 hover:shadow-lg"
    >
      <Group className="mb-4">{icon}</Group>
      <Text size="lg" fw={600} className="mb-4">
        {title}
      </Text>
      <Text size="sm" c="dimmed" mt={16}>
        {description}
      </Text>
      <Box className="mt-8 w-[30%]">
        <PrimaryBtn btnText="LEARN MORE" />
      </Box>
    </Card>
  );
};

const FeatureSection: React.FC = () => {
  const features = [
    {
      icon: <Monitor size={24} className="text-primary" />,
      title:
        'Growing the OOH market by leveraging untapped and underutilized advertising spaces.',
      description:
        'Traditional billboards are transforming and taking new life. We deliver a dynamic display alternative that fits hand-in-hand with your marketing plan.',
    },
    {
      icon: <Maximize2 size={24} className="text-primary" />,
      title:
        'Highly efficient, streamlined process—eliminate ad spend hassles with easy online checkout and go live in just 7 days.',
      description:
        'Turn unused elevator ad space into a high-quality means to connect. Our innovative content benefits a building and businesses that reside.',
    },
    {
      icon: <BarChart2 size={24} className="text-primary" />,
      title: 'Flexible. You choose, we supply',
      description:
        'With our in-housing DOOH analytics dashboard, track your ad impressions in almost real-time and follow your costs - all in one place.',
    },
    {
      icon: <TrendingUp size={24} className="text-primary" />,
      title: 'CPM section',
      description:
        "Our ads don't sit still there - they move through the busiest times of your hours, in high-impact areas. Your brand stays in motion, ensuring maximum visibility in prime locations.",
    },
  ];

  return (
    <Box
      mt={{ base: 40, md: 80 }}
      maw={1800}
      mx={'auto'}
      className="px-4 sm:px-8 md:px-16 lg:px-20 xl:px-24 2xl:px-32"
    >
      <div className="mb-12 flex items-center">
        <Title className="px-4 text-base">ADVERTISE WITH US</Title>
      </div>

      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="xl" verticalSpacing="xl">
        {features.map((feature) => (
          <FeatureCard
            key={feature.title}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
          />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default FeatureSection;
