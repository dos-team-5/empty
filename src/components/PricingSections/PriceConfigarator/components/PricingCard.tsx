import { Icon } from '@iconify/react/dist/iconify.js';
import {
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Flex,
  List,
  Text,
  Title,
} from '@mantine/core';
import { PlanType } from '../types';
import { usePricingCalculation } from '../hooks/usePriceCalculation';
import { ADDONS, PLAN_CONFIGS } from '../data';
import { Calendar, CreditCard } from 'lucide-react';

const FeatureList = ({ features }: { features: string[] }) => (
  <List mt={12}>
    {features.map((feature, index) => (
      <List.Item mt={8} key={index}>
        <Flex align="center" gap={12}>
          <Icon
            icon="tabler:check"
            width={16}
            height={16}
            color="var(--color-primary)"
          />
          <span>{feature}</span>
        </Flex>
      </List.Item>
    ))}
  </List>
);

export const PricingCard = ({
  planType,
  carCount,
  pricing,
  selectedAddons,
  shouldBookCall,
}: {
  planType: PlanType;
  carCount: number;
  pricing: ReturnType<typeof usePricingCalculation>;
  selectedAddons: string[];
  shouldBookCall: boolean;
}) => {
  const config = PLAN_CONFIGS[planType];

  return (
    <Card radius={10} className="!border-primary border-2">
      <Card.Section p={24} className="text-center" bg="var(--color-primary)">
        <Title fz={24} c="white">
          {planType === 'basic' ? 'Basic Plan' : 'Premium Plan'}
        </Title>
        <Text c="white">
          {carCount} car{carCount !== 1 ? 's' : ''} selected
        </Text>
      </Card.Section>

      <Card.Section p={24} className="space-y-6">
        {/* Installation Fee */}
        <Flex align="center" justify="space-between">
          <Text fw={500}>Installation Fee</Text>
          <Text fw={700} fz={18}>
            ${pricing.totalInstallationFee.toLocaleString()}
          </Text>
        </Flex>

        {/* Monthly Pricing */}
        <Box className="space-y-2">
          <Flex align="center" justify="space-between">
            <Text fw={500}>Monthly Price</Text>
            <Text fw={700} fz={18}>
              ${pricing.totalMonthlyPrice.toLocaleString()}/month
            </Text>
          </Flex>
          <Text fz={14} fw={600} c="dimmed">
            ${pricing.monthlyPricePerCar}/car/month × {carCount} car
            {carCount !== 1 ? 's' : ''}
          </Text>
        </Box>

        <Divider />

        {/* Features */}
        <Box>
          <Text fz={24} fw={700}>
            Included Features:
          </Text>
          <FeatureList features={config.features} />
        </Box>

        {/* Add-ons */}

        <Divider />
        <Flex align="center" gap={36}>
          <Text fw={600}>Add-ons:</Text>
          <Flex align="center" gap={12}>
            {selectedAddons.length === 0
              ? 'N/A'
              : selectedAddons.map((addonId) => {
                  const addon = ADDONS.find((a) => a.id === addonId);
                  return addon ? (
                    <Badge key={addonId}>
                      {addon.label.replace('Add ', '').replace('Passive ', '')}
                    </Badge>
                  ) : null;
                })}
          </Flex>
        </Flex>

        <Divider />

        {/* Action Button */}
        <Button
          w="100%"
          h={48}
          fz={18}
          fw={600}
          style={{
            backgroundColor: shouldBookCall ? 'var(--color-primary)' : 'black',
          }}
        >
          {shouldBookCall ? (
            <>
              <Calendar className="mr-2 h-5 w-5" />
              Book a Call
            </>
          ) : (
            <>
              <CreditCard className="mr-2 h-5 w-5" />
              Checkout
            </>
          )}
        </Button>
      </Card.Section>
    </Card>
  );
};
